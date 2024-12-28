import { create } from 'zustand'
import { ICliente } from '../interfaces/clientInterface'
import api from '../services/api'
import { IServicoPlano } from '../interfaces/servico.interface'
import { IClienteDominio, IDominio, IPlanoDominio } from '@/interfaces/dominio.interface'
import { IServicoEmail } from '@/interfaces/email.interface'
import { IServicosMicrosoftExchange } from '@/repositories/types'

interface ICredentials {
    username: string;
    senha: string;
}

interface IClienteCredentialsResponse {
    success: boolean;
    message: string;
    data: ICredentials | null
}

const defaultPlanoDominio: IPlanoDominio = {
    id: 0,
    tipo: "",
    preco: 0,
    desconto: 0,
    precoComDesconto: 0,
};

const defaultDominio: IDominio = {
    id: 0,
    dominio: "",
    planoDominioId: 0,
    planoDominio: defaultPlanoDominio,
};

const defaultClienteDominio: IClienteDominio = {
    id: "",
    clienteId: "",
    dominioId: 0,
    faturaId: "",
    status: "PENDENTE",
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    expiraEm: null,
    Dominio: defaultDominio,
};

const defaultEmailService: IServicoEmail = {
    id: "",
    clienteId: "",
    faturaId: "",
    status: "PENDENTE",
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    expiraEm: "",
    emailId: 0,
    dominio: "",
};


type ClientAction = {
    getClientData: (clientID: string) => void,
    setClientData: (clientData: ICliente) => void,
    getPlans: (clientID: string) => Promise<{ success: boolean }>,
    getDomainsServices: (clienteID: string) => Promise<{ success: boolean }>
    getMicrosoftExchangeServices: (clienteID: string) => Promise<{ success: boolean }>
    setCurrentPlan: (plan: IServicoPlano) => void,
    setCurrentDomainService: (domain: IClienteDominio) => void
    getCredentials: (clientId: string, service: { id: string, type: string }, token: string) => void
    setClientDomainServices: (clientDomains: IClienteDominio[]) => void
    setClientPlans: (clientPlans: IServicoPlano[]) => void
    setClientEmails: (clientEmails: IServicoEmail[]) => void
    setClienMicrosoftExchanges: (microsoftExchanges: IServicosMicrosoftExchange[]) => void
    setCurrentEmailService: (email: IServicoEmail) => void
    setCurrentMicrosoftExchangeService: (microsoftExchange: IServicosMicrosoftExchange) => void
}

interface TypeClientStore {
    client: ICliente | null;
    plans: IServicoPlano[],
    planoMicrosoftExchange: IServicosMicrosoftExchange[],
    emails: IServicoEmail[],
    domainServices: IClienteDominio[],
    currentDomainService: IClienteDominio,
    currentEmailService: IServicoEmail,
    currentPlan: IServicoPlano,
    currentMicrosoftExchangeService: IServicosMicrosoftExchange | null,
    credentials: ICredentials | null
    actions: ClientAction
}

interface IGetPlansResponse {
    success: boolean,
    message: string,
    data: IServicoPlano[]
}

interface IGetDomainsResponse {
    success: boolean;
    message: string;
    data: IClienteDominio[];
}
interface IGetMicrosoftExchangeResponse {
    success: boolean,
    message: string,
    data: IServicosMicrosoftExchange[]
}

const useClientStore = create<TypeClientStore>((set) => ({
    client: null,
    plans: [],
    domainServices: [],
    emails: [],
    planoMicrosoftExchange: [],
    currentMicrosoftExchangeService: null,
    currentEmailService: defaultEmailService,
    currentDomainService: defaultClienteDominio,
    credentials: { clienteId: "", email: "", id: "", senha: "", username: "" },
    currentPlan: { atualizadoEm: "", dominio: '', ciclo: { duracao: "", id: 0, multiplicador: 0, nome: '' }, clienteId: '', criadoEm: '', expiraEm: '', faturaId: '', id: '', idCiclo: 0, Plano: { categoriaId: 0, descontos: 0, descricao: '', id: '', planoPopular: false, preco: 0, precoComDesconto: 0, recursos: [], titulo: '' }, planoId: '', status: '' },
    actions: {
        getClientData: async (clientID: string) => {
            try {
                const response = await api.get(`/cliente/${clientID}`)
                set({ client: response.data })
            }
            catch (error) {
                console.log(error)
            }
        },
        getPlans: async (clientID: string): Promise<{ success: boolean }> => {
            try {
                const response: IGetPlansResponse = await (await api.get(`/servicos/buscarPorClienteId/${clientID}`)).data
                set({ plans: response.data })
                console.log(response);
                return { success: true }
            }
            catch {
                return { success: false }
            }
        },
        getMicrosoftExchangeServices: async (clientID: string): Promise<{ success: boolean }> => {
            try {
                const response: IGetMicrosoftExchangeResponse = await (await api.get(`/servicosMicrosoftExchangeCliente/buscarServicoMicrosoftExchangeCliente/${clientID}`)).data
                set({ planoMicrosoftExchange: response.data })
                console.log(response);
                return { success: true }
            }
            catch {
                return { success: false }
            }
        },
        setClienMicrosoftExchanges(microsoftExchanges) {
            set({ planoMicrosoftExchange: microsoftExchanges })
        },

        setCurrentPlan(plan) {
            set({ currentPlan: plan })
        },
        
        getDomainsServices: async (clientID: string): Promise<{ success: boolean }> => {
            try {
                const response: IGetDomainsResponse = await (await api.get(`/dominios/buscarServicoDominiosCliente/${clientID}`)).data
                set({ domainServices: response.data })
                console.log(response);
                return { success: true }
            }
            catch {
                return { success: false }
            }
        },
        setCurrentDomainService(domain) {
            set({ currentDomainService: domain })
        },
        getCredentials: async (clientId: string, service, token) => {
            set({ credentials: null })
            
            const response: IClienteCredentialsResponse = await (await api.get(`credencialCliente/${service.type}/cliente/${clientId}/servico/${service.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })).data
            if (response.success) {
                console.log(response.data)
                set({ credentials: response.data })
            }
        },
        setClientData(clientData) {
            set({ client: clientData })
        },
        setClientDomainServices(clientDomains) {
            set({ domainServices: clientDomains })
        },
        setClientPlans(clientPlans) {
            set({ plans: clientPlans })
        },
        setClientEmails(clientEmails) {
            set({ emails: clientEmails })
        },
        setCurrentEmailService(email) {
            set({ currentEmailService: email })
        },
        setCurrentMicrosoftExchangeService(microsoftExchange) {
            set({ currentMicrosoftExchangeService: microsoftExchange })
        },
    
    }
}))

export default useClientStore