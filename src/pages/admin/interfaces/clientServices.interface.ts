interface ServicoEmail {
    id: string;
    clienteId: string;
    faturaId: string;
    emailId: string;
    dominio: string;
    status: "PENDENTE" | "ATIVO" | "CANCELADO";
    criadoEm: string;
    atualizadoEm: string;
    expiraEm: string | null;
    Email: {
        id: string;
        preco: number;
        quantidade: number;
        dominio: string;
        planoEmailId: number;
    }
}

interface ServicoDominio {
    id: string;
    clienteId: string;
    dominioId: string;
    faturaId: string;
    status: "PENDENTE" | "ATIVO" | "CANCELADO";
    criadoEm: string;
    atualizadoEm: string;
    expiraEm: string | null;
    Dominio: {
        id: string;
        dominio: string;
        chaveEpp: string | null;
        planoDominioId: number;
    }
}

interface ServicoHospedagem {
    id: string;
    idCiclo: number;
    dominio: string;
    clienteId: string;
    planoId: string;
    faturaId: string;
    status: "PENDENTE" | "ATIVO" | "CANCELADO";
    criadoEm: string;
    atualizadoEm: string;
    expiraEm: string | null;
    Plano: {
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

}



interface IPlanoMicrosoftExchange {
    id: string;
    titulo: string;
    recursos: string[]; // Um array de strings com os recursos do plano
    planoPopular: boolean;
    descricao: string;
    preco: number; // Preço em centavos ou na unidade usada
    descontos: number; // Valor do desconto
    precoComDesconto: number; // Preço final com desconto aplicado
    categoriaId: number;
  }
  
interface IServicoMicrosoftExchange {
    id: string;
    idCiclo: number; // ID do ciclo correspondente
    dominio: string | null; // Domínio pode ser null
    clienteId: string;
    planoMicrosoftExchangeId: string;
    faturaId: string;
    status: 'PENDENTE' | 'APROVADO' | 'CANCELADO'; // Enum para status
    criadoEm: string; // Data em formato ISO
    atualizadoEm: string; // Data em formato ISO
    expiraEm: string | null; // Data de expiração ou null
    PlanoMicrosoftExchange: IPlanoMicrosoftExchange; // Detalhes do plano
  }
  





interface ServicosClientes {
    servicosEmails: ServicoEmail[];
    servicosDominios: ServicoDominio[];
    servicosHospedagem: ServicoHospedagem[];
    servicosMicrosoftExchange: IServicoMicrosoftExchange[];
}


export type { ServicoEmail, ServicoDominio, ServicoHospedagem,IServicoMicrosoftExchange, ServicosClientes }