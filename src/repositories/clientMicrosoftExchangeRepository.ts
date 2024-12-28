import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { IServicosMicrosoftExchange, ServicosMicrosoftExchangeResponse } from './types';


const fetcher = async(clientId: string):Promise<IServicosMicrosoftExchange[]> => {
    const response = await api.get<ServicosMicrosoftExchangeResponse>(`/servicosMicrosoftExchangeCliente/buscarServicoMicrosoftExchangeCliente/${clientId}`)
    return response.data.data
}

export function useClientMicrosoftExchange(id: string) {
    const query = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['client-plans-microsoft-exchange'],
        enabled: !!id,
        retry: false,
    })

    return {
        ...query,
        data: query.data
    };
}