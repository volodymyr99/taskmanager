import React, { useContext, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { BoardContext } from '../context/BoardContext';
import { BiLeftArrow, BiPlus, BiRightArrow, BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // Імпорт для маршрутизації

const Sidebar = () => {
    const blankBoard = {
        name: '',
        bgcolor: '#f60000',
        list: []
    };
    const [boardData, setBoarddata] = useState(blankBoard);
    const [collapsed, setCollapsed] = useState(false);
    const [showpop, setShowpop] = useState(false);
    const { allboard, setAllBoard } = useContext(BoardContext);

    // Перевірка наявності allboard перед доступом до boards
    if (!allboard || !allboard.boards) {
        return null; // Або ви можете повернути спінер завантаження
    }

    const setActiveboard = (i) => {
        let newBoard = { ...allboard };
        newBoard.active = i;
        setAllBoard(newBoard);
    }

    const addBoard = () => {
        let newB = { ...allboard };
        newB.boards.push(boardData);
        setAllBoard(newB);
        setBoarddata(blankBoard);
        setShowpop(!showpop);
    }

    return (
        <div className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`}>
            {collapsed && (
                <div className='p-2'>
                    <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 bg-slate-300 p-2 rounded-sm'>
                        <BiRightArrow size={18} />
                    </button>
                </div>
            )}
            {!collapsed && (
                <div>
                    <div className="workspace p-3 flex justify-between items-center border-b border-b-[#9fadbc29]">
                        <h4 className="text-white">Робочий простір</h4>
                        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 bg-slate-300 rounded-sm p-2'>
                            <BiLeftArrow size={18} />
                        </button>
                    </div>
                    <div className="boardlist">
                        <div className='flex justify-between items-center px-3 py-2'>
                            <h6 className="text-white">Дошки</h6>

                            <Popover
                                isOpen={showpop}
                                align='start'
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className='ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded'>
                                        <button onClick={() => setShowpop(!showpop)} className='absolute right-2 top-2 hover:bg-gray-500 p-1 rounded'><BiX size={16} /></button>
                                        <h4 className='py-3'>Нова дошка</h4>
                                        <img src="https://placehold.co/200x120/png" alt="" className="rounded mb-3" />
                                        <div className="mt-3 flex flex-col items-start w-full">
                                            <label htmlFor="title" className="mb-1">Назва дошки <span>*</span></label>
                                            <input value={boardData.name} onChange={(e) => setBoarddata({ ...boardData, name: e.target.value })} type="text" className='mb-2 h-8 px-2 w-full bg-gray-700 rounded text-white' />
                                            <label htmlFor="Color" className="mb-1">Колір дошки</label>
                                            <input value={boardData.bgcolor} onChange={(e) => setBoarddata({ ...boardData, bgcolor: e.target.value })} type="color" className='mb-2 h-8 px-2 w-full bg-gray-700 rounded' />
                                            <button onClick={() => addBoard()} className='w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500 text-white'>Створити</button>
                                        </div>
                                    </div>
                                }
                            >
                                <button onClick={() => setShowpop(!showpop)} className='hover:bg-slate-600 bg-slate-300 p-2 rounded-sm'>
                                    <BiPlus size={16} />
                                </button>
                            </Popover>
                        </div>
                    </div>


                    {/* Список дошок */}
                    <ul>
                        {allboard.boards.map((x, i) => (
                            <li key={i}>
                                <button onClick={() => setActiveboard(i)} className='px-3 py-2 w-full text-sm flex justify-start items-center hover:bg-gray-500 rounded text-white overflow-hidden text-ellipsis whitespace-nowrap'>
                                    <span className='w-6 h-6 rounded-sm mr-2' style={{ backgroundColor: `${x.bgcolor}` }}>&nbsp;</span>
                                    <span>{x.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Додано меню "Учасники" */}
                    <div className='flex justify-between items-center px-3 py-2'>
                        <h6 className="text-white">Учасники</h6>
                        <Link to="/participants" className='hover:bg-slate-600 bg-slate-300 p-2 rounded-sm'>
                            Переглянути
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;