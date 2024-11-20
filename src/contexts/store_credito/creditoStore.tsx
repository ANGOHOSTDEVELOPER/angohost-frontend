import {create} from "zustand"
import api from "@/services/api.ts";



interface ICreditoCliente{
    id: string;
    saldo: number;
    idCliente: string;
    criadoEm: Date;
    atualizadoEm: Date;
}
interface IResponseICreditoCliente{
    success:boolean;
    message:string;
    data:ICreditoCliente;
}
interface IResponseAdicionarSaldoCliente{
    success:boolean;
    message:string;
   
}
interface ICreditoStore {
    getCreditoCliente:(id:string)=>void
    saldo:number
    adicionarCreditoCliente:(idCliente:string,saldo:number)=>Promise<IResponseAdicionarSaldoCliente>
}

export  const storeCreditoCliente=create<ICreditoStore>((set=>({
    saldo:0,
    getCreditoCliente:async (id: string)=> {
        const data: IResponseICreditoCliente=await (await api.get(`/credito/buscarCreditoDoCliente/${id}`)).data;
        set(()=>({
            saldo:data.data.saldo
        }));
    },
    adicionarCreditoCliente: async (idCliente: string,saldo:number)=> {
        const data: IResponseAdicionarSaldoCliente=await (await api.put(`/credito/adicionarSaldo`,{
            idCliente:idCliente,
            saldo:saldo
        })).data;
        
        return data
       
    }
})))