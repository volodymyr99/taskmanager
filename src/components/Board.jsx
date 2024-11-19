import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';
import { BoardContext } from '../context/BoardContext';

const Board = ({ bdata, onDragEnd }) => {
    return (
        <div className="flex flex-col w-full" style={{ backgroundColor: `${bdata.bgcolor}` }}>
            <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
                <h2 className="text-gray-300 font-bold text-xl">{bdata.name}</h2>
            </div>
            <div className="flex flex-col w-full flex-grow relative">
                <div className="absolute left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="board" direction="horizontal">
                            {(provided) => (
                                <div
                                    className="flex"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {bdata.list?.map((list, index) => (
                                        <List
                                            key={list.id}
                                            list={list}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default Board;
