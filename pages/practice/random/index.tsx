import Loading from "components/special/loading";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

export default function Random() {
  const router = useRouter();
  const [noOfQuestions, setNoOfQuestions] = useState(20);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  if (!router.isReady) return <>Loading</>;

  const handleMakeTest = () => {
    setLoading(true);

    setTimeout(() => {
      router.push(
        "/practice/play?" +
          new URLSearchParams({
            type: "random",
            n: String(noOfQuestions),
            tags: tags,
          })
      );
    }, 1000);
  };

  const handleValueChange = (func: (x: any) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      func(e.target.value);
    };
  };

  return (
    <Loading loading={loading}>
      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleMakeTest();
          }}
        >
          <label>
            <div className={styles.label}>No. of questions: </div>
            <input
              min={1}
              max={100}
              value={noOfQuestions}
              onChange={handleValueChange(setNoOfQuestions)}
              type={"number"}
            />
          </label>
          <label>
            <div className={styles.label}>Tags: </div>
            <input
              value={tags}
              onChange={handleValueChange(setTags)}
              type={"text"}
            />
          </label>
          <button type="submit">Process</button>
        </form>
      </div>
    </Loading>
  );
}

export async function getStaticProps() {
  return {
    props: {
      isProtected: true,
    },
  };
}
