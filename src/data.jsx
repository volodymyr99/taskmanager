import React, { useState, useEffect } from 'react';

const App = () => {
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        
        const storedData = sessionStorage.getItem('boardData');

        if (storedData) {        
            setBoardData(JSON.parse(storedData));
        } else {            
            import('./data.json')
                .then((data) => {
                    setBoardData(data);                    
                    sessionStorage.setItem('boardData', JSON.stringify(data));
                })
                .catch((error) => {
                    console.error('Error loading data:', error);
                });
        }
    }, []);
        
    if (!boardData) {
        return null; 
    }

    return (
        <div>            
            <h1>Вітання!</h1>
            <pre>{JSON.stringify(boardData, null, 2)}</pre>
        </div>
    );
};

export default App;
