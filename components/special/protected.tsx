import { useRouter } from "next/router";
import { useNotification } from "providers/NotificationsProvider";
import { useEffect } from "react";
import { useUser } from "../../providers/UserProvider";
import Loading from "./loading";

export default function Protected({ children, permission }) {
  const [user, _] = useUser();
  const router = useRouter();
  const dispatchNotifications = useNotification();

  useEffect(() => {
    if (!router.isReady) return;
    setTimeout(() => {
      if (user == null) {
        router.push("/login");
        dispatchNotifications(3, "Please log in before accessing this page!");
        return;
      }
      const havePermisison = (user.permission >> permission) & 1;
      if (!havePermisison) {
        router.push("/");
        dispatchNotifications(
          2,
          "You do not have the permission to see this page!"
        );
      }
    }, 1000);
  }, [user, dispatchNotifications, permission, router]);

  let condition = user != null;
  if (condition && permission) {
    condition = condition && ((user.permission >> permission) & 1) == 1;
  }

  if (!condition) return <Loading />;

  return <>{children}</>;
}
