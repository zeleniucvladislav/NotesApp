import { createContext, useContext } from "react";
import { NotificationType } from "types/notification.type";

type NotificationContextType = {
  notification: NotificationType;
  handleNotification: (notification: NotificationType) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notification: {},
  handleNotification: () => {},
});

export const useNotificationContext = () => useContext(NotificationContext);
