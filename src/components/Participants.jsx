import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Header from './Header';
import Sidebar from './SideBar';

const Participants = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const storedBoardData = sessionStorage.getItem('boardData');
        if (storedBoardData) {
            const parsedData = JSON.parse(storedBoardData);
            setParticipants(parsedData?.users || []);
        } else if (allboard?.boards[allboard.active]?.participants) {
            setParticipants(allboard.boards[allboard.active].participants);
        }
    }, [allboard]);

    const handleAddParticipant = () => {
        const participantData = prompt(
            "Введіть дані нового учасника у форматі: Ім'я, email\nНаприклад: Іван Петренко, ivan.petrenko@example.com"
        );

        if (!participantData) {
            return; // Користувач натиснув "Скасувати"
        }

        const [name, email] = participantData.split(",").map((item) => item.trim());

        if (!name || !email || !validateEmail(email)) {
            alert("Неправильний формат даних. Спробуйте ще раз.");
            return;
        }

        const newParticipant = {
            id: Date.now().toString(),
            name,
            email,
        };

        updateParticipants([...participants, newParticipant]);
    };

    // Валідація email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEditParticipant = (id) => {
        const updatedParticipants = participants.map((participant) =>
            participant.id === id
                ? {
                    ...participant,
                    name: prompt("Введіть нове ім'я:", participant.name) || participant.name,
                    email: prompt("Введіть новий email:", participant.email) || participant.email,
                }
                : participant
        );
        updateParticipants(updatedParticipants);
    };

    const handleDeleteParticipant = (id) => {
        const updatedParticipants = participants.filter((participant) => participant.id !== id);
        updateParticipants(updatedParticipants);
    };

    const updateParticipants = (newParticipants) => {
        setParticipants(newParticipants);

        if (allboard) {
            const updatedBoard = { ...allboard };
            updatedBoard.boards[allboard.active].participants = newParticipants;
            setAllBoard(updatedBoard);
        }

        const storedBoardData = sessionStorage.getItem('boardData');
        if (storedBoardData) {
            const parsedData = JSON.parse(storedBoardData);
            parsedData.users = newParticipants;
            sessionStorage.setItem('boardData', JSON.stringify(parsedData));
        }
    };

    return (
        <>
            <Header />
            <div className="flex w-full">
                <Sidebar />
                <div className="flex flex-col w-full" style={{ backgroundColor: `${allboard?.boards[allboard.active]?.bgcolor || '#fff'}` }}>
                    <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
                        <h2 className="text-gray-300 font-bold text-xl">Учасники</h2>
                    </div>
                    <div className="flex flex-col w-full flex-grow relative">
                        <div className="absolute left-0 right-0 top-0 bottom-0 p-3 flex flex-col overflow-y-auto bg-gray-100">
                            <ul className="space-y-2">
                                {participants.length > 0 ? (
                                    participants.map((participant) => (
                                        <li
                                            key={participant.id}
                                            className="p-3 bg-white border rounded shadow hover:bg-gray-50 flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-bold">{participant.name}</p>
                                                <p className="text-sm text-gray-500">{participant.email}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                                    onClick={() => handleEditParticipant(participant.id)}
                                                >
                                                    Редагувати
                                                </button>
                                                <button
                                                    className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-700"
                                                    onClick={() => handleDeleteParticipant(participant.id)}
                                                >
                                                    Видалити
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Немає учасників</p>
                                )}
                            </ul>
                            <button
                                className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 self-start"
                                onClick={handleAddParticipant}
                            >
                                Додати учасника
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Participants;
