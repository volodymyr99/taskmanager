import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import Utils from '../utils/Utils';
import AddCard from './AddCard';
import { FiEdit2, FiMoreHorizontal, FiUserPlus } from 'react-icons/fi';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];

    function onDragEnd(res) {
        if (!res.destination) {
            console.log("No Destination");
            return;
        }
        const newList = [...bdata.list];
        const s_id = parseInt(res.source.droppableId);
        const d_id = parseInt(res.destination.droppableId);
        const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
        newList[d_id - 1].items.splice(res.destination.index, 0, removed);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
    };

    const isDeadlineApproaching = (deadline) => {
        if (!deadline) return false;
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = (deadlineDate - now) / (1000 * 60 * 60 * 24); // різниця в днях
        return diff <= 2; // менше або рівно двох днів
    };

    const Utils = {
        isDeadlineClose: (deadline) => {
            const deadlineDate = new Date(deadline);
            const today = new Date();
            const diffInDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);
            return diffInDays <= 2 && diffInDays >= 0;
        },
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundColor: `${bdata.bgcolor}` }}>
            <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
                <h2 className='text-gray-300 font-bold text-xl'>{bdata.name}</h2>
                <div className='flex items-center justify-center'>
                    <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
                        <FiUserPlus size={16} className='mr-2' /> Share
                    </button>
                    <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'>
                        <FiMoreHorizontal size={16} />
                    </button>
                </div>
            </div>
            <div className='flex flex-col w-full flex-grow relative'>
                <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {bdata.list && bdata.list.map((x, ind) => (
                            <div key={ind} className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
                                <div className="list-body">
                                    <div className='flex justify-between p-1'>
                                        <span className='text-gray-300 font-bold'>{x.title}</span>
                                        <button className='hover:bg-gray-500 p-1 rounded-sm'>
                                            <FiMoreHorizontal size={16} />
                                        </button>
                                    </div>
                                    <Droppable droppableId={x.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                className='py-1'
                                                ref={provided.innerRef}
                                                style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                                {...provided.droppableProps}
                                            >
                                                {x.items && x.items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`item flex flex-col items-start bg-zinc-700 p-2 mb-2 rounded-md border transition duration-200 ${
        item.deadline && Utils.isDeadlineClose(item.deadline) ? 'border-red-500' : 'border-zinc-900'}`}                                                                
                                                            >
                                                                <span className="font-bold">{item.title}</span>
                                                                {item.deadline && (
                                                                    <span className="text-xs text-gray-400">
                                                                        {`Термін до: ${formatDeadline(item.deadline)}`}
                                                                    </span>
                                                                )}
                                                                {item.assignee.name && (
                                                                    <span className="text-xs text-gray-400">{`Виконавець: ${item.assignee.name}`}</span>
                                                                )}
                                                                <span className='flex justify-start items-start'>
                                                                    <button className='hover:bg-gray-600 p-1 rounded-sm'>
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
                                    <AddCard getcard={(e) => cardData(e, ind)} />
                                </div>
                            </div>
                        ))}
                    </DragDropContext>
                    <AddList getlist={(e) => listData(e)} />
                </div>
            </div>
        </div>
    );
};

export default Main;
