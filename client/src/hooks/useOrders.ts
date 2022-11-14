import useSWR, { SWRConfiguration } from 'swr'
import { IOrder } from '../interfaces'

export const useOrders = (url: string, config : SWRConfiguration = {}) =>{

    const {data, error} = useSWR<IOrder[]>(`/api${url}`,config)
    
    return {
        orders: data!,
        isLoading: !error && !data,
        isError: error
    }

}

export const useOrder = (url: string, config : SWRConfiguration = {}) =>{

    const {data, error} = useSWR<IOrder>(`/api${url}`,config)
    
    return {
        order: data!,
        isLoading: !error && !data,
        isError: error
    }

}