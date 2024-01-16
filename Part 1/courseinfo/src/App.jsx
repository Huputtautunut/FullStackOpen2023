//Components Heade, Content,
const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ exercises1, exercises2, exercises3 }) => {
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <p>Number of exercises {totalExercises}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ];

  const exercises1 = parts[0].exercises;
  const exercises2 = parts[1].exercises;
  const exercises3 = parts[2].exercises;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  );
};

export default App;
