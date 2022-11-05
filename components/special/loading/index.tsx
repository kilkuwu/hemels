import styles from "./styles.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconInside} />
        <div className={styles.iconInside} />
      </div>
    </div>
  );
}
