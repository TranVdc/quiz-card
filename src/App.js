import logo from "./logo.svg";
import "./App.css";
import QuizCardList from "./components/QuizCardList";
import { createElement, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [quizList, setquizList] = useState();
  const [isLoading, setisLoading] = useState(true);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain; charset=UTF-8");
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=50&type=multiple`, myHeaders)
      .then((res) => {
        setquizList(
          res.data.results.map((q) => {
            const correct_answer = decodeString(q.correct_answer);
            const options = [
              ...q.incorrect_answers.map((a) => decodeString(a)),
              correct_answer,
            ];
            return {
              id: Math.random(),
              question: decodeString(q.question),
              answer: correct_answer,
              options: options,
            };
          })
        );
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("please reload page");
      });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="App">
      {isLoading ? (
        "Loading 🔃🔃🔃🔃🔃🔃🔃🔃🔃🔃🔃, Please wait"
      ) : (
        <QuizCardList quizList={quizList} />
      )}
    </div>
  );
}

// const QUICZ_CARD_LIST = [
//   {id: 1, question: "what are 2 +2?", answer: 4, options: "1 2 3 4"},
//   {id: 2, question: "what are 3 +2?", answer: 5, options: "5 6 7 8"},
//   {id: 3, question: "what are 3 +3?", answer: 6, options: "5 6 3 4"},
// ];

export default App;
