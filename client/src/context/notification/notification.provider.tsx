import { useState } from "react";

import { NotificationContext } from "./notification.context";
import { NotificationType } from "types/notification.type";

export const NotificationProvider = ({ children }: any) => {
  const [notification, setNotification] = useState<NotificationType>({});

  const handleNotification = (message: NotificationType) => {
    setNotification(message);

    setTimeout(() => {
      setNotification({});
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={{ notification, handleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
