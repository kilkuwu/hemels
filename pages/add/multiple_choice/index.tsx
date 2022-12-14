import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useNotification } from "providers/NotificationsProvider";
import Loading from "components/special/loading";
import CKBalloonWithLoading from "components/RTEs/CKBalloonWithLoading";
import { QuestionType } from "models/Question";
import { useUser } from "providers/UserProvider";

export default function MultipleChoice() {
  const [choices, setChoices] = useState<
    { content: string; correct: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [user, _] = useUser();

  useEffect(() => {
    if (!router.isReady) return;
    if (!isLoading) return;
    const { type } = router.query;

    if (+type == 0) {
      setChoices([
        {
          content: "True",
          correct: false,
        },
        {
          content: "False",
          correct: false,
        },
      ]);
    } else {
      setChoices(Array(4).fill({ content: "", correct: false }));
    }
    setIsLoading(false);
  }, [router.isReady, isLoading, router.query]);

  const [question, setQuestion] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useNotification();

  if (isLoading) return <Loading />;

  const handleSubmit = async () => {
    let correct = -1;
    const choiceContents = [];
    for (let i = 0; i < choices.length; i++) {
      choiceContents.push(choices[i].content);
      if (choices[i].correct) correct = i;
    }
    if (correct === -1) return dispatch(2, "There must be an answer!");
    let finalQuestion: QuestionType = {
      question: question,
      tags: ["multiple choice"],
      data: {
        choices: choiceContents,
        correct: correct,
      },
      author_id: user._id,
      note: note
    };
    const res = await fetch("/api/question", {
      method: "POST",
      body: JSON.stringify(finalQuestion),
    });

    console.log(await res.json());
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div>
          <div className={styles.head}>Question</div>
          <div className={styles.headEditor}>
            <CKBalloonWithLoading
              data={question}
              onChange={(_, editor) => {
                setQuestion(editor.getData());
              }}
            />
          </div>
        </div>
        <div>
          <div className={styles.head}>Choices</div>
          <div>
            {choices.map((value, index) => {
              return (
                <div
                  className={styles.choice}
                  data-chosen={value.correct}
                  key={index}
                >
                  <div
                    className={styles.choiceLetter}
                    onClick={() =>
                      setChoices(
                        choices.map((val, i) => {
                          return {
                            ...val,
                            correct: i == index,
                          };
                        })
                      )
                    }
                  >
                    {String.fromCharCode(97 + index).toUpperCase()}
                  </div>
                  <div className={styles.choiceEditor}>
                    <CKBalloonWithLoading
                      data={value.content}
                      onChange={(_, editor) =>
                        setChoices(
                          choices.map((val, i) => {
                            return {
                              ...val,
                              content:
                                i == index ? editor.getData() : val.content,
                            };
                          })
                        )
                      }
                    />
                  </div>
                  <div
                    className={styles.choiceRemove}
                    onClick={() =>
                      setChoices([
                        ...choices.slice(0, index),
                        ...choices.slice(index + 1),
                      ])
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.choiceAddWrapper}>
          <div
            className={styles.choiceAdd}
            onClick={() =>
              setChoices([...choices, { content: "", correct: false }])
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div>
          <div className={styles.head}>Note</div>
          <div className={styles.headEditor}>
            <CKBalloonWithLoading
              data={note}
              onChange={(_, editor) => {
                setNote(editor.getData());
              }}
            />
          </div>
        </div>
        <div className={styles.submitButtonWrapper}>
          <div className={styles.submitButton} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      isProtected: true,
      permission: 1,
    },
  };
}
