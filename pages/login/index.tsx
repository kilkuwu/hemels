import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "providers/NotificationsProvider";
import { useUser } from "providers/UserProvider";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { decode, JwtPayload } from "jsonwebtoken";
import Loading from "components/special/loading";

export default function Login() {
  const [user, dispatchUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatchNotifications = useNotification();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (!user) return;

    router.push("/");

    if (!loading)
      dispatchNotifications(0, "You have already logged in!");
  }, [dispatchNotifications, router, user, loading]);

  async function validateEmailAndPassword(email: string, password: string) {
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.token) {
      return dispatchNotifications(2, jsonResponse.error);
    }

    localStorage.setItem("accessToken", jsonResponse.token);

    function getPayload() {
      const info: any = decode(jsonResponse.token);

      delete info.exp;
      delete info.iat;
      delete info.__v;

      return info;
    }

    dispatchUser({
      type: 0,
      payload: getPayload(),
    });

    dispatchNotifications(1, "Successfully logged in!");


    router.push("/");
  }

  return (
    <Loading loading={loading}>
      <div className={styles.loginWrapper}>
        <form
          className={styles.loginForm}
          onSubmit={(e) => {
            e.preventDefault();

            setLoading(true);

            validateEmailAndPassword(email, password);
          }}
        >
          <label>Login</label>
          <input
            placeholder="Email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            <FontAwesomeIcon icon={faSignIn} />
          </button>
          <Link href={"/register"}>
            <a className={styles.registerButton}>
              Have no account? Register one!
            </a>
          </Link>
        </form>
      </div>
    </Loading>
  );
}
