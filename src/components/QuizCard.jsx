import React, { useState } from "react";
import styles from "./quizcard.module.css";
export default function QuizCard({ quiz }) {
  const [flip, setFlip] = useState();
  return (
    <div key={quiz.id} className={styles.quizCardContainer}>
      <div className={styles.quizCardInner}>
        <div className={styles.quizCardFront}>
          <div>
            <h3 className={styles.questionContent}>{quiz.question}</h3>
            <ol className={styles.optionList}>
              {quiz.options.map((option) => (
                <li>{option}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className={styles.quizCardBack}>{quiz.answer}</div>
      </div>
    </div>
  );
}
