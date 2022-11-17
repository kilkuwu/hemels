import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Practice() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <Link href={`${router.asPath}/multiple_choice`}>
          <a className={styles.submenuButton}>Multiple Choice</a>
        </Link>
        <Link href={`${router.asPath}/completion`}>
          <a className={styles.submenuButton}>Completion</a>
        </Link>
        <Link href={`${router.asPath}/matching`}>
          <a className={styles.submenuButton}>Matching</a>
        </Link>
        <Link href={`${router.asPath}/multiple_choice?type=0`}>
          <a className={styles.submenuButton}>True/False</a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      isProtected: true,
    },
  };
}
