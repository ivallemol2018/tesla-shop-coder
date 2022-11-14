import useSWR, { SWRConfiguration } from 'swr'
import { IMessage } from '../interfaces'

export const useMessages = (url: string, config : SWRConfiguration = {}) =>{

    const {data, error} = useSWR<IMessage[]>(`/api${url}`,config)
    
    return {
        messages: data!,
        isLoading: !error && !data,
        isError: error
    }

}