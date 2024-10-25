import {create} from "zustand"




interface ItorePagamento{
    openAccount:boolean, 
    setOpenAccount:()=>void,
    openModalPagamentoGPO:boolean,
    setOpenModalPagamentoGPO:()=>void
}




export const storePagamentoGPO=create<ItorePagamento>((set)=>({
    openAccount:false,
    
    openModalPagamentoGPO:false,
    setOpenModalPagamentoGPO() {
        set((state)=>({
            openModalPagamentoGPO:!state.openModalPagamentoGPO
        }))
    },
    setOpenAccount() {
        set((state)=>({
            openAccount:!state.openAccount
        }))
    },
}))