import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import { BoardContext } from './context/BoardContext';
import FunctionsProvider from './context/FunctionsContext';
import data from './data.json'; // Імпортуємо JSON-файл напряму

function App() {
    const [allboard, setAllBoard] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('boardData');

        if (storedData) {
            // Використовуємо дані з sessionStorage
            setAllBoard(JSON.parse(storedData));
        } else {
            // Зберігаємо дані в sessionStorage
            sessionStorage.setItem('boardData', JSON.stringify(data));
            setAllBoard(data);
        }
    }, []);

    {/* }
    if (!allboard) {
        return <div>Loading...</div>; 
    }
    */}
    return (
        <FunctionsProvider>
            <BoardContext.Provider value={{ allboard, setAllBoard }}>
                <div className="App">
                    <Body />
                </div>
            </BoardContext.Provider>
        </FunctionsProvider>
    );
}

export default App;


{/*import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import { BoardContext } from './context/BoardContext';
import FunctionsProvider from './context/FunctionsContext';
import data from './data.json'; // Імпортуємо JSON-файл напряму

function App() {
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('boardData');

        if (storedData) {
            // Використовуємо дані з sessionStorage
            setBoardData(JSON.parse(storedData));
        } else {
            // Зберігаємо дані в sessionStorage
            sessionStorage.setItem('boardData', JSON.stringify(data));
            setBoardData(data);
        }
    }, []);

    if (!boardData) {
        return <div>Loading...</div>; // Покажемо "Loading..." до ініціалізації даних
    }

    return (
        <FunctionsProvider>
            <BoardContext.Provider value={{ boardData, setBoardData }}>
                <div className="App">
                    <Body />
                </div>
            </BoardContext.Provider>
        </FunctionsProvider>
    );
}

export default App;
*/}