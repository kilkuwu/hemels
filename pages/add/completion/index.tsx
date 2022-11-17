import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import CKBalloonWithLoading from "components/RTEs/CKBalloonWithLoading";
import { Balloon } from "ckeditor-super-build/ckeditor";
import { randomBytes } from "crypto";
import { QuestionType } from "models/Question";
import { useUser } from "providers/UserProvider";

const checkValidCharacter = (char: string) => {
  return char.match(/^\w$/g);
};

export default function Completion() {
  const [question, setQuestion] = useState("");
  const [note, setNote] = useState("");
  const [answers, setAnswers] = useState<
    {
      name: string;
      position: number;
      content: string;
      regex: boolean;
    }[]
  >([]);
  const analyzedQuestion = useRef<string>();
  const [user, _] = useUser();

  const analyzeData = (data: string) => {
    const answerStack = [];
    let currentQuestion = "";
    let finalData = "";
    let j = 0;
    let isEscapeEscaped = false;
    const what = new Map<string, string>();
    for (const x of answers) {
      what.set(x.name, x.content);
    }
    for (let i = 0; i < data.length; i++) {
      if (currentQuestion.length > 0) {
        if (checkValidCharacter(data[i])) {
          currentQuestion += data[i];
        } else if (data[i] == "}") {
          currentQuestion += data[i];
          const answerName = currentQuestion.slice(1, -1);
          answerStack.push({
            name: answerName || randomBytes(4).toString("hex"),
            position: j,
            content: what.get(answerName) || "",
          });
          currentQuestion = "";
        } else {
          currentQuestion += data[i];
          finalData += currentQuestion;
          j += currentQuestion.length;
          currentQuestion = "";
        }
        continue;
      }

      if (data[i - 1] == "\\" && !isEscapeEscaped) {
        finalData += data[i];
        j++;
        if (data[i] == "\\") isEscapeEscaped = true;
        else isEscapeEscaped = false;
        continue;
      }
      isEscapeEscaped = false;
      if (data[i] == "\\") continue;

      if (data[i] != "{") {
        finalData += data[i];
        j++;
        continue;
      }

      currentQuestion = "{";
    }

    if (currentQuestion.length > 0) {
      finalData += currentQuestion;
      currentQuestion = "";
    }

    analyzedQuestion.current = finalData;
    setAnswers(answerStack);
  };

  const handleSubmit = async () => {
    let finalQuestion: QuestionType = {
      question: analyzedQuestion.current,
      tags: ["completion"],
      data: answers.map((val) => {
        return {
          content: val.content,
          position: val.position,
          regex: val.regex,
        };
      }),
      author_id: user._id,
      note: note
    };

    const res = await fetch("/api/question", {
      method: "POST",
      body: JSON.stringify(finalQuestion),
    });

    console.log(await res.json());
  };

  const checkValidRegex = (i: number) => {
    if (!answers[i].regex) return;
    let isValid = true;
    let errorString = "";
    try {
      new RegExp(answers[i].content);
    } catch (e) {
      isValid = false;
      errorString = e.message;
    }

    return isValid ? (
      <></>
    ) : (
      <div className={styles.invalidRegex}>{errorString}</div>
    );
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
              onBlur={() => {
                analyzeData(question);
              }}
            />
          </div>
        </div>
        <div>
          <div className={styles.head}>Answers</div>
          <div>
            {answers.map((value, index) => {
              return (
                <div className={styles.answer} key={index}>
                  {checkValidRegex(index)}
                  <div className={styles.answerName}>{value.name}</div>
                  <input
                    className={styles.answerEditor}
                    type="text"
                    value={value.content}
                    onChange={(e) =>
                      setAnswers(
                        answers.map((val, i) => {
                          if (index != i) return val;
                          return {
                            ...val,
                            content: e.target.value,
                          };
                        })
                      )
                    }
                  />
                  <button
                    title="RegEx"
                    className={styles.regexButton}
                    data-regex={value.regex}
                    onClick={() =>
                      setAnswers(
                        answers.map((val, i) => {
                          if (index != i) return val;

                          return {
                            ...val,
                            regex: Boolean(!value.regex),
                          };
                        })
                      )
                    }
                  >
                    (.*)
                  </button>
                </div>
              );
            })}
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
          <button className={styles.submitButton} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
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
