"use server"; // Marks this file as a Server Action

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers"; // Used to access request headers (cookies) in Server Actions

/**
 * Sends an authenticated HTTP request to the backend API.
 * This function runs on the server.
 *
 * @param url - The relative API endpoint URL (e.g., "/user/profile").
 * @param method - The HTTP method (e.g., "GET", "POST").
 * @param data - The request body for POST requests (optional).
 * @returns An object containing `data` from the response or an `error` object.
 * The `error` object will have `status` (HTTP status code) and `message`.
 */
export const sendReq = async (
  url: string,
  method: "POST" | "GET",
  data?: any
) => {
  console.log(`[sendReq] Server Action hit for URL: ${url}`);
  // Construct the full backend API URL
  const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`;

  let responseData: any = null; // To hold successful response data
  let error: { status: number | null; message: string } | null = null; // To hold structured error

  try {
    const cookieStore = await cookies(); // Access cookies from the incoming request headers
    console.log(cookieStore.get("access_token"));
    const accessToken = cookieStore.get("access_token")?.value; // Get the access token

    if (!accessToken) {
      // If no access token is found, return an unauthorized error
      console.warn("[sendReq] No access token found in cookies.");
      return {
        data: null,
        error: {
          status: 401,
          message: "Authentication required: No access token.",
        },
      };
    }

    let axiosResponse;

    if (method === "GET") {
      axiosResponse = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach the access token
        },
      });
    } else {
      // For POST requests, include the data in the body
      axiosResponse = await axios.post(fullUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach the access token
        },
      });
    }

    responseData = axiosResponse.data; // Extract data from the Axios response
  } catch (err: unknown) {
    // Handle errors, specifically AxiosErrors for structured error responses
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      // Extract status and message from AxiosError
      error = {
        status: axiosError.response?.status || 500, // Default to 500 if status not available
        message: axiosError.message || "An API error occurred.",
      };
      console.error(
        `[sendReq] Axios API Error (${error.status}): ${error.message}`
      );
    } else {
      // Handle other unexpected errors (e.g., network issues before request is sent)
      error = {
        status: null, // No HTTP status for network errors
        message: (err as Error).message || "An unknown network error occurred.",
      };
      console.error(`[sendReq] Unexpected Error: ${error.message}`, err);
    }
  }

  // Return the structured response
  return { data: responseData, error };
};
