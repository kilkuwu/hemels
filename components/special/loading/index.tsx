import styles from "./styles.module.scss";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconInside} />
        <div className={styles.iconInside} />
      </div>
      <div className={styles.loadingText}>{text ? text : ""}</div>
    </div>
  );
}
