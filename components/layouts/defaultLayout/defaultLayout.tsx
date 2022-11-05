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
import { useUser } from "providers/UserProvider";
import Image from "next/image";
import { useNotification } from "providers/NotificationsProvider";

class NavOption {
  name: string;
  icon: typeof faHome;
  path: string;
  constructor(name: string, icon: typeof faHome, path: string) {
    this.name = name;
    this.icon = icon;
    this.path = path;
  }
}

const navOptions = [
  new NavOption("Home", faHome, "/"),
  new NavOption("Practice", faBarsProgress, "/practice"),
  new NavOption("Add", faPlus, "/add"),
];

export default function DefaultLayout({ children }) {
  const router = useRouter();
  const [user, dispatchUser] = useUser();
  const dispatchNotifications = useNotification();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatchUser({
      type: 0,
    });
    dispatchNotifications(1, "You have logged out of your account!");
  };

  return (
    <>
      <Head>
        <title>{router.asPath}</title>
      </Head>
      <div className={styles.layoutContainer}>
        <nav className={styles.navSection}>
          <div className={styles.routesNav}>
            {navOptions.map((val, index) => {
              return (
                <Link key={index} href={val.path}>
                  <a className={styles.navOption} data-name={val.name}>
                    <FontAwesomeIcon
                      icon={val.icon}
                      className={styles.navIcon}
                    />
                  </a>
                </Link>
              );
            })}
          </div>
          <div className={styles.bottomLeftSettings}>
            {user ? (
              <div className={styles.userSettings}>
                <div className={styles.userSettingsOptions}>
                  <div className={styles.userSettingsOption}>Settings</div>
                  <div
                    className={styles.userSettingsOption}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
                <img
                  className={styles.userImage}
                  src={user.pictureUrl || "/default_avatar.png"}
                  alt={"User profile picture"}
                />
              </div>
            ) : (
              <div className={styles.userImage}>Login</div>
            )}
          </div>
        </nav>
        <main className={styles.mainSection}>{children}</main>
      </div>
    </>
  );
}
