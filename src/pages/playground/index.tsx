import styles from "./styles.module.scss";
import { useNotification } from "../../providers/NotificationsProvider";

const Test = () => {
  const sendNotification = useNotification();

  const testSendNotif = (type: 0 | 1 | 2 | 3) => {
    console.log("nice");
    const message = prompt("What message");
    sendNotification(type, message);
  };
  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.circleProgress}></div>
      <button onClick={() => testSendNotif(0)}>NORMAL</button>
      <button onClick={() => testSendNotif(1)}>SUCCESS</button>
      <button onClick={() => testSendNotif(2)}>FAILURE</button>
      <button onClick={() => testSendNotif(3)}>WARNING</button>
    </div>
  );
};

export default Test;
