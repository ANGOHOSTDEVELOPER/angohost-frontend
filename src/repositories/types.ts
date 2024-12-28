interface PlanoMicrosoftExchange {
    id: string;
    titulo: string;
    recursos: string[];
    planoPopular: boolean;
    descricao: string;
    preco: number;
    descontos: number;
    precoComDesconto: number;
    categoriaId: number;
  }
  
  interface Ciclo {
    id: number;
    nome: string;
    duracao: string;
    multiplicador: number;
  }
  
 export interface IServicosMicrosoftExchange {
    id: string;
    idCiclo: number;
    dominio: string | null;
    clienteId: string;
    planoMicrosoftExchangeId: string;
    faturaId: string;
    status: string;
    criadoEm: string;
    atualizadoEm: string;
    expiraEm: string | null;
    PlanoMicrosoftExchange: PlanoMicrosoftExchange;
    ciclo: Ciclo;
  }
  
  export interface ServicosMicrosoftExchangeResponse {
    success: boolean;
    message: string;
    data: IServicosMicrosoftExchange[];
  }