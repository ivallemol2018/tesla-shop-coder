import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

import Cookies from 'universal-cookie'

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props extends PropsWithChildren<{}> {

}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
    const navigate = useNavigate()
    const cookies = new Cookies();

    useEffect(()=>{
        checkToken()
    },[])
    
    const checkToken = async ()  => {
        try {
            const { data } = await tesloApi.get('/user/validate-token')
            const { token, user } = data;
            cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            cookies.remove('checkToken')
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { username: email, password })
            const { token, user } = data;
            cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user });
            return true
        } catch (error) {
            return false
        }
    }

    const logout = () => {
        cookies.remove('firstName');
        cookies.remove('lastName');
        cookies.remove('address');
        cookies.remove('address2');
        cookies.remove('zip');
        cookies.remove('city');
        cookies.remove('country');
        cookies.remove('phone');


        cookies.remove('cart')
        cookies.remove('token')
        navigate(0)

    }

    const registerUser = async (name: string,
                                email: string,
                                password: string,
                                address: string,
                                phone: string,
                                age: number): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/signup', { name, username: email, password, address, phone, age})
            const { token, user } = data;
            cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false,
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}   