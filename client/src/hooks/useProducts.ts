import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'

export const useProducts = (url: string, config : SWRConfiguration = {}) =>{

    const {data, error} = useSWR<IProduct[]>(`/api${url}`,config)

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}

export const useProduct = (url: string, config : SWRConfiguration = {}) =>{

    const {data, error} = useSWR<IProduct>(`/api${url}`,config)
    
    return {
        product: data!,
        isLoading: !error && !data,
        isError: error
    }

}