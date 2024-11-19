import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Header from './Header';
import Sidebar from './SideBar';

const Participants = () => {
    const { allboard } = useContext(BoardContext); // Використання useContext для отримання значень
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setParticipants(data.users || []); // Завантажуємо учасників з файлу
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddParticipant = () => {
        if (newParticipant) {
            setParticipants([...participants, { id: Date.now(), name: newParticipant }]);
            setNewParticipant('');
        }
    };

    return (
        <>
            <Header />
            <div className='content flex'>
                <Sidebar />
                <div className='participants-container'>
                    <h2>Учасники</h2>
                    <input 
                        type="text" 
                        value={newParticipant} 
                        onChange={(e) => setNewParticipant(e.target.value)} 
                        placeholder="Додати нового учасника" 
                    />
                    <button onClick={handleAddParticipant}>Додати</button>
                    <ul>
                        {participants.map(participant => (
                            <li key={participant.id}>{participant.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Participants;