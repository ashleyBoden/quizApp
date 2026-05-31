import { useState } from "react";
import Start from "./start";
import Quiz from "./quiz";
import questions from "./questions";
import Result from "./result";
import "./App.css";

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [screen, setScreen] = useState("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

  if (screen === "start") return <Start startQuiz={() => {
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
    setScreen("quiz");
  }} />;
  if (screen === "quiz") return <Quiz questions={shuffledQuestions} questionIndex={questionIndex} score={score} setScore={setScore} setScreen={setScreen} setQuestionIndex={setQuestionIndex} />;
  if (screen === "result") return <Result score={score} questions={shuffledQuestions} setScreen={setScreen} setScore={setScore} setQuestionIndex={setQuestionIndex}/>;
}

