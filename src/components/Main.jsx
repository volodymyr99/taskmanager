import React, { useContext, useEffect } from 'react';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';
import AddList from './AddList';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];
        
    useEffect(() => {    
        if (allboard) {
            sessionStorage.setItem('boardData', JSON.stringify(allboard));
        }
    }, [allboard]);  

    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
    };

    const isDeadlineClose = (deadline) => {
        if (!deadline) return false;
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = (deadlineDate - now) / (1000 * 60 * 60 * 24);
        return diff <= 2;
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Якщо перетягування скасовано
        if (!destination) return;

        const newList = [...bdata.list];

        const sourceListIndex = newList.findIndex((list) => list.id === source.droppableId);
        const destinationListIndex = newList.findIndex((list) => list.id === destination.droppableId);
                
        if (sourceListIndex === destinationListIndex && source.index === destination.index) {
            return;
        }
                
        const [removed] = newList[sourceListIndex].items.splice(source.index, 1);
        newList[destinationListIndex].items.splice(destination.index, 0, removed);

        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = newList;
        setAllBoard(updatedBoard);
    };

    const handleAddCard = (card, listId) => {
        const updatedList = bdata.list.map((list) =>
            list.id === listId
                ? { ...list, items: [...list.items, card] }
                : list
        );

        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = updatedList;
        setAllBoard(updatedBoard);
    };

    const handleAddList = (newList) => {
        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list.push(newList);
        setAllBoard(updatedBoard);
    };

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
                                    className="flex droppable-container"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {bdata.list?.map((list, index) => (
                                        <Draggable key={list.id} draggableId={list.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`flex flex-col ${provided.draggableProps.className || ''} ${provided.dragHandleProps.className || ''}`}
                                                >
                                                    <List
                                                        list={list}
                                                        formatDeadline={formatDeadline}
                                                        isDeadlineClose={isDeadlineClose}
                                                        getCard={handleAddCard}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>

                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <AddList getlist={handleAddList} />
                </div>
            </div>
        </div>
    );
};

export default Main;
