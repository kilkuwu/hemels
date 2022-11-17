import { createContext, Dispatch, useContext, useReducer } from "react";
import { PropsWithChildren } from "react";
import { v4 } from "uuid";
import Notification from "./Notification";
import styles from "./styles.module.scss";

/**
 * ```
 * 0: NORMAL
 * 1: SUCCESS
 * 2: FAILURE
 * 3: WARNING
 * 4: LOADING
 * ```
 */
type NotificationTypeType = 0 | 1 | 2 | 3 | 4;

export interface NotificationType {
  /** Can be generated using uuid/v4 */
  id: string;
  type?: NotificationTypeType;
  /** The message of the notification */
  message?: string;
}

export interface NotificationActionType {
  /**
   * ```
   * 0: ADD
   * 1: REMOVE
   * ```
   */
  type: 0 | 1;
  /** It suffices to provide only the id when removing a notification */
  payload: NotificationType;
}

export const NotificationsContext = createContext<
  Dispatch<NotificationActionType>
>(() => null);

export default function NotificationsProvider(props: PropsWithChildren) {
  const [notifications, dispatchNotifications] = useReducer(
    (state: NotificationType[], action: NotificationActionType) => {
      switch (action.type) {
        case 0:
          return [...state, action.payload];
        case 1:
          return state.filter((val) => val.id !== action.payload.id);
        default:
          return state;
      }
    },
    []
  );

  return (
    <NotificationsContext.Provider value={dispatchNotifications}>
      <div className={styles.notificationsProvider}>
        <div className={styles.notificationsBlock}>
          {notifications.map((notification) => {
            return (
              <Notification
                key={notification.id}
                dispatch={dispatchNotifications}
                notification={notification}
              />
            );
          })}
        </div>
        <div>{props.children}</div>
      </div>
    </NotificationsContext.Provider>
  );
}

export const useNotification = () => {
  const dispatchNotifications = useContext(NotificationsContext);
  /**
   * Send a notification
   *
   * @param type
   * ```
   * 0: NORMAL
   * 1: SUCCESS
   * 2: FAILURE
   * 3: WARNING
   * 4: LOADING
   * ```
   */
  const sendNotification = (type: NotificationTypeType, message: string) => {
    dispatchNotifications({
      type: 0,
      payload: {
        id: v4(),
        type: type,
        message: message,
      },
    });
  };

  return sendNotification;
};
