import {create} from  "zustand";





interface IStoreCredito{
    saldo: number|string;
    setSaldo: (saldo: number) => void;
}




export  const storeCreditoSaldoCarregar=create<IStoreCredito>((set=>({
    saldo:"",
    setSaldo:(saldo:number) => {
        set(()=>({
            saldo:saldo,
        }))
    }
})))