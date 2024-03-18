import { ReactNode, createContext, useState } from 'react';


interface UserTypes {
    loggedIn: boolean;
    setLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProviderProps {
    children: ReactNode; 
  }

  const initialUserState: UserTypes = {
    loggedIn: false,
    setLoggedIn: () => {}, 
  };

const UserContext = createContext<UserTypes | undefined>(initialUserState);

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
