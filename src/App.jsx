import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';


const App = () => {
  const [todolist, setTodolist] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  const saveTodoList = (event) => {
    event.preventDefault();
    const toname = event.target.toname.value.trim();
    if (toname === '') {
      alert("Task can't be empty");
      return;
    }
    if (!todolist.includes(toname)) {
      setTodolist([...todolist, toname]);
      event.target.reset();
    } else {
      alert('Task already exists');
    }
  };

  const deleteItem = (indexToDelete) => {
    const updatedList = todolist.filter((_, index) => index !== indexToDelete);
    setTodolist(updatedList);
  };

  const sendEmail = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();

    if (!email) {
      alert('Please enter your email');
      return;
    }
    if (todolist.length === 0) {
      alert('Your to-do list is empty!');
      return;
    }

    const formattedTodoList = todolist.map((task, idx) => `${idx + 1}. ${task}`).join('\n');

    emailjs
      .send(
        'service_opkwx29',       // your service ID
        'template_qubx606',      // your template ID
        {
          user_email: email,
          message: formattedTodoList,
          name: 'User',
        },
        'v2bcBugmJJif5y6z6'     // your public key
      )
      .then(() => {
        alert('Email sent successfully!');
        setEmailSent(true);
      })
      .catch((err) => {
        console.error('FAILED TO SEND EMAIL:', err);
        alert('Failed to send email. Please check console for details.');
      });
  };

  if (emailSent) {
    return (
      <>
        <h2 className="Heading" style={{ textAlign: 'center', marginTop: '2rem' }}>
          Thank you! Your to-do list has been sent.
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
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

      {/* Email input form */}
      <form onSubmit={sendEmail} className="emailForm" style={{ marginTop: '20px' }}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Enter your email to receive tasks"
          required
        />
        <button className="btn" type="submit">Send To Email</button>
      </form>

   
    </>
  );
};

function ToDoListItems({ task, onDelete }) {
  return (
    <li>
      {task} <span onClick={onDelete} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>&times;</span>
    </li>
  );
}

export default App;
