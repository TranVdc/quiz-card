import React, { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import axios from "axios";

export default function Search({ quizList, setquizList }) {
  const [categoryList, setcategoryList] = useState([]);
  const numberOfCountRef = useRef("");
  const difficultyRef = useRef("");
  const categoriesRef = useRef("");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain; charset=UTF-8");

  useEffect(() => {
    axios.get(`https://opentdb.com/api_category.php`, myHeaders).then((res) => {
      setcategoryList(
        res.data.trivia_categories.map((category) => {
          return { id: category.id, name: category.name };
        })
      );
    });
  }, []);

  function HandleClick(e) {
    e.preventDefault();
    const count = numberOfCountRef.current.value
      ? numberOfCountRef.current.value
      : 50;
    const categoryId = categoriesRef.current.value;
    const difficulty = difficultyRef.current.value;
    axios
      .get(
        `https://opentdb.com/api.php?amount=${count}&category=${categoryId}&difficulty=${difficulty}`
      )
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="container">
      <form className={styles.searchForm}>
        <label htmlFor="">Select Category</label>
        <select name="categories" ref={categoriesRef}>
          <option value="">Any Category</option>
          {categoryList.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

        <label htmlFor="">Select Difficulty</label>
        <select name="difficulty" ref={difficultyRef}>
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="">Number of Questions</label>
        <input type="text" name="numberOfCount" ref={numberOfCountRef} />
        <button onClick={(e) => HandleClick(e)}>Show Quiz</button>
      </form>
    </div>
  );
}
