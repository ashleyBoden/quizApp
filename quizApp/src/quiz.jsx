import { useState } from "react";
import { useMemo } from "react";
import { shuffleArray } from "./App";
import { useEffect } from "react";

export default function Quiz({ questions, questionIndex, score, setScore, setScreen, setQuestionIndex }) {

    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const shuffledAnswers = useMemo(() => {
        return shuffleArray(questions[questionIndex].answers);
    }, [questionIndex, questions]);

    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (timer === 0) {
            setHasAnswered(true);
            setSelectedAnswer("");
            return;
        } else if (hasAnswered) {
            return;
        }

        const interval = setInterval(() => {
            setTimer(t => t - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [questionIndex, timer]);

  function handleAnswer(answer) {
    if (answer === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
      setHasAnswered(true);
      setSelectedAnswer(answer); 
    } else {
      setHasAnswered(true);
      setSelectedAnswer(answer);
    }    
  }

    function getAnswerClass(answer) {
        if (!hasAnswered) return "answer";
        if (answer === questions[questionIndex].correctAnswer) return "answer correct";
        if (answer === selectedAnswer) return "answer incorrect";
        return "answer";
    }

    return (
        <div className="card">
            <p className="questionNumber">Question {questionIndex + 1} of {questions.length}</p>
            <p className="question">{questions[questionIndex].question}</p>
            <div className="timer">Time left: {timer}s</div>
            <ul className="answers">
                {shuffledAnswers.map((answer) => (
                    <li className={getAnswerClass(answer)} key={answer} onClick={!hasAnswered ? () => 
                        handleAnswer(answer) : null}>
                        {answer}                        
                    </li>
                ))}
            </ul>
            {hasAnswered && selectedAnswer != "" ? <p className="feedback">{selectedAnswer === questions[questionIndex].correctAnswer ? "Correct!" : `Incorrect! The correct answer is: ${questions[questionIndex].correctAnswer}`}</p> :
            hasAnswered && selectedAnswer === "" ? <p className="feedback">Time's up! The correct answer is: {questions[questionIndex].correctAnswer}</p> : null}
            {hasAnswered && (
                <button className="next-btn" onClick={() => {
                    setHasAnswered(false);
                    setSelectedAnswer("");
                    setTimer(10);
                    if (questionIndex >= questions.length - 1) {
                        setScreen("result");                        } else {
                        setQuestionIndex(questionIndex + 1);                        
                    }
                }}>Next</button>
            )}
        </div>
    )
}