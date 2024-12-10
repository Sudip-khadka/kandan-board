import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface CardProps {
  title: string;
  columnId: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ title, columnId, index }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: `card-${columnId}-${index}`, // Unique ID based on columnId and index
      data: { columnId, index }, // Storing columnId and index in the draggable data
    });
  
    const cardStyle = {
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
      transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
      transition: 'transform 0.2s ease',
    };
  
    return (
      <div
        ref={setNodeRef}
        style={cardStyle}
        {...listeners}
        {...attributes}
      >
        {title}
      </div>
    );
  };
  

export default Card;
