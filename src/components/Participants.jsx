import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Header from './Header';
import Sidebar from './SideBar';

const Participants = () => {
    const { allboard } = useContext(BoardContext); // Отримуємо всі дошки з контексту
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');

    useEffect(() => {
        const storedBoardData = sessionStorage.getItem('boardData'); // Отримуємо дані з sessionStorage
        if (storedBoardData) {
            const parsedData = JSON.parse(storedBoardData); // Парсимо отримані дані
            setParticipants(parsedData.users || []); // Якщо в даних є поле users, то ми їх використовуємо
        } else {
            console.log("Немає даних в sessionStorage для boardData");
        }
    }, []);

    const handleAddParticipant = () => {
        if (newParticipant) {
            const newParticipantData = { id: Date.now().toString(), name: newParticipant };
            const updatedParticipants = [...participants, newParticipantData];
            setParticipants(updatedParticipants);
        
            // Оновлюємо дані в sessionStorage
            const storedBoardData = sessionStorage.getItem('boardData');
            if (storedBoardData) {
                const parsedData = JSON.parse(storedBoardData);
                parsedData.users = updatedParticipants; // Оновлюємо список учасників
                sessionStorage.setItem('boardData', JSON.stringify(parsedData)); // Зберігаємо оновлені дані
            }
            setNewParticipant(''); // Очищаємо поле введення
        }
    };

    return (
        <>
            <Header />
            <div className='content flex'>
                <Sidebar />
                <div className='participants-container'>
                    <h2>Учасники</h2>
                    <ul>
                        {participants.length > 0 ? (
                            participants.map(participant => (
                                <li key={participant.id}>{participant.name}</li>
                            ))
                        ) : (
                            <p>Немає учасників</p>
                        )}
                    </ul>
                    <input 
                        type="text" 
                        value={newParticipant} 
                        onChange={(e) => setNewParticipant(e.target.value)} 
                        placeholder="Додати нового учасника" 
                    />
                    <button onClick={handleAddParticipant}>Додати</button>

                </div>
            </div>
        </>
    );
};

export default Participants;
