import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {storeModalCreditoModalGpo} from "@/contexts/store_credito/modal_credito_gpo.tsx";
import {toast} from "sonner";
import {storeCreditoSaldoCarregar} from "@/contexts/store_credito/credito.ts";
import useCredito from "@/hooks/useCredito.tsx";

export function ModalAdicionarSaldo() {
    const {openModalCredito,onCloseAnOpenModalCredito,onCloseAnOpenModalGpo,setIframeToken}=storeModalCreditoModalGpo()

    const {saldo,setSaldo}=storeCreditoSaldoCarregar()

    const {handleGetIFrameGpo}=useCredito()
    const handleAdicionarSaldo = async () => {
        try {
            
            if(saldo===undefined ||  saldo===null || Number(saldo)<10000){
                toast.error("Melhor fazer um carregamento de 10.000,kz ou mais para comprar os vir")
                return
            }
            
         await  handleGetIFrameGpo(Number(saldo))
             .then(data=>{
               
                 if(!data?.success){
                     toast.error("Ocorreu um erro ao processar a saldo")
                     onCloseAnOpenModalGpo(false)
                 }
                 console.log(data)
                 setIframeToken(data?.token.url!)

                 setTimeout(()=>{
                     onCloseAnOpenModalGpo(true)
                 },1000)
             })
        }
        catch(error){
            console.log(error)
            onCloseAnOpenModalGpo(false)
            onCloseAnOpenModalCredito(false)
        }
        finally {
            onCloseAnOpenModalGpo(false)
            onCloseAnOpenModalCredito(false)
        }
    }
    
    return(

        <Dialog open={openModalCredito}  >
            <DialogTrigger asChild>
                <Button variant="outline">Adicionar saldo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white ">
                <DialogHeader>
                    <DialogTitle className={"text-green-600"}>Adicionar saldo</DialogTitle>
                    <DialogDescription>
                    Adiciona saldo para poder comprar os servico mais rapidos.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex  items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Saldo
                        </Label>
                        <Input
                            id="saldo_cliente"
                            className="col-span-3"
                            required={true}
                            type={"number"}
                            value={saldo}
                            onChange={(e)=>setSaldo(Number(e.target.value))}
                        />
                        <Label htmlFor="name" className="text-right">
                            kz
                        </Label>
                    </div>
                </div>
                <div className={" w-full flex justify-center items-center gap-4 "} >
                    <Button type="button"  onClick={()=>onCloseAnOpenModalCredito(false)}  className="bg-red-400 hover:bg-red-500"  >Cancelar</Button>
                    <Button type="submit" className="bg-[#121212] hover:bg-gray-800"  onClick={handleAdicionarSaldo}      >Adicionar saldo</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
    
    
}