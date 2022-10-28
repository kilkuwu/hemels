import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faInfoCircle,
  faExclamationCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { CSSProperties, Dispatch, useEffect, useRef, useState } from "react";
import { NotificationActionType, NotificationType } from "..";

const notificationStyle = [
  styles.notificationNormal,
  styles.notificationSuccess,
  styles.notificationFailure,
  styles.notificationWarning,
];

const notificationIcon = [
  faInfoCircle,
  faCircleCheck,
  faTimesCircle,
  faExclamationCircle,
];

type NotificationComponentProps = {
  dispatch: Dispatch<NotificationActionType>;
  notification: NotificationType;
};

const Notification = ({
  dispatch,
  notification,
}: NotificationComponentProps) => {
  const [percentRemaining, setPercentRemaining] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const notifRef = useRef<HTMLDivElement>();

  const startTimer = () => {
    const id = setInterval(() => {
      console.log("got here");
      setPercentRemaining((prev) => {
        if (prev > 0) {
          return prev - 10;
        }

        clearInterval(id);
        return prev;
      });
    }, 500);

    setIntervalId(id);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
  };

  const handleCloseNotification = () => {
    pauseTimer();
    notifRef.current.classList.add(styles.slideOut);
    notifRef.current.addEventListener("animationend", () => {
      console.log("called dispatch");
      dispatch({
        type: 1,
        payload: {
          id: notification.id,
        },
      });
    });
  };

  useEffect(() => {
    if (percentRemaining !== 0) return;

    handleCloseNotification();
  }, [percentRemaining]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      key={notification.id}
      className={`${styles.notification} ${
        notificationStyle[notification.type]
      }`}
      style={
        {
          "--percent-remaining": percentRemaining,
        } as CSSProperties
      }
      ref={notifRef}
    >
      <div className={styles.notificationIcon}>
        <FontAwesomeIcon icon={notificationIcon[notification.type]} />
      </div>
      <div className={styles.notificationMessage}>{notification.message}</div>
    </div>
  );
};

export default Notification;
