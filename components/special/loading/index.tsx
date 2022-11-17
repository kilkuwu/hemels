import type { ReactNode } from "react";
import styles from "./styles.module.scss";

export default function Loading({
  text,
  loading = true,
  children,
}: {
  text?: string;
  loading?: boolean;
  children?: ReactNode;
}) {
  if (!loading) return <>{children}</>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingWrapper}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconInside} />
          <div className={styles.iconInside} />
        </div>
        <div className={styles.loadingText}>{text ? text : ""}</div>
      </div>
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}
