import useField from './hooks/useField';// Assuming you move useField to a separate file
import useResource from './hooks/useResource'; // Adjust import path as necessary

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.onChange({ target: { value: '' } }); // Clear input after submit
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.onChange({ target: { value: '' } }); // Clear input after submit
    number.onChange({ target: { value: '' } }); // Clear input after submit
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;
