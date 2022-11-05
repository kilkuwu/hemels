import Link from "next/link";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Link href="/practice">
        <a className={styles.mainButton}>💪</a>
      </Link>
      <Link href="/add">
        <a className={styles.mainButton}>➕</a>
      </Link>
    </div>
  );
}
