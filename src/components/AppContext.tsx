import React, { createContext } from 'react';

export const AppContext = createContext({});

export const AppProvider = (props:any) => {
    let state = {
        userInfo: {
        },
        isAdmin: false
    };

    return (
        <AppContext.Provider value={{...state}}>
            {props.children}
        </AppContext.Provider>
    );
}
