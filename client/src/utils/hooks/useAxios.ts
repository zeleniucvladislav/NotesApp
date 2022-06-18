import { useState, useCallback } from "react";
import { useNotificationContext } from "context/notification/notification.context";
import axios, { Method } from "axios";

export const useAxios = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { handleNotification } = useNotificationContext();

  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = user.token;

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token,
    },
  });

  const request = useCallback(
    async (url: string, method: Method, data: any = null) => {
      let response;
      setLoading(true);
      await api
        .request({ method, url, data })
        .then((res) => {
          if (res.data.message) {
            const resMessage = {
              status: res.status,
              message: res.data.message,
            };
            handleNotification(resMessage);
          }

          setLoading(false);
          response = res.data;
        })
        .catch((err) => {
          if (err.response.data.message) {
            const resMessage = {
              status: err.response.status,
              message: err.response.data.message,
            };
            handleNotification(resMessage);
          }
          setLoading(false);
        });
      return response;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { request, loading };
};
