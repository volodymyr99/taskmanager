import React, { useState, useEffect } from 'react';
import { BiPlus, BiX } from 'react-icons/bi';

const AddCard = (props) => {
    const [card, setCard] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignee, setAssignee] = useState('');
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]); // Додано для збереження користувачів

    // Завантаження даних із data.json
    useEffect(() => {
        fetch('/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data.users || []); // Зберігаємо список користувачів
            })
            .catch((error) => {
                console.error('Помилка завантаження data.json:', error);
            });
    }, []);

    const saveCard = () => {
        if (!card) {
            return;
        }
        props.getcard({
            title: card,
            deadline: deadline || null,
            assignee: assignee
                ? users.find((user) => user.id === assignee)
                : { id: null, name: null },
        });
        setCard('');
        setDeadline('');
        setAssignee('');
        setShow(!show);
    };

    const closeBtn = () => {
        setCard('');
        setDeadline('');
        setAssignee('');
        setShow(!show);
    };

    return (
        <div>
            <div className="flex flex-col">
                {show && (
                    <div>
                        <textarea
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            className="p-1 w-full rounded-md border-2 bg-zinc-500 border-zinc-900"
                            placeholder="Введіть заголовок картки..."
                        ></textarea>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="p-1 w-full rounded-md border-2 bg-zinc-500 border-zinc-900 mt-2"
                        />
                        <select
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            className="p-1 w-full rounded-md border-2 bg-zinc-500 border-zinc-900 mt-2"
                        >
                            <option value="">Оберіть відповідального</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex p-1">
                            <button
                                onClick={saveCard}
                                className="p-1 rounded bg-sky-600 text-white mr-2"
                            >
                                Додати картку
                            </button>
                            <button
                                onClick={closeBtn}
                                className="p-1 rounded bg-gray-300 hover:bg-gray-600"
                            >
                                <BiX size={20} />
                            </button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button
                        onClick={() => setShow(!show)}
                        className="flex p-1 w-full justify-start rounded items-center text-gray-300 font-semibold mt-1 hover:bg-gray-500 h-8"
                    >
                        <BiPlus size={16} />
                        Додати картку
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddCard;
