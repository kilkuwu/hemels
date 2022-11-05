import Loading from "components/special/loading";
import { decode } from "jsonwebtoken";
import {
  useContext,
  createContext,
  PropsWithChildren,
  Dispatch,
  useReducer,
  useEffect,
  useState,
} from "react";

interface UserType {
  email: string;
  username: string;
  pictureUrl?: string;
  permission: number;
}

interface UserAction {
  type: 0 | 1;
  payload?: UserType;
}

const UserContext = createContext<[UserType, Dispatch<UserAction>]>(null);

export const useUser = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, dispatchUser] = useReducer(
    (state: UserType, action: UserAction) => {
      switch (action.type) {
        case 0:
          return action.payload;
        case 1:
          return null;
        default:
          return state;
      }
    },
    null
  );

  const [fetchUserFinished, setFetchUserFinished] = useState(false);

  useEffect(() => {
    async function fetchUserFromToken(accessToken: string) {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ accessToken }),
      });
      const jsonResponse = await response.json();

      if (!jsonResponse.token) {
        return null;
      }
      const decoded: any = decode(jsonResponse.token);

      return {
        email: decoded.email,
        username: decoded.username,
        pictureUrl: decoded.pictureUrl,
        permission: decoded.permission,
      };
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      dispatchUser({
        type: 1,
        payload: null,
      });
      setFetchUserFinished(true);
    } else {
      fetchUserFromToken(accessToken).then((user) => {
        dispatchUser({
          type: 0,
          payload: user,
        });
        setFetchUserFinished(true);
      });
    }
  }, []);

  if (!fetchUserFinished)
    return (
      <div style={{ height: "100vh" }}>
        <Loading />
      </div>
    );

  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {children}
    </UserContext.Provider>
  );
}
