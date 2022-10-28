import { CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import dynamic from "next/dynamic";
import { MutableRefObject, useRef, useState } from "react";
import styles from "./styles.module.scss";
const CKBalloonBlock = dynamic(() => import("../CKBalloonBlock"), {
  ssr: false,
});

function CKBalloonBlockWithLoading(props: CKPropsWithoutEditor) {
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
      <CKBalloonBlock
        {...props}
        onReady={(editor) => {
          if (loadingRef.current) {
            loadingRef.current.classList.add(styles.fadeOut);
            loadingRef.current.addEventListener("animationend", () => {
              setLoaded(true);
              if (props.onReady != null) return props.onReady(editor);
            });
          } else if (props.onReady != null) return props.onReady(editor);
        }}
      />
    </div>
  );
}

export default CKBalloonBlockWithLoading;
