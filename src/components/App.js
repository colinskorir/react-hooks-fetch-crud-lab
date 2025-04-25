import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList'; // Assuming this component exists
import QuestionForm from './QuestionForm'; // Assuming this component exists

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET /questions: Fetch all questions on component mount
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []); // Empty dependency array to run once on mount

  // POST /questions: Handle new question form submission
  const handleAddQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((savedQuestion) => {
        // Update state with the new question
        setQuestions([...questions, savedQuestion]);
        setShowForm(false); // Hide form after submission
      })
      .catch((error) => console.error('Error adding question:', error));
  };

  // DELETE /questions/:id: Handle question deletion
  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update state by filtering out the deleted question
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error('Error deleting question:', error));
  };

  // PATCH /questions/:id: Handle updating correct answer index
  const handleUpdateQuestion = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        // Update state with the modified question
        setQuestions(
          questions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => console.error('Error updating question:', error));
  };

  return (
    <div>
      <h1>Quiz Admin</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'New Question'}
      </button>
      {showForm && <QuestionForm onSubmit={handleAddQuestion} />}
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateQuestion}
      />
    </div>
  );
}

export default App;