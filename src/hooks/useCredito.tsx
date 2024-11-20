
import apiGPO from "@/services/api_gpo.ts";
import {toast} from "sonner";

interface TokenDetails {
    id: string;
    timeToLive: number;
    url: string;
}
interface TokenResponse {
    message: string;
    success: boolean;
    token: TokenDetails;
}
export default  function useCredito () {
    const handleGetIFrameGpo= async (saldo:number)=>{

       try {
           const response: TokenResponse = await (
               await apiGPO.post("/credito/adicionar", {
                   amount:saldo,
               })
           ).data;
           return response;
       }
       catch (error) {
           toast.error("Nao possivel carregar a conta , servicos estao indisponivel");
       }
    }
    
    
   
    
    
    
    return{
        handleGetIFrameGpo,
    }
}