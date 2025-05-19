import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

const App = () => {
  const [todolist, setTodolist] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  const saveTodoList = (event) => {
    event.preventDefault();

    const task = event.target.toname.value.trim();
    if (task === '') {
      alert("Task can't be empty");
      return;
    }

    if (!todolist.includes(task)) {
      setTodolist([...todolist, task]);
      event.target.reset();
    } else {
      alert("Task already exists");
    }
  };

  const deleteItem = (indexToDelete) => {
    const updatedList = todolist.filter((_, index) => index !== indexToDelete);
    setTodolist(updatedList);
  };

  const sendEmail = (event) => {
    event.preventDefault();

    const email = event.target.user_email.value.trim();

    if (email === '') {
      alert("Please enter your email address");
      return;
    }

    const message = todolist.join('\n');

    const templateParams = {
      message: message,
      user_email: email,
    };

    emailjs.send(
      'service_opkwx29',
      'template_qubx606',
      templateParams,
      'v2bcBugmJJif5y6z6'
    )
      .then(() => {
        setEmailSent(true);
        alert('To-do list sent successfully!');
        event.target.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send email. Please try again later.');
      });
  };

  return (
    <div className="App">
      <h1 className="Heading">To-Do List</h1>

      <form onSubmit={saveTodoList}>
        <input className="input" type="text" name="toname" placeholder="Add a task" />
        <button className="btn" type="submit">Save</button>
      </form>

      <div className="OuterList">
        <ul>
          {todolist.map((value, index) => (
            <ToDoListItems key={index} task={value} onDelete={() => deleteItem(index)} />
          ))}
        </ul>
      </div>

      {todolist.length > 0 && (
        <form onSubmit={sendEmail} className="emailForm">
          <h3>Send To-Do List to Your Email</h3>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Email</button>
        </form>
      )}

      {emailSent && <p className="success">Email has been sent successfully!</p>}
    </div>
  );
};

export default App;

function ToDoListItems({ task, onDelete }) {
  return (
    <li>
      {task} <span onClick={onDelete} style={{ cursor: 'pointer', color: 'red' }}>&times;</span>
    </li>
  );
}
