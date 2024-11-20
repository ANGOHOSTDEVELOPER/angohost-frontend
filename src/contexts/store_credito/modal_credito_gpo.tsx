import  {create} from "zustand"




interface IStoreModalCreditoModalGpo{
    openModalCredito:boolean
    openModalGpo:boolean
    onCloseAnOpenModalCredito:(open:boolean)=>void
    onCloseAnOpenModalGpo:(open:boolean)=>void,
    iframeToken:string,
    setIframeToken:(token:string) => void
}


export const storeModalCreditoModalGpo=create<IStoreModalCreditoModalGpo>((set=>({
    openModalCredito:false,
    openModalGpo:false,
    iframeToken:"",
    onCloseAnOpenModalGpo:(open:boolean)=>{
        set(()=>({
            
            openModalGpo:open
        }))
    },
    onCloseAnOpenModalCredito:(open:boolean)=>{
      set(()=>({
          openModalCredito:open,
      }))
    },
    setIframeToken:(token:string) => {
        set((state)=>({
        ...state,
            iframeToken:token,
        }))
    }
    
})))



