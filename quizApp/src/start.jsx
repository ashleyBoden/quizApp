export default function Start(props) {
  return (
    <div className="card start-card">
      <h2>Welcome to the Quiz App!</h2>
      <p>Test your knowledge with our fun and interactive quiz.</p>
      <p>Click the button below to get started!</p>
      <button className="start-btn" onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  )
}