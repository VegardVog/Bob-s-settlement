import { ReactNode, createContext, useState } from 'react';


interface UserTypes {
    loggedIn: string;
    setLoggedIn: (value: string) => void;
    id: string;
    setId: (value: string) => void;
}

interface UserProviderProps {
    children: ReactNode; 
  }

  const initialUserState: UserTypes = {
    loggedIn: sessionStorage.getItem("loggedIn") || "false",
    setLoggedIn: () => {}, 
    id: sessionStorage.getItem("id") || "",
    setId: () => {}, 

  };

const UserContext = createContext<UserTypes | undefined>(initialUserState);

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [loggedIn, setLoggedInState] = useState<string>(initialUserState.loggedIn);
    const [id, setIdState] = useState<string>(initialUserState.id);

    //Use setLoggedIn to sate loggedIn state in both session storage and context API
    const setLoggedIn = (value: string) => {
        sessionStorage.setItem("loggedIn", value);
        setLoggedInState(value);
    }

    const setId = (value: string) => {
        sessionStorage.setItem("id", value);
        setIdState(value);

    }
    return (

    <UserContext.Provider
    value={{
        loggedIn,
        setLoggedIn,
        id,
        setId,
    }}>
    
    {children}
    </UserContext.Provider>

    )
}


export { UserContext, UserProvider };
export type { UserTypes };
