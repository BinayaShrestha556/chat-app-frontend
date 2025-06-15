import { useState } from "react";
import axios from "axios"; // Only needed for the refresh function here
import { setAccessToken } from "@/server-actions/login"; // Assuming this server action sets an HTTP-only access_token cookie
import { sendReq } from "@/server-actions/send-request"; // A server action for making authenticated API calls

/**
 * Custom React hook for making authenticated API calls.
 * Handles loading states, errors, and automatically attempts to refresh
 * the access token if an API call fails due to token expiration (403/401).
 */
const useServer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initiates an API request to the backend.
   * @param url - The API endpoint URL.
   * @param method - The HTTP method (e.g., "GET", "POST").
   * @param body - The request body for methods like POST (optional).
   * @param retryCount - Internal counter to limit refresh retries (default: 0).
   * @returns The data from the successful API response, or null if the request failed.
   */
  const callServer = async (
    url: string,
    method: "POST" | "GET",
    body?: any,
    retryCount = 0
  ): Promise<any | null> => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      console.log(`[useServer] Sending ${method} request to: ${url}`);

      // Call the server action to send the request
      // We assume sendReq returns an object { data: any, error: { status: number, message: string } | null }
      // and only throws for network issues.
      const { data: responseData, error: serverActionError } = await sendReq(
        url,
        method,
        body
      );

      if (serverActionError) {
        console.error(
          `[useServer] API call error (${serverActionError.status}): ${serverActionError.message}`
        );

        // Check for token expiration (401 or 403 status) and attempt refresh
        if (
          (serverActionError.status === 401 ||
            serverActionError.status === 403) &&
          retryCount === 0
        ) {
          console.log(
            "[useServer] Token expired or unauthorized. Attempting refresh and retry..."
          );
          const refreshSuccessful = await refresh(); // Call the refresh function

          if (refreshSuccessful) {
            // If refresh was successful, retry the original API call once
            console.log(
              "[useServer] Token refreshed. Retrying original request..."
            );
            return await callServer(url, method, body, retryCount + 1); // Increment retryCount
          } else {
            // If refresh failed, indicate session expiration
            setError("Your session has expired. Please log in again.");
            // In a real app, you might want to redirect the user to the login page here.
            // e.g., router.push('/auth/login');
            return null;
          }
        } else {
          // Handle other API errors or if it's a retry and refresh failed
          setError(
            serverActionError.message || "An unexpected API error occurred."
          );
          return null;
        }
      }

      // If no serverActionError, return the data
      return responseData;
    } catch (err: any) {
      // This catch block handles network errors or unexpected errors thrown during the fetch/sendReq call
      console.error("[useServer] Network or unexpected error:", err);

      // If the error has a response (e.g., from axios throwing an HTTP error)
      if (
        err.response?.status === 401 ||
        (err.response?.status === 403 && retryCount === 0)
      ) {
        console.log(
          "[useServer] Token expired (via catch block). Attempting refresh and retry..."
        );
        const refreshSuccessful = await refresh();
        if (refreshSuccessful) {
          return await callServer(url, method, body, retryCount + 1);
        } else {
          setError("Your session has expired. Please log in again.");
          return null;
        }
      }

      // Fallback for any other errors
      setError(
        err.response?.data?.error || err.message || "An unknown error occurred."
      );
      return null;
    } finally {
      setLoading(false); // Always stop loading regardless of success or failure
    }
  };

  return { callServer, loading, error };
};

/**
 * Attempts to refresh the authentication token by calling the backend's refresh endpoint.
 * This function specifically uses `axios` with `withCredentials: true` to handle
 * the secure transmission of the HTTP-only refresh token cookie.
 *
 * @returns {Promise<boolean>} True if the token was successfully refreshed and set, false otherwise.
 */
export const refresh = async (): Promise<boolean> => {
  try {
    console.log("[refresh] Initiating token refresh request...");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
      {}, // Empty body; refresh token is expected to be sent via HTTP-only cookie
      { withCredentials: true } // Important: Ensures cookies (like refresh_token) are sent with the request
    );

    // Check if the refresh was successful and a new access token was provided
    if (response.status === 200 && response.data && response.data.accessToken) {
      // Call the server action to set the new HTTP-only access_token cookie
      await setAccessToken(response.data.accessToken);
      console.log("[refresh] Access token successfully refreshed and set.");
      return true;
    } else {
      console.warn(
        "[refresh] Token refresh successful, but no new access token received or status not 200."
      );
      return false;
    }
  } catch (err: any) {
    console.error(
      "[refresh] Token refresh failed:",
      err.response?.data?.message || err.message || "Unknown refresh error."
    );
    // In a production application, you would typically dispatch a global logout action here
    // if the refresh token itself is invalid or expired, forcing the user to re-login.
    return false;
  }
};

export default useServer;
