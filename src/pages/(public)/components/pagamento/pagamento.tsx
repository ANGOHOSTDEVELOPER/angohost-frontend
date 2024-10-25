import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,DialogClose } from "@/components/ui/dialog";
import { SocketIO } from "@/socket";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import { storePagamentoGPO } from "./hooks/storePagamento";
import useCart from "@/hooks/useCart";


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
  
export default function PagamentoGpoDialog() {


    const {openModalPagamentoGPO,setOpenModalPagamentoGPO,tokenIFrane,setIFrameLoading}=storePagamentoGPO()

    const {payGPO}=useCart()

    const handleCloseDialogIframe=()=>{

        setOpenModalPagamentoGPO()
        setIFrameLoading()
    }

    function receiveMessage(event: MessageEvent) {
        if (event.origin !== "https://pagamentonline.emis.co.ao") return;
        
    }

    useEffect(() => {
        SocketIO.on("paymentProcessed", (data) => {
            const processamento:CallbackData=data
            if(processamento.status==="ACCEPTED"){
                payGPO()
                setOpenModalPagamentoGPO()
            }

        });

       
        window.addEventListener("message", receiveMessage, false);

        return () => {
            SocketIO.off("paymentProcessed");
            window.removeEventListener("message", receiveMessage, false);
        };
    }, []);

    return (
        <>
            <Dialog open={openModalPagamentoGPO}>
                <DialogContent className="sm:max-w-[30%] h-[85vh]  bg-white">
                <DialogHeader className="w-full flex flex-row items-center  justify-between">
                        <DialogTitle className="text-[#F78200]">MULTICAIXA Express</DialogTitle>
                        <DialogDescription className="text-black mt-2  sr-only">
                            Selecione o banco
                        </DialogDescription>
                        <DialogClose onClick={handleCloseDialogIframe}>
                    <button className="bg-gray-400 rounded-md w-10 h-10  flex justify-center items-center text-white font-bold" type="button"   >
                    <CircleX />
                    </button>
                </DialogClose>
                    </DialogHeader>
                <div style={styles.container}>
                    <div style={styles.card}>
                        <div style={styles.iframeContainer}>
                            {tokenIFrane && (
                                <iframe
                                    src={tokenIFrane}
                                    style={styles.iframe}
                                    title="Pagamento"
                                ></iframe>
                            )}
                        </div>
                    </div>

                    {/* <div className="mt-4 mb-4">
                        
                        <Button  className="bg-[#F78200] font-medium px-8 py-3 rounded-md  text-white  " type="button" label="Efetivar Pagamento" onClick={handlePagamento}>
                            
                        </Button>
                    </div> */}
                </div>
                </DialogContent>
               
            </Dialog>
            
        </>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:"100%",
        flexDirection:"column",
        backgroundColor: "#f0f2f5", // cor de fundo mais clara e suave
      
    },
    card: {
        backgroundColor: "#fff",
        padding: "3px", // mais espaçamento interno
        borderRadius: "12px", // bordas arredondadas maiores para um visual mais suave
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)", // sombra mais pronunciada para destaque
        width: "100%",
        height:"70vh"
        
    },
    iframeContainer: {
        position: "relative",
        paddingBottom: "56.25%", // para manter a proporção 16:9
        height: "70vh",
        overflow: "hidden",
        marginBottom: "24px", // mais espaçamento abaixo do iframe
        borderRadius: "12px", // bordas arredondadas no iframe
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        

        // sombra leve no iframe
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
