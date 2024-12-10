import React, { useState } from 'react';

interface CardFormProps {
  onAddTask: (task: string) => void;
}

const CardForm: React.FC<CardFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent empty tasks
    onAddTask(task);
    setTask(''); // Clear the input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Enter task..." 
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CardForm;
