import React, { createContext, useState } from 'react';

// Створюємо контекст
export const FunctionsContext = createContext();

const FunctionsProvider = ({ children }) => {
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

    return (
        <FunctionsContext.Provider value={{ formatDeadline, isDeadlineClose }}>
            {children}
        </FunctionsContext.Provider>
    );
};

export default FunctionsProvider;
