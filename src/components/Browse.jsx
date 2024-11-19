import { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Header from './Header';
import Main from './Main';
import Sidebar from './SideBar';

const Browse = () => {
    // Отримуємо дані з контексту
    const { allboard } = useContext(BoardContext);

    if (!allboard) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className='content flex'>
                <Sidebar />
                <Main />
            </div>
        </>
    );
};

export default Browse;
