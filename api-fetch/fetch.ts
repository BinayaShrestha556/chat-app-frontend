import { useState } from "react";
import axios from "axios";

const useServer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callServer = async (
    url: string,
    method: "POST" | "GET",
    data?: any,
    retryCount = 0
  ): Promise<any> => {
    try {
      setLoading(true);
      setError(null);

      const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`;
      let response;

      if (method === "GET") {
        response = await axios.get(fullUrl, {
          withCredentials: true,
        });
      } else {
        response = await axios.post(fullUrl, data, {
          withCredentials: true,
        });
      }

      return response.data;
    } catch (err: any) {
      console.error("Server error:", err);

      if (err.response?.status === 403 && retryCount < 2) {
        console.log("Token expired, trying refresh...");
        await refresh();
        return callServer(url, method, data, retryCount + 1); // 🔁 Retry after refresh
      }

      setError(err.response?.data?.error || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callServer, loading, error };
};

export const refresh = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Token refresh failed:", err);
  }
};

export default useServer;
