import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Practice() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <Link href={`${router.asPath}/random`}>
          <a className={styles.submenuButton}>Random</a>
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
