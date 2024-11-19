import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd'; // Додаємо імпорт Droppable
import { FiEdit2 } from 'react-icons/fi';

const List = ({ list, index }) => {
    return (
        <Droppable droppableId={list.id} direction="vertical">
            {(provided) => (
                <div
                    className="flex flex-col"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h3 className="text-gray-300">{list.title}</h3>
                    {list.items?.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`item flex flex-col items-start bg-zinc-700 p-2 mb-2 rounded-md border transition duration-200 ${item.deadline ? 'border-red-500' : 'border-zinc-900'}`}
                                >
                                    <span className="font-bold">{item.title}</span>
                                    {item.deadline && (
                                        <span className="text-xs text-gray-400">
                                            {`Термін до: ${item.deadline}`}
                                        </span>
                                    )}
                                    <span className="flex justify-start items-start">
                                        <button className="hover:bg-gray-600 p-1 rounded-sm">
                                            <FiEdit2 size={16} />
                                        </button>
                                    </span>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default List;
