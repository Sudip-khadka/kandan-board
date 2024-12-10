import React from 'react';
import Card from './Card';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
  title: string;
  tasks: string[];
  columnId: string;
  onAddCard: (columnId: string) => void; // Pass the add card function
}

// ✅ Single Source of Truth for Styles
const columnStyle = (isOver: boolean) => ({
  border: '2px solid #ccc',
  padding: '20px',
  minWidth: '200px',
  backgroundColor: isOver ? '#e0e7ff' : '#f4f4f9',
  borderRadius: '8px',
  boxShadow: isOver ? '0 0 8px #4f46e5' : '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s, box-shadow 0.3s',
});

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId, onAddCard }) => {
  // 🟢 Setup the droppable hook
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { columnId },
  });

  return (
    <div
      ref={setNodeRef}
      style={columnStyle(isOver)} // 🟢 Use dynamic styles based on "isOver"
    >
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Card key={index} title={task} columnId={columnId} index={index} />
      ))}
      <button onClick={() => onAddCard(columnId)}>Add New Card</button>
    </div>
  );
};

export default Column;
