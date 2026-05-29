import { useState } from "react";

export default function Quiz({ questions, questionIndex, score, setScore, setScreen, setQuestionIndex }) {

  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

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
            <ul className="answers">
                {questions[questionIndex].answers.map((answer) => (
                    <li className={getAnswerClass(answer)} key={answer} onClick={() => 
                        handleAnswer(answer)}>
                        {answer}
                    </li>
                ))}
            </ul>
            {hasAnswered && <p className="feedback">{selectedAnswer === questions[questionIndex].correctAnswer ? "Correct!" : `Incorrect! The correct answer is: ${questions[questionIndex].correctAnswer}`}</p>}
            {hasAnswered && (
                <button className="next-btn" onClick={() => {
                    setHasAnswered(false);
                    setSelectedAnswer("");

                    if (questionIndex >= questions.length - 1) {
                        setScreen("result");
                    } else {
                        setQuestionIndex(questionIndex + 1);
                    }
                }}>Next</button>
            )}
        </div>
    )
}