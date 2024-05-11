import React from "react";
import QuizExercise from "./QuizExercise";

export default function QuizListExercise({ quizList }) {
  return (
    <div className="">
      <div class="alert alert-warning" role="alert">
        <h1>This component is under developing</h1>
      </div>
      {quizList.map((quiz) => (
        <QuizExercise key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
