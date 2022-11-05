import { CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import dynamic from "next/dynamic";
import { MutableRefObject, useRef, useState } from "react";
import styles from "./styles.module.scss";
const CKInline = dynamic(() => import("../CKInline"), {
  ssr: false,
});

export default function CKInlineWithLoading(props: CKPropsWithoutEditor) {
  const [loaded, setLoaded] = useState(false);
  const loadingRef: MutableRefObject<HTMLDivElement> = useRef();

  return (
    <div className={styles.editorWrapper}>
      {loaded ? (
        <></>
      ) : (
        <div className={styles.loading} ref={loadingRef}>
          Loading...
        </div>
      )}
      <CKInline
        {...props}
        onReady={(editor) => {
          if (loadingRef.current) {
            loadingRef.current.classList.add(styles.fadeOut);
            loadingRef.current.addEventListener("animationend", () => {
              setLoaded(true);
            });
          }
          if (props.onReady != null) return props.onReady(editor);
        }}
      />
    </div>
  );
}
