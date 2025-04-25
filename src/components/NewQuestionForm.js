// NewQuestionForm.js (assuming this is where the form lives)
function NewQuestionForm({ setQuestions }) {
    const [formData, setFormData] = useState({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:4000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const newQuestion = await response.json();
        
        // Update state with new question
        setQuestions(prev => [...prev, newQuestion]);
        
        // Reset form
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0
        });
      } catch (error) {
        console.error('Error creating question:', error);
      }
    };
  
    // ... rest of form handling code
  }