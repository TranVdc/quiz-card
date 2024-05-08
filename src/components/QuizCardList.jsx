import React from "react";
import QuizCard from "./QuizCard";
import styles from "./quizcardlist.module.css";

export default function QuizCardList({ quizList }) {
  return (
    <div className={styles.quizListContainer}>
      {quizList.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
