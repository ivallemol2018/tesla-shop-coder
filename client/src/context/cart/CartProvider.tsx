import { FC, PropsWithChildren , useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '../../api';
import axios from 'axios';

export interface CartState {
    isLoaded: boolean,
    cart: ICartProduct[],
    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number,
    shippingAddress?: ShippingAddress
}



const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props extends PropsWithChildren<{}> {

}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []

            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])

    useEffect(() => {
        if (Cookie.get('firstName')) {
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
            }

            dispatch({ type: '[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
        const taxRate = Number(process.env.REACT_APP_TAX_RATE || 0)
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
    }, [state.cart])


    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some(item => item._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Updated Product in Cart', payload: [...state.cart, product] })

        const productInCartButDifferetSize = state.cart.some(item => item._id === product._id && item.size === product.size)
        if (!productInCartButDifferetSize) return dispatch({ type: '[Cart] - Updated Product in Cart', payload: [...state.cart, product] })

        const updatedProducts = state.cart.map(item => {
            if (item._id !== product._id) return item
            if (item.size !== product.size) return item

            item.quantity += product.quantity;
            return item
        })

        dispatch({ type: '[Cart] - Updated Product in Cart', payload: updatedProducts })

    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    }

    const removeCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
    }

    const updateAddress = ( address : ShippingAddress ) =>{

        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);

        dispatch({type:'[Cart] - Update Addrees', payload: address})
    }

    const createOrder = async(): Promise<{hasError: boolean, message: string}> =>{
        if(!state.shippingAddress){
            throw new Error('No hay direccion de entrega')
        }

        const body: IOrder = {
            orderItems: state.cart.map( p =>({
                ...p,
                size: p.size!
            })) ,
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }


        try {
            const { data } = await tesloApi.post('/orders',body)

            dispatch({type:'[Cart] - Order complete'})

            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Error no controlado, comuniquese con el administrador'
            }
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartQuantity,
            updateAddress,

            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
};