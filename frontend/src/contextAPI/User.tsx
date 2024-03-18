import { ReactNode, createContext, useState } from 'react';


interface UserTypes {
    loggedIn: string;
    setLoggedIn: (value: string) => void;
}

interface UserProviderProps {
    children: ReactNode; 
  }

  const initialUserState: UserTypes = {
    loggedIn: sessionStorage.getItem("loggedIn") || "false",
    setLoggedIn: () => {}, 
  };

const UserContext = createContext<UserTypes | undefined>(initialUserState);

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [loggedIn, setLoggedInState] = useState<string>(initialUserState.loggedIn);


    //Use setLoggedIn to sate loggedIn state in both session storage and context API
    const setLoggedIn = (value: string) => {
        sessionStorage.setItem("loggedIn", value);
        setLoggedInState(value);
    }
    return (

    <UserContext.Provider
    value={{
        loggedIn,
        setLoggedIn,
    }}>
    
    {children}
    </UserContext.Provider>

    )
}


export { UserContext, UserProvider };
export type { UserTypes };
