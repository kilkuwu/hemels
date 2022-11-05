import styles from "./styles.module.scss";
import { useNotification } from "../../providers/NotificationsProvider";
import { useEffect } from "react";
import CKBalloonWithLoading from "components/RTEs/CKBalloonWithLoading";

const Test = () => {
  const sendNotification = useNotification();

  const testSendNotif = (type: 0 | 1 | 2 | 3) => {
    console.log("nice");
    const message = prompt("What message");
    sendNotification(type, message);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/question", {
        method: "GET",
      });
      console.log(await res.json());
    };

    fetchQuestions();
  }, []);

  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.circleProgress}></div>
      <CKBalloonWithLoading />
    </div>
  );
};

export default Test;
