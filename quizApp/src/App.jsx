import { useState } from "react";
import Start from "./start";
import Quiz from "./quiz";
import questions from "./questions";
import Result from "./result";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (screen === "start") return <Start startQuiz={() => setScreen("quiz")} />;
  if (screen === "quiz") return <Quiz questions={questions} questionIndex={questionIndex} score={score} setScore={setScore} setScreen={setScreen} setQuestionIndex={setQuestionIndex} />;
  if (screen === "result") return <Result score={score} questions={questions} setScreen={setScreen} setScore={setScore} setQuestionIndex={setQuestionIndex}/>;
}

