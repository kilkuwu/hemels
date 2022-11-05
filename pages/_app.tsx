import DefaultLayout from "components/layouts/defaultLayout/defaultLayout";
import "styles/globals.css";
import "styles/normalize.css";
import NotificationsContextProvider from "providers/NotificationsProvider";
import UserProvider from "providers/UserProvider";
import Protected from "components/special/protected";
import { motion, AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  const { isProtected, permission, layout, ...props } = pageProps;

  const Layout = layout || DefaultLayout;

  return (
    <NotificationsContextProvider>
      <UserProvider>
        <Layout>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <AnimatePresence>
              <motion.div
                key={router.route}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                  pageExit: {
                    opacity: 0,
                  },
                }}
                transition={{
                  type: "just",
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {isProtected ? (
                  <Protected permission={permission}>
                    <Component {...props} />
                  </Protected>
                ) : (
                  <Component {...props} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Layout>
      </UserProvider>
    </NotificationsContextProvider>
  );
}

export default MyApp;
