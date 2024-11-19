import { useState, useEffect } from 'react';
import './App.css';
import Body from './components/Body';
import { BoardContext } from './context/BoardContext';

function App() {
    const [allboard, setAllBoard] = useState(null);

    useEffect(() => {
        // ���������� �������� ����� � sessionStorage
        const savedData = sessionStorage.getItem('boardData');

        if (savedData) {
            // ���� ��� �, ������������ �� � state
            setAllBoard(JSON.parse(savedData));
        } else {
            // ���� ����� ����, ����� ����������� �� � ����� ��� API
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
