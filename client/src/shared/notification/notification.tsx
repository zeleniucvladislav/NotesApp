import { useNotificationContext } from "context/notification/notification.context";

import { FaCheck, FaExclamation } from "react-icons/fa";

import styles from "./notification.module.scss";

const Notification = () => {
  const { notification } = useNotificationContext();

  const ShowNotification = ({ notification }: any) => {
    let status = "";

    if (notification.status > 400) {
      status = "error";
    } else if (notification.status < 400) {
      status = "success";
    }

    const notificationStyle = `${styles.notification} ${
      status === "success"
        ? styles.notification_success
        : styles.notification_error
    } `;
    const icon = status === "success" ? <FaCheck /> : <FaExclamation />;

    return (
      <div className={notificationStyle}>
        {icon} {notification.message}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {notification?.message && (
        <ShowNotification notification={notification} />
      )}
    </div>
  );
};

export default Notification;
