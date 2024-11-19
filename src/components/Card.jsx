import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiEdit2 } from 'react-icons/fi';

const Card = ({ item, index, formatDeadline, isDeadlineClose }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`item flex flex-col items-start bg-zinc-700 p-2 mb-2 rounded-md border transition duration-200 ${
                        item.deadline && isDeadlineClose(item.deadline) ? 'border-red-500' : 'border-zinc-900'
                    }`}
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
    );
};

export default Card;
