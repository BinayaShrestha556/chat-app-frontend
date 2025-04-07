import { useState } from "react";
import axios from "axios";

const useServer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callServer = async (
    url: string,
    method: "POST" | "GET",
    data?: any
  ) => {
    try {
      setLoading(true);
      setError("");
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
      console.log(response.data, "this is from fetch");
      return response.data;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callServer, loading, error };
};

export default useServer;
