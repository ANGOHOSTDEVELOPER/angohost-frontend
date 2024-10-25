import {create} from "zustand"




interface ItorePagamento{
    openAccount:boolean, 
    iFrameLoading:boolean,
    setIFrameLoading:()=>void,
    setTokenIFrame:(token:string)=>void,
    tokenIFrane:string
    setOpenAccount:()=>void,
    openModalPagamentoGPO:boolean,
    setOpenModalPagamentoGPO:()=>void
}




export const storePagamentoGPO=create<ItorePagamento>((set)=>({
    openAccount:false,
    iFrameLoading:false,

    tokenIFrane:"",
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
    setTokenIFrame(token) {
        set(()=>({
           tokenIFrane:token
        }))
    },
    setIFrameLoading() {
        set((state)=>({
            iFrameLoading:!state.iFrameLoading
        }))
    },
}))