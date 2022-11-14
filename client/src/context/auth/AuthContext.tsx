import { createContext } from 'react'
import { IUser } from '../../interfaces';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, 
                   email: string, 
                   password: string,
                   address: string,
                   phone: string,
                   age: number) => Promise<{hasError: boolean;message?: string;}>
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);