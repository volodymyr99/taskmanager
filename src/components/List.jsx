import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FiMoreHorizontal } from 'react-icons/fi';
import Card from './Card';
import AddCard from './AddCard';

const List = ({ listData, index, addCardToList }) => {
    return (
        <div key={index} className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0">
            <div className="list-body">
                {/* Заголовок списку */}
                <div className="flex justify-between p-1">
                    <span className="text-gray-300 font-bold">{listData.title}</span>
                    <button className="hover:bg-gray-500 p-1 rounded-sm">
                        <FiMoreHorizontal size={16} />
                    </button>
                </div>

                {/* Droppable для карток */}
                <Droppable droppableId={listData.id}>
                    {(provided, snapshot) => (
                        <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                                backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent',
                            }}
                            {...provided.droppableProps}
                        >
                            {listData.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <Card
                                            ref={provided.innerRef}
                                            draggableProps={provided.draggableProps}
                                            dragHandleProps={provided.dragHandleProps}
                                            item={item}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Додавання нових карток */}
                <AddCard getcard={(card) => addCardToList(card, index)} />
            </div>
        </div>
    );
};

export default List;
