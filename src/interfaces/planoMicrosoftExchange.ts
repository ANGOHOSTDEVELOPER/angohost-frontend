
  export interface ICicloPlanoMicrosoftExchange {
    planoMicrosoftExchangeId: string;
    cicloId: number;
    ciclo: Ciclo;
}
  
  
interface Ciclo {
    id: number;
    nome: string;
    duracao: string;
    multiplicador: number;
}
  

  export interface IPlanoMicrosoftExchange {
    id: string;
    titulo: string;
    recursos: string[];
    planoPopular: boolean;
    descricao: string;
    preco: number;
    descontos: number;
    precoComDesconto: number;
    categoriaId: number;
    ciclos: ICicloPlanoMicrosoftExchange[];
  }
  