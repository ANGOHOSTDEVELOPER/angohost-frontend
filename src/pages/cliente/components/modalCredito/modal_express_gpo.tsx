import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";

import {CircleX} from "lucide-react";
import React, {useEffect} from "react";
import {SocketIO} from "@/socket.ts";
import {storeModalCreditoModalGpo} from "@/contexts/store_credito/modal_credito_gpo.tsx";
import useUtils from "@/utils/useutils.ts";
import {storeCreditoCliente} from "@/contexts/store_credito/creditoStore.tsx";
import {toast} from "sonner";


interface CallbackReference {
    id: string;
}

interface CallbackPointOfSale {
    id: string;
}

interface CallbackData {
    creationDate: string;
    updatedDate: string;
    id: string;
    amount: number;
    clearingPeriod: string;
    transactionNumber: string;
    status: "ACCEPTED" | "REJECTED";
    transactionType: "PAYMENT";
    orderOrigin: "ECOMMERCE_MOBILE";
    currency: "AOA";
    reference: CallbackReference;
    pointOfSale: CallbackPointOfSale;
    merchantReferenceNumber: string;
    errorMessage?: string;
    errorCode?: string;
    errorType?: string;
}
export default   function   ModalExpressGpo (){

    const {openModalGpo,onCloseAnOpenModalGpo,iframeToken}=storeModalCreditoModalGpo()

    const {adicionarCreditoCliente}=storeCreditoCliente()
    const {getClientID}=useUtils()

    function receiveMessage(event: MessageEvent) {
        if (event.origin !== "https://pagamentonline.emis.co.ao") return;

    }
   

    useEffect(  () => {
        SocketIO.on("creditoProcessado", (data) => {
            const processamento:CallbackData=data
            if(processamento.status==="REJECTED"){
                toast.error("Cliente cancelou o carregamento da conta");
                setTimeout(()=>{
                    onCloseAnOpenModalGpo(false)

                },2000)
                return
            }
            else if(processamento.status==="ACCEPTED"){
                
            const credito={
                idCliente:getClientID(),
                saldo:processamento.amount
            }
                adicionarCreditoCliente(credito.idCliente,credito.saldo)
                    .then((r)=>{
                        if (r.success){
                            toast.success("Credito adicionado com sucesso!");
                            
                            setTimeout(()=>{
                                onCloseAnOpenModalGpo(false)
                                
                            },1000)
                        }
                        else {
                            toast.error("Nao foi possivel adicionar credito a conta do cliente")
                        }
                    })
            }
          
        });


        window.addEventListener("message", receiveMessage, false);

        return () => {
            SocketIO.off("paymentProcessed");
            window.removeEventListener("message", receiveMessage, false);
        };
    }, []);


    return(
        <Dialog open={openModalGpo}>
            <DialogContent className="sm:max-w-[30%] h-[85vh]  bg-white">
                <DialogHeader className="w-full flex flex-row items-center  justify-between">
                    <DialogTitle className="text-[#F78200]">MULTICAIXA Express</DialogTitle>
                    <DialogDescription className="text-black mt-2  sr-only">
                        Selecione o banco
                    </DialogDescription>
                    <DialogClose onClick={()=>onCloseAnOpenModalGpo(false)}>
                        <button className="bg-gray-400 rounded-md w-10 h-10  flex justify-center items-center text-white font-bold" type="button"   >
                            <CircleX />
                        </button>
                    </DialogClose>
                   
                </DialogHeader>
                <div style={styles.container}>
                    <div style={styles.card}>
                        <div style={styles.iframeContainer}>
                            {iframeToken && (
                                <iframe
                                    src={iframeToken}
                                    style={styles.iframe}
                                    title="Pagamento"
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}



const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:"100%",
        flexDirection:"column",
        backgroundColor: "#f0f2f5", 

    },
    card: {
        backgroundColor: "#fff",
        padding: "3px",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
        width: "100%",
        height:"70vh"

    },
    iframeContainer: {
        position: "relative",
        paddingBottom: "56.25%", 
        height: "70vh",
        overflow: "hidden",
        marginBottom: "24px", 
        borderRadius: "12px", 
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",


    },
    iframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        border: "none",
    },

};
