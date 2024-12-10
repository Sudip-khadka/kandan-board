import { useState, useEffect } from 'react';
import Column from '../components/Column';
import { DndContext } from '@dnd-kit/core';

// Define the type for columns state
type Columns = {
  [key: string]: string[]; // Each column will be a key (string) and its value will be an array of strings (tasks)
};

const Board = () => {
  // Initialize columns state from localStorage or fallback to default data
  const loadColumnsFromLocalStorage = (): Columns => {
    const storedColumns = localStorage.getItem('columns');
    return storedColumns ? JSON.parse(storedColumns) : {
      todo: ['Switch from JS to TS', 'Build Kanban Board', 'Add editing and deleting Feature', 'Learn Test Writing'],
      'in-progress': ['Learn Typescript'],
      done: ['Setup Project', 'Basic Drag & Drop Demo'],
    };
  };

  const [columns, setColumns] = useState<Columns>(loadColumnsFromLocalStorage);

  // Update localStorage whenever columns state changes
  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumnId = active.data.current?.columnId;
    const targetColumnId = over.data.current?.columnId;

    if (sourceColumnId && targetColumnId && sourceColumnId !== targetColumnId) {
      const sourceItems = Array.from(columns[sourceColumnId]);
      const targetItems = Array.from(columns[targetColumnId]);

      const [movedItem] = sourceItems.splice(active.data.current.index, 1);
      targetItems.splice(over.data.current.index, 0, movedItem);

      const updatedColumns = {
        ...columns,
        [sourceColumnId]: sourceItems,
        [targetColumnId]: targetItems,
      };

      setColumns(updatedColumns); // Update state and localStorage
    } else {
      // If dragging within the same column
      const items = Array.from(columns[sourceColumnId || '']);
      const [movedItem] = items.splice(active.data.current.index, 1);
      items.splice(over.data.current.index, 0, movedItem);

      const updatedColumns = {
        ...columns,
        [sourceColumnId || '']: items,
      };

      setColumns(updatedColumns); // Update state and localStorage
    }
  };

  const handleAddCard = (columnId: string) => {
    const taskName = prompt('Enter task name');
    if (taskName) {
      const updatedColumns = { ...columns, [columnId]: [...columns[columnId], taskName] };
      setColumns(updatedColumns); // Update state and localStorage
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Column
            key={columnId}
            title={columnId.replace('-', ' ').toUpperCase()}
            tasks={tasks}
            columnId={columnId}
            onAddCard={handleAddCard} // Pass the function to add new cards
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
