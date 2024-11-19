import { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Header from './Header';
import Main from './Main';
import Sidebar from './SideBar';

const Browse = () => {
    const [allboard, setAllBoard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllBoard(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!allboard) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <BoardContext.Provider value={{ allboard, setAllBoard }}>
                <div className='content flex'>
                    <Sidebar />
                    <Main />
                </div>
            </BoardContext.Provider>
        </>
    );
};

export default Browse;