import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBarsProgress,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function DefaultLayout({ children }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.asPath}</title>
      </Head>
      <div className={styles.layoutContainer}>
        <nav className={styles.navSection}>
          <div className={styles.routesNav}>
            <Link href="/">
              <a className={styles.navOption}>
                <FontAwesomeIcon icon={faHome} className={styles.navIcon} />{" "}
                Home
              </a>
            </Link>
            <Link href="/practice">
              <a className={styles.navOption}>
                <FontAwesomeIcon
                  icon={faBarsProgress}
                  className={styles.navIcon}
                />{" "}
                Practice
              </a>
            </Link>
            <Link href="/add">
              <a className={styles.navOption}>
                <FontAwesomeIcon icon={faPlus} className={styles.navIcon} /> Add
              </a>
            </Link>
          </div>
        </nav>
        <main className={styles.mainSection}>{children}</main>
      </div>
    </>
  );
}
