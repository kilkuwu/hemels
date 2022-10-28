import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import CKBalloonWithLoading from "../../../components/RTEs/CKBalloonWithLoading";
import CKInlineWithLoading from "../../../components/RTEs/CKInlineWithLoading";
import { useRouter } from "next/router";

export default function MultipleChoice() {
  const [choices, setChoices] = useState<
    { content: string; correct: boolean }[]
  >([]);
  const [question, setQuestion] = useState("");
  const [note, setNote] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { type, choices } = router.query;

    console.log(choices);

    let flag = true;

    if (choices) {
      let checkChoice: any;
      try {
        if (Array.isArray(choices)) {
          checkChoice = choices.map((choice) => JSON.parse(choice));
        } else {
          checkChoice = JSON.parse(choices.replace(/&quot;/gi, '"'));
        }

        if (!Array.isArray(checkChoice)) {
          flag = false;
        } else {
          let count = 0;
          const newChoice = checkChoice.map((val) => {
            let { content, correct } = val;
            if (count == 1) correct = false;
            if (correct) count++;
            return {
              content: content || "",
              correct: correct || false,
            };
          });
          setChoices(newChoice);
        }
      } catch (SyntaxError) {
        flag = false;
      }
    } else {
      flag = false;
    }

    if (flag) return;

    if (type == "true_false") {
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
  }, [router.isReady]);

  const handleSubmit = () => {
    let correct = -1;
    const choiceContents = [];
    for (let i = 0; i < choices.length; i++) {
      choiceContents.push(choices[i].content);
      if (choices[i].correct) correct = i;
    }
    if (correct === -1) return alert("You didn't specify the correct answer!");
    const questionObject = {
      statement: question,
      choices: choiceContents,
      correct: correct,
      type: "multiple_choice",
    };
    let questions: any = localStorage.getItem("questions") || "[]";
    questions = JSON.parse(questions);
    questions.push(questionObject);
    console.log(questions);
    localStorage.setItem("questions", JSON.stringify(questions));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div>
          <div className={styles.head}>Question</div>
          <div className={styles.headEditor}>
            <CKInlineWithLoading
              data={question}
              onChange={(_, editor) => {
                setQuestion(editor.getData());
              }}
              onReady={(editor) => editor?.focus()}
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
            <CKInlineWithLoading
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
