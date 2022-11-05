import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "providers/NotificationsProvider";
import { useUser } from "providers/UserProvider";
import { useState } from "react";
import styles from "./styles.module.scss";
import { decode, JwtPayload } from "jsonwebtoken";

export default function Login() {
  const [user, dispatchUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatchNotifications = useNotification();
  const router = useRouter();

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
      const info = decode(jsonResponse.token, {
        json: true,
      });
      return {
        email: info.email,
        username: info.username,
        pictureUrl: info.pictureUrl,
        permission: info.permission,
      };
    }

    dispatchUser({
      type: 0,
      payload: getPayload(),
    });

    dispatchNotifications(1, "Successfully logged in!");

    router.push("/");
  }

  return (
    <div className={styles.loginWrapper}>
      <form
        className={styles.loginForm}
        onSubmit={async (e) => {
          e.preventDefault();

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
  );
}
