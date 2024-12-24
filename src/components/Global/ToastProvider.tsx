"use client";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import React, { createContext } from "react";

interface Toast {
  toast: NotificationInstance;
}
export const ToastContext = createContext<Toast | null>(null);
function ToastProvider({ children }: { children: React.ReactNode }) {
  const [api, contextHolder] = notification.useNotification({
    stack: true,
    showProgress: true,
  });

  return (
    <ToastContext.Provider value={{ toast: api }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
