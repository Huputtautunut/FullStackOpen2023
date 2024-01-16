import React from 'react';

// Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

// StatisticLine component
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;

  if (totalFeedback === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  const averageScore = (good - bad) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total Feedback" value={totalFeedback} />
          <StatisticLine text="Average Score" value={averageScore.toFixed(2)} />
          <StatisticLine text="Positive Feedback" value={`${positivePercentage.toFixed(2)}%`} />
        </tbody>
      </table>
    </div>
  );
};

// App component
const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);

  const handleButtonClick = (type) => {
    // Update the respective state based on the button type
    if (type === 'good') {
      setGood(good + 1);
    } else if (type === 'neutral') {
      setNeutral(neutral + 1);
    } else if (type === 'bad') {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => handleButtonClick('good')} text="Good" />
        <Button onClick={() => handleButtonClick('neutral')} text="Neutral" />
        <Button onClick={() => handleButtonClick('bad')} text="Bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
