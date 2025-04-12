import { useState } from "react";
import axios from "axios";

const useServer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const callServer = async (
    url: string,
    method: "POST" | "GET",
    data?: any
  ) => {
    try {
      setLoading(true);
      setError(null);
      let response;

      if (method === "GET") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
          data,
          { withCredentials: true }
        );
      }
      setCount((e) => e++);

      return response.data;
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 403 && count <= 2) {
        console.log("hello from fetch ts");
        await refresh();
        await callServer(url, method, data);
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
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
    {},
    { withCredentials: true }
  );
};
export default useServer;
