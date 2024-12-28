import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { IPlanoMicrosoftExchange } from '@/interfaces/planoMicrosoftExchange';

interface ApiResponse {
    success: boolean;
    message: string;
    data: IPlanoMicrosoftExchange[];
}

const fetcher = async():Promise<IPlanoMicrosoftExchange[]> => {
    const response = await api.get<ApiResponse>(`/planoMiscrosoftExchange/buscarTodosPlanoMicrosoftExchange`)
    return response.data.data
}

export function usePlansMicrosoft() {
    const query = useQuery({
        queryFn: fetcher,
        queryKey: ['planos_microsoft_exchange'],
        retry: false,
    })

    return {
        ...query,
        data: query.data
    };
}