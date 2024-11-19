import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card'; // Імпортуємо Card
import { FiEdit2 } from 'react-icons/fi';

const List = ({ list, index, formatDeadline, isDeadlineClose, getCard }) => {
    return (
        <Droppable droppableId={list.id} direction="vertical">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col"
                    style={{ minWidth: '300px', maxWidth: '400px' }} // фіксована ширина списку
                >
                    <h3 className="text-gray-300">{list.title}</h3>
                    {list.items?.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="item flex flex-col items-start bg-zinc-700 p-2 mb-2 rounded-md border transition duration-200"
                                    style={{ width: '100%' }} // картка на всю ширину
                                >
                                    <span className="font-bold">{item.title}</span>
                                    {item.deadline && (
                                        <span className="text-xs text-gray-400">
                                            {`Термін до: ${formatDeadline(item.deadline)}`}
                                        </span>
                                    )}
                                    {item.assignee?.name && (
                                        <span className="text-xs text-gray-400">{`Виконавець: ${item.assignee.name}`}</span>
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
