// src/contexts/SearchContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

type SearchContextType = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
