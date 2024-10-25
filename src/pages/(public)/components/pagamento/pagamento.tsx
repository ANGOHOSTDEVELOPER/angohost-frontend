import Button from "@/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,DialogClose } from "@/components/ui/dialog";
import useCart from "@/hooks/useCart";
import { SocketIO } from "@/socket";
import axios from "axios";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { storePagamentoGPO } from "./hooks/storePagamento";
import useUtils from "@/utils/useutils";

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
    const [token, setToken] = useState<string>(""); // Estado para armazenar a URL

    const {openModalPagamentoGPO,setOpenModalPagamentoGPO,setOpenAccount}=storePagamentoGPO()
    // const [openAccount, setOpenAccount] = useState(false)
    const { isAuthenticated } = useUtils()
    const {getTotal,payGPO}=useCart()
    async function getFrameToken({ amount }: { amount: number }) {
        try {

            if (!isAuthenticated()) {
                setOpenModalPagamentoGPO()
                setOpenAccount()
                // setLoading(false)
            }
            const response: TokenResponse = (
                await axios.post("https://gpo.angohost.ao/api/pagamento", {
                    amount,
                })
            ).data;

            return response;
        } catch (error) {
            console.error("Erro ao gerar o token:", error);
            throw error;
        }
    }
    const payload = {
        amount: getTotal()
    };

    const handlePagamento = async () => {
        await getFrameToken(payload)
            .then((tokenData) => {
                console.log("Dados recebidos:", tokenData);
                setToken(tokenData.token.url);
            })
            .catch((err) => {
                console.error("Erro:", err);
            });
    };

    function receiveMessage(event: MessageEvent) {
        if (event.origin !== "https://pagamentonline.emis.co.ao") return;
        console.log("Received from GPO: ", event.data);
    }

    useEffect(() => {
        SocketIO.on("paymentProcessed", (data) => {
            const processamento:CallbackData=data
            console.log("Pagamento processado:", data);

            if(processamento.status==="REJECTED"){
                payGPO()
                setOpenModalPagamentoGPO()
            }

        });

        SocketIO.on("dev", (data) => {
            console.log("testando dev:", data);
        });
        window.addEventListener("message", receiveMessage, false);

        return () => {
            SocketIO.off("paymentProcessed");
            window.removeEventListener("message", receiveMessage, false);
        };
    }, [openModalPagamentoGPO]);

    return (
        <>
            <Dialog open={openModalPagamentoGPO}>
                <DialogContent className="sm:max-w-[60%]  bg-white">
                <DialogHeader className="w-full flex flex-row items-center  justify-between">
                        <DialogTitle className="text-[#F78200]">MULTICAIXA Express</DialogTitle>
                        <DialogDescription className="text-black mt-2  sr-only">
                            Selecione o banco
                        </DialogDescription>
                        <DialogClose onClick={setOpenModalPagamentoGPO}>
                    <button className="bg-gray-400 rounded-md w-10 h-10  flex justify-center items-center text-white font-bold" type="button"   >
                    <CircleX />
                    </button>
                </DialogClose>
                    </DialogHeader>
                <div style={styles.container}>
                    <div style={styles.card}>
                        <div style={styles.iframeContainer}>
                            {token && (
                                <iframe
                                    src={token}
                                    style={styles.iframe}
                                    title="Pagamento"
                                ></iframe>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 mb-4">
                        
                        <Button  className="bg-[#F78200] font-medium px-8 py-3 rounded-md  text-white  " type="button" label="Efetivar Pagamento" onClick={handlePagamento}>
                            
                        </Button>
                    </div>
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
        
        flexDirection:"column",
        backgroundColor: "#f0f2f5", // cor de fundo mais clara e suave
      
    },
    card: {
        backgroundColor: "#fff",
        padding: "20px", // mais espaçamento interno
        borderRadius: "12px", // bordas arredondadas maiores para um visual mais suave
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)", // sombra mais pronunciada para destaque
        width: "100%",
        height:"100%"
        
    },
    iframeContainer: {
        position: "relative",
        paddingBottom: "56.25%", // para manter a proporção 16:9
        height: 0,
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
