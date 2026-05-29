export default function Result({ score, questions, setScreen, setScore, setQuestionIndex }) {
    return (
        <div className="card">
            <h2>Your Score: {score} out of {questions.length}</h2>
            <button onClick={() => {
                setScreen("start");
                setScore(0);
                setQuestionIndex(0);
            }} className="restart-btn">
                Restart Quiz
            </button>
        </div>
    )
}