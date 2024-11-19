import React, { useState } from 'react';
import { BoardContext } from '../context/BoardContext';

const AddBoard = ({ addBoard }) => {
    const [boardName, setBoardName] = useState('');
    const [bgColor, setBgColor] = useState('#069'); // Стандартний колір

    const handleSubmit = (e) => {
        e.preventDefault();

        if (boardName.trim()) {
            const newBoard = {
                name: boardName,
                bgcolor: bgColor,
                list: [],
                active: 0,
            };

            addBoard(newBoard); // Викликаємо функцію, передану через пропси, для додавання нової дошки

            setBoardName('');
            setBgColor('#069');
        }
    };

    return (
        <div className="add-board-container">
            <form onSubmit={handleSubmit} className="add-board-form">
                <input
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    placeholder="Enter board name"
                    required
                />
                <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                />
                <button type="submit">Add Board</button>
            </form>
        </div>
    );
};

export default AddBoard;
