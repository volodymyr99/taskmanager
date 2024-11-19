import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';
import AddList from './AddList';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];

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
        return diff <= 2; // менше або рівно двох днів
    };

    const onDragEnd = (res) => {
        if (!res.destination) return;

        const newList = [...bdata.list];
        const sId = parseInt(res.source.droppableId);
        const dId = parseInt(res.destination.droppableId);
        const [removed] = newList[sId - 1].items.splice(res.source.index, 1);
        newList[dId - 1].items.splice(res.destination.index, 0, removed);

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

    const handleAddList = (list) => {
        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list.push(list);
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
                        {bdata.list?.map((list, index) => (
                            <List
                                key={index}
                                list={list}
                                formatDeadline={formatDeadline}
                                isDeadlineClose={isDeadlineClose}
                                getCard={handleAddCard}
                            />
                        ))}
                    </DragDropContext>
                    <AddList getlist={handleAddList} />
                </div>
            </div>
        </div>
    );
};

export default Main;
