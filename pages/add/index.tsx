import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "components/special/loading";

export default function Practice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getLoading = () => {
    return () => setLoading(true);
  }

  return (
    <Loading loading={loading}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <Link href={`${router.asPath}/multiple_choice`}>
            <a onClick={getLoading()} className={styles.submenuButton}>Multiple Choice</a>
          </Link>
          <Link href={`${router.asPath}/completion`}>
            <a onClick={getLoading()} className={styles.submenuButton}>Completion</a>
          </Link>
          <Link href={`${router.asPath}/matching`}>
            <a onClick={getLoading()} className={styles.submenuButton}>Matching</a>
          </Link>
          <Link href={`${router.asPath}/multiple_choice?type=0`}>
            <a onClick={getLoading()} className={styles.submenuButton}>True/False</a>
          </Link>
        </div>
      </div>
    </Loading>
  );
}

export async function getStaticProps() {
  return {
    props: {
      isProtected: true,
    },
  };
}
