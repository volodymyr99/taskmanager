import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FiMoreHorizontal } from 'react-icons/fi';
import Card from './Card';
import AddCard from './AddCard';

const List = ({ list, formatDeadline, isDeadlineClose, getCard }) => {
    return (
        <div className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0">
            <div className="list-body">
                <div className="flex justify-between p-1">
                    <span className="text-gray-300 font-bold">{list.title}</span>
                    <button className="hover:bg-gray-500 p-1 rounded-sm">
                        {/* Додайте потрібну іконку або функціонал */}
                    </button>
                </div>
                <Droppable droppableId={list.id?.toString() || ''}>
                    {(provided, snapshot) => (
                        <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                            {...provided.droppableProps}
                        >
                            {list.items?.map((item, index) => (
                                <Card
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    formatDeadline={formatDeadline}
                                    isDeadlineClose={isDeadlineClose}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <AddCard getcard={(card) => getCard(card, list.id)} />
            </div>
        </div>
    );
};

export default List;