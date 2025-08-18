import React from "react";
import { Id, toast, ToastContent, ToastOptions } from "react-toastify";

interface UseNotification {
  content: React.ReactNode;
  type: "success" | "info" | "warning" | "error";
}

type NotificationFn = <TData = unknown>(
  content: ToastContent<TData>,
  options?: ToastOptions<TData>
) => Id;

export const notificationFunction = (options: UseNotification): number | string => {
  const { type, content } = options;

  return (toast[type] as NotificationFn)(content, {
    autoClose: 5_000,
    position: "top-right",
  });
}

export const useNotification = () => {
  return notificationFunction;
};

