import DefaultLayout from "components/layouts/defaultLayout/defaultLayout";
import "styles/globals.css";
import "styles/normalize.css";
import NotificationsContextProvider from "providers/NotificationsProvider";
import UserProvider from "providers/UserProvider";
import Protected from "components/special/protected";
import { useEffect, useState } from "react";
import Loading from "components/special/loading";

function MyApp({ Component, pageProps, router }) {
  const { isProtected, permission, layout, ...props } = pageProps;

  const Layout = layout || DefaultLayout;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      setLoading(true);
    });

    router.events.on('routeChangeComplete', (url) => {
      setLoading(false);
    });;
  }, [router.events]);


  return (
    <NotificationsContextProvider>
      <UserProvider>
        <Layout>
          {
            loading ? <Loading /> : (isProtected ? (
              <Protected permission={permission}>
                <Component {...props} />
              </Protected>
            ) : (
              <Component {...props} />
            ))
          }
        </Layout>
      </UserProvider>
    </NotificationsContextProvider>
  );
}

export default MyApp;
