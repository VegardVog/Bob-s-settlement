import { ReactNode, createContext, useState } from 'react';


interface HttpRequestsTypes {
    baseURL: string;
}

interface HttpRequestsProviderProps {
    children: ReactNode; 
  }



const HttpRequestsContext = createContext<HttpRequestsTypes | undefined>(undefined);

const HttpRequestsProvider: React.FC<HttpRequestsProviderProps> = ({children}) => {
    const baseURL: string = "http://localhost:4000";

    return (

    <HttpRequestsContext.Provider
    value={{
        baseURL,
    }}>
    
    {children}
    </HttpRequestsContext.Provider>

    )
}


export { HttpRequestsContext, HttpRequestsProvider };
export type { HttpRequestsTypes };
