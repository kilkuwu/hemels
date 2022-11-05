import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "providers/NotificationsProvider";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const dispatchNotifications = useNotification();
  const router = useRouter();

  async function register(data: {
    email: string;
    username: string;
    password: string;
    pictureUrl: string;
  }) {
    if (!email || !username || !password) {
      return dispatchNotifications(
        3,
        "You did not provide enough information to register an account!"
      );
    }

    if (password.length < 8) {
      return dispatchNotifications(
        3,
        "Password has to be at least 8-character long!"
      );
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.success) {
      return dispatchNotifications(2, jsonResponse.error);
    }

    dispatchNotifications(1, "Successfully created an account!");

    router.push("/login");
  }

  return (
    <div className={styles.loginWrapper}>
      <form
        className={styles.loginForm}
        onSubmit={async (e) => {
          e.preventDefault();

          register({
            email,
            username,
            password,
            pictureUrl,
          });
        }}
      >
        <label>Register</label>
        <input
          placeholder="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Username"
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Profile picture URL"
          type={"text"}
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSignIn} />
        </button>
        <Link href={"/login"}>
          <a className={styles.registerButton}>Have an account? Login!</a>
        </Link>
      </form>
    </div>
  );
}
