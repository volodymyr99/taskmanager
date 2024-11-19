import { useState, useEffect } from 'react';
import './App.css';
import Body from './components/Body';
import { BoardContext } from './context/BoardContext';

function App() {
    const [allboard, setAllBoard] = useState(null);

    useEffect(() => {
        // ѕерев≥р€Їмо на€вн≥сть даних у sessionStorage
        const savedData = sessionStorage.getItem('boardData');

        if (savedData) {
            // якщо дан≥ Ї, встановлюЇмо њх у state
            setAllBoard(JSON.parse(savedData));
        } else {
            // якщо даних немаЇ, можна завантажити њх з файлу або API
            console.error('Data not found in sessionStorage');
        }
    }, []);

    if (!allboard) {
        return <div>Loading...</div>;
    }

    return (
        <BoardContext.Provider value={{ allboard, setAllBoard }}>
            <div className="App">
                <Body />
            </div>
        </BoardContext.Provider>
    );
}

export default App;
