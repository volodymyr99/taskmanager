import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Board from './Board';
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

    const onDragEnd = (result) => {
        const { source, destination } = result;

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

    const handleAddList = (list) => {
        const updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list.push(list);
        setAllBoard(updatedBoard);
    };

    return (
        <Board bdata={bdata} onDragEnd={onDragEnd} />
    );
};

export default Main;
