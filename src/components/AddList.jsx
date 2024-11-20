import React, { useState } from 'react';
import { BiPlus, BiX } from 'react-icons/bi';

const AddList = ({ getlist }) => {
    const [list, setList] = useState('');
    const [show, setShow] = useState(false);

    const saveList = () => {
        if (!list) {
            return;
        }
        // Створення нового списку зі значенням
        const newList = {
            id: new Date().getTime().toString(),  // Генерація унікального id
            title: list,
            items: [],
        };

        // Викликаємо getlist для передачі нового списку в батьківський компонент
        getlist(newList);

        // Очищення форми
        setList('');
        setShow(false);  // Закриваємо форму
    };

    const closeBtn = () => {
        setList('');
        setShow(false);
    };

    return (
        <div className="flex flex-col h-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-black">
            {show && (
                <div>
                    <textarea
                        value={list}
                        onChange={(e) => setList(e.target.value)}
                        className="p-1 w-full rounded-md border-2 bg-zinc-400 border-zinc-900"
                        placeholder="Enter list Title..."
                    ></textarea>
                    <div className="flex p-1">
                        <button
                            onClick={saveList}
                            className="p-1 rounded bg-sky-600 text-white mr-2"
                        >
                            Add list
                        </button>
                        <button
                            onClick={closeBtn}
                            className="p-1 rounded hover:bg-gray-600"
                        >
                            <BiX size={16}></BiX>
                        </button>
                    </div>
                </div>
            )}
            {!show && (
                <button
                    onClick={() => setShow(true)}
                    className="flex p-1 w-full justify-center rounded items-center mt-1 bg-gray-300 hover:bg-gray-500 h-8"
                >
                    <BiPlus size={16}></BiPlus> Додати список
                </button>
            )}
        </div>
    );
};

export default AddList;
