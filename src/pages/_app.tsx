import DefaultLayout from "../components/layouts/defaultLayout/defaultLayout";
import "../styles/globals.css";
import "../styles/normalize.css";
import NotificationsContextProvider from "../providers/NotificationsProvider";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || DefaultLayout;

  return (
    <NotificationsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationsContextProvider>
  );
}

export default MyApp;
