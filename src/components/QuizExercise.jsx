import React from "react";
import styles from "./quizexercise.module.css";

export default function QuizExercise({ quiz }) {
  return (
    <div key={quiz.id} className={styles.quizCardContainer}>
      <div className={styles.quizCardInner}>
        <div className={styles.quizCardFront}>
          <h3 className={styles.questionContent}>{quiz.question}</h3>
          <ul className={styles.optionList}>
            {quiz.options.map((option) => (
              <li>
                <input type="radio" value="Male" name={quiz.id + "-options"} />{" "}
                {option}
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-info">
            Check Answer
          </button>
        </div>
        <div className={styles.quizCardBack}>{quiz.answer}</div>
      </div>
    </div>
  );
}
