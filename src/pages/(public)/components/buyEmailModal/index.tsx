import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Minus, Plus, Search } from "lucide-react"
import useUtils from "@/utils/useutils"
import usePayStore from "@/contexts/payStore"
import {  IDomainExtension } from "@/interfaces/domain"
import { toast } from "sonner"
import { TailSpin } from "react-loader-spinner"
import Cookies from "js-cookie"
import useCart from "@/hooks/useCart"
import { ExitModal } from "../exitModal"
//import proxy from "@/services/proxy"
import axios from "axios"
import { IEdgarResponse } from "../transferDomainModal"
import { IConvertDomainResponseToJson } from "@/utils/converterHtmlToJson"

/*
interface IYabaduRespose {
    sucess: boolean,
    message: string
    data: {
        numero: string,
        nome: string
    }
}

interface UserPersonalData {
    id_number: string;
    first_name: string;
    last_name: string;
    gender_name: string;
    birth_date: string;
    father_first_name: string;
    father_last_name: string;
    mother_first_name: string;
    mother_last_name: string;
    marital_status_name: string;
    birth_province_name: string;
    birth_municipality_name: string;
    issue_date: string;
    expiry_date: string;
    issue_place: string;
    residence_country_name: string;
    residence_province_name: string;
    residence_municipality_name: string;
    residence_commune_name: string;
    residence_neighbor: string;
    residence_address: string;
}

interface ApiResponse {
    messageType: number;
    message: string | null;
    data: {
        code: number;
        message: string;
        data: UserPersonalData;
    };
}
*/

interface ICreateModalProps {
    opened: boolean,
    setOpened: Dispatch<SetStateAction<boolean>>,
    plans: Email[],
    planIndex: number
}

interface Email {
    id: number;
    tipo: string;
    preco: number;
    desconto: number;
    precoComDesconto: number;
    recursos: string[];
    criadoEm: string;
    atualizadoEm: string;
}

// interface UserInfo {
//     nif: string;
//     gsmc: string;
//     ssswjg: string;
//     nsrdz: string;
//     nsrfrdb: string;
//     nsrcwfzr: string;
//     hdjy: string;
//     lxfs: string;
//     email: string;
//     hdzt: string;
//     ckd: string;
//     tap_type_code: string;
//     regimeIva: string;
//     nameAbb: string;
//     addressDbb: string;
//     fzjgList: [];
//     nsrzt: string;
//     companyName: string;
// }

// interface NIF_RESPONSE {
//     success: boolean;
//     data: UserInfo;
//     error: string | null;
//     dataCount: number;
// }

const NIF_REGEX = /^[0-9]{10}$/
const BI_REGEX = /^[0-9]{9}[a-zA-Z]{2}[0-9]{3}$/

export function BuyEmailModal({ opened, setOpened, plans, planIndex }: ICreateModalProps) {

    const [emailPlan, setEmailPlan] = useState<Email | null>(null)
    const [multiplier, setMultiplier] = useState(1)
    const [domainMode, setDomainMode] = useState(1)
    const [isOpened, setIsOpened] = useState(false)
    const [total, setTotal] = useState(multiplier * (emailPlan?.preco as number))
    const [verifDomain, setVerifDomain] = useState('')
    const [loaderLoading, setLoaderLoading] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const [processComplete, setProcessComplete] = useState(false)
    const [registerLoading, setRegisterLoading] = useState(false)
    const [reusedDomain, setReusedDomain] = useState('')
    const [selectedExtension, setSelectedExtension] = useState<IDomainExtension>({ desconto: 0, id: 0, preco: 0, tipo: "" })
    const { addToCart, cartLenght } = useCart()
    const [nif, setNif] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const { isBILoaded, isNIFLoaded, currentDomain, clientLoadedInfo, actions: {
        setClientNIF, setClientLoadedInfo,
        setIsBILoaded, setIsNIFLoaded
    } } = usePayStore()
    const [loadingVerify, setLoadingVerify] = useState(false)

    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,6}(\.[A-Za-z]{2,6})?$/;

    const { domainExtensions, actions: {
        getDomainExtensions,
        setCurrentDomain,
        setCurrentDomainAvailable,
        setDomainVerifyProcessComplete
    } } = usePayStore()

    const { checkDomain } = useUtils()

    useEffect(() => {
        setTotal(multiplier * (emailPlan?.preco as number))
    }, [multiplier, emailPlan])

    useEffect(() => {
        if (domainMode === 2) {
            setIsOpened(true)
        }
    }, [domainMode])

    const { formatMoney } = useUtils()

    useEffect(() => {
        getDomainExtensions()
    }, [])

    const [openedStatus, setOpenedStatus] = useState(false)

    async function verifyDomain() {

        if (selectedExtension.tipo !== '') {
            setLoaderLoading(true)
            setCurrentDomain(`${verifDomain}${selectedExtension.tipo}`)
            try {
                const json:  IConvertDomainResponseToJson = await checkDomain(`${verifDomain}${selectedExtension.tipo}`)
                if (json.availability && json.domain!="") {
                    toast.success('Domínio disponivel')
                    setCurrentDomainAvailable(true)
                    setOpenedStatus(true)
                }
                else {
                    toast.error('Domínio indisponivel')
                    setCurrentDomainAvailable(false)
                }
                return json
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setDomainVerifyProcessComplete(true)
                setLoaderLoading(false)
                const inp = document.querySelector('.inputVerifyDomain') as HTMLInputElement
                inp.value = ''
            }
        }
        else {
            toast.error('Selecione a sua extensao!')
        }
    }

    function registerTitular() {
        if ((selectedExtension.tipo === ".co.ao" || selectedExtension.tipo === ".ao") && verifDomain.length === 3) {
            setCurrentDomain(`${verifDomain}${selectedExtension.tipo}`)
            const product = {
                id: (cartLenght + 1).toString(),
                name: `Domínio premium ${verifDomain}${selectedExtension.tipo}`,
                planId: selectedExtension.id.toString(),
                price: 300000,
                domainName: `${verifDomain}${selectedExtension.tipo}`,
                entensionId: selectedExtension.id,
                newDomain: true,
                type: "domain",
                joined: true
            }
            addToCart(product)
            setRegisterLoading(true)
            setTimeout(() => {
                const newDomainTitular = {
                    nif: nif,
                    nome: name,
                    endereco: address,
                    pais: country,
                    domain: `${verifDomain}${selectedExtension.tipo}`,
                    extensionId: selectedExtension.id,
                    new: true,
                    to: 'hospedagem'
                }
                Cookies.set('newDomainTitular', JSON.stringify(newDomainTitular))
                toast.success('Dominio premium registado com sucesso!')
                setRegisterLoading(false)
                setModalRegister(false)
                setIsOpened(false)
                setProcessComplete(true)
            }, 1000)
        }
        else {
            setCurrentDomain(`${verifDomain}${selectedExtension.tipo}`)
            const product = {
                id: (cartLenght + 1).toString(),
                name: `Domínio ${verifDomain}${selectedExtension.tipo}`,
                planId: selectedExtension.id.toString(),
                price: selectedExtension.preco,
                domainName: `${verifDomain}${selectedExtension.tipo}`,
                entensionId: selectedExtension.id,
                newDomain: true,
                type: "domain"
            }
            addToCart(product)
            setRegisterLoading(true)
            setTimeout(() => {
                const newDomainTitular = {
                    nif: nif,
                    nome: name,
                    endereco: address,
                    pais: country,
                    domain: `${verifDomain}${selectedExtension.tipo}`,
                    extensionId: selectedExtension.id,
                    new: true,
                    to: 'email'
                }
                Cookies.set('newDomainTitular', JSON.stringify(newDomainTitular))
                toast.success('Dominio registado com sucesso!')
                setRegisterLoading(false)
                setModalRegister(false)
                setProcessComplete(true)
                setIsOpened(false)
            }, 1000)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
            }
        })
    }, [])

    async function verifyNif() {
        setClientNIF(nif.toUpperCase())
        setLoadingVerify(true)
        // if (NIF_REGEX.test(nif)) {
        //     try {
        //         const response: IYabaduRespose = await (await proxy.get(`/yabaduu.ao/ao/actions/nif.ajcall.php?nif=${nif}`)).data
        //         if (response.sucess) {
        //             toast.success('NIF verificado com sucesso!')
        //             setIsNIFLoaded(true)
        //             setIsBILoaded(false)
        //             setLoadingVerify(false)
        //             setClientLoadedInfo({
        //                 name: response.data.nome
        //             })
        //         }
        //         else {
        //             toast.error('NIF Invalido!')
        //         }
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        //     finally {
        //         setLoadingVerify(false)
        //     }
        //     
        // }
        // else if (BI_REGEX.test(nif)) {
        //     setLoadingVerify(true)
        //     try {
        //         const resp: ApiResponse = await (await proxy.get(`/https://api.inagbe.gov.ao/api/v1/consultarBi?bi=${nif}`)).data
        //         toast.success('BI Verificado com sucesso!')
        //         setClientLoadedInfo({
        //             name: `${resp.data.data.first_name} ${resp.data.data.last_name}`,
        //         })
        //         setIsBILoaded(true)
        //         setIsNIFLoaded(false)
        //     }
        //     catch {
        //         toast.error('Ocorreu um erro ao processar a sua solicitação!')
        //     }
        //     finally {
        //         setLoadingVerify(false)
        //     }
        // }
        // else {
        //     toast.error('Valor inválido!')
        //     setLoadingVerify(false)
        // }º
        try {
            const response: IEdgarResponse = await (await axios.get(`https://consulta.edgarsingui.ao/public/consultar-por-nif/${nif}`)).data
            if (response.data.success) {
                toast.success('BI Verificado com sucesso!')
                setClientLoadedInfo({
                    name: response.data.nome
                })
                if (NIF_REGEX.test(nif)) {
                    setIsNIFLoaded(true)
                    setIsBILoaded(false)
                }
                else if (BI_REGEX.test(nif)) {
                    setIsBILoaded(true)
                    setIsNIFLoaded(false)
                }
            }
            else {
                toast.error('Não encontrado!',{
                    position:"top-center"
                })
            }
        }
        catch {
            toast.error('Ocorreu um erro ao processar a sua solicitação!',{
                position:"top-center"
            })
        }
        finally {
            setLoadingVerify(false)
        }
    }

    const [loadingAdd, setLoadingAdd] = useState(false)
    const [openedExit, setOpenedExit] = useState(false)

    function add() {
        if (domainMode === 1) {
            Cookies.remove('newDomainTitular')
        }
        setLoadingAdd(true)
        const product = {
            id: (cartLenght).toString(),
            name: `${emailPlan?.tipo as string}`,
            price: emailPlan?.preco as number * multiplier,
            planId: emailPlan?.id,
            domain: domainMode === 1 ? reusedDomain : `${verifDomain}${selectedExtension.tipo}`,
            emailQuantity: multiplier,
            newDomain: domainMode === 1 ? false : true,
            entensionId: selectedExtension.id,
            type: "email"
        }
        addToCart(product)
        setTimeout(() => {
            toast.success('Adicionado ao carrinho!')
            setOpenedExit(true)
            setLoadingAdd(false)
            setIsOpened(false)
            setOpened(false)
        }, 1000)
    }

    useEffect(() => {
        if (plans && plans[planIndex]) {
            setEmailPlan(plans[planIndex])

        }
    }, [plans, opened])

    useEffect(() => {
        if (emailPlan && emailPlan.id) {
            setMultiplier(1)
        }
    }, [emailPlan])

    useEffect(() => {
        if (domainExtensions && domainExtensions[1]) {
            setSelectedExtension(domainExtensions[1])
        }
    }, [domainExtensions])

    return (
        <>
            <Dialog open={opened} >
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-black">Adicionar ao carrinho</DialogTitle>
                        <DialogDescription className="text-black">
                            Informe as informações do cliente.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <Select defaultValue={(plans && plans[planIndex]) && plans[planIndex].id.toString()} onValueChange={(value) => {
                            const selectedPlan = plans.find(plan => plan.id.toString() === value);
                            setEmailPlan(selectedPlan as Email);
                        }}>

                            <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Selecione o seu plano de E-Mail" />
                            </SelectTrigger>
                            <SelectContent>
                                {plans && plans.map((item, _index) => (
                                    <SelectItem key={_index} value={item.id.toString()}>{item.tipo}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                Selecione a quantidade de contas de E-Mail
                            </Label>
                            <div className="flex items-center justify-center gap-3">
                                <p className="text-[2.3rem] font-bold mt-4 text-gradient">{formatMoney(total)}</p>
                            </div>
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <Button disabled={multiplier === 1} onClick={() => setMultiplier(prevMultiplier => prevMultiplier - 1)} variant={"outline"} type="button"><Minus strokeWidth={1.8} width={15} /></Button>
                                <p className="text-[1.3rem]">{multiplier}</p>
                                <Button onClick={() => setMultiplier(prevMultiplier => prevMultiplier + 1)} variant={"outline"} type="button"><Plus strokeWidth={1.8} width={15} /></Button>
                            </div>
                        </div>
                        <Select onValueChange={(value) => setDomainMode(parseInt(value))}>
                            <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Já tem um domínio?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Já tenho um domínio</SelectItem>
                                <SelectItem value="2">Ainda não tenho um domínio</SelectItem>
                            </SelectContent>
                        </Select>
                        {(domainMode && domainMode === 1) && <div className="">
                            {!processComplete && <><Label htmlFor="username" className="text-right">
                                Domínio
                            </Label>
                                <Input id="username" value={reusedDomain} onChange={(e) => setReusedDomain(e.target.value)} placeholder="Insira o seu domínio" className="col-span-3" />
                            </>}
                        </div>}
                        {(domainMode && domainMode === 2) && <div className="">
                            {processComplete && <><Label htmlFor="username" className="text-right">
                                Domínio
                            </Label>
                                <Input id="username" value={currentDomain} readOnly className="col-span-3" />
                            </>}
                        </div>}
                        <div className="flex gap-3 items-center justif-center">
                            <Button className="w-1/2" onClick={() => setOpened(false)} variant={"outline"} type="button">Cancelar</Button>
                            <Button onClick={add} disabled={domainMode === 1 ? (!domainRegex.test(reusedDomain) || total === 0 || loadingAdd) : (!processComplete || total === 0 || loadingAdd)} className="w-1/2 bg-[var(--primary)] hover:bg-[var(--primary)]" type="submit">{loadingAdd ? <TailSpin color="#fff" width={20} /> : <>Adicionar ao carrinho</>}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isOpened} >
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-black">Verificar disponibilidade</DialogTitle>
                        <DialogDescription className="text-black">
                            Insira as informações do domínio.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor="username" className="text-right">
                                Domínio
                            </Label>
                            <div className="flex gap-2">
                                <Input id="username" value={verifDomain} onChange={(e) => setVerifDomain(e.target.value)} placeholder="seudominio" className="inputVerifyDomain w-[70%]" />
                                <Select defaultValue={(domainExtensions && domainExtensions[1]) && domainExtensions[1].id.toString()} onValueChange={(value) => {
                                    const selected = domainExtensions.find(item => item.id.toString() === value);
                                    setSelectedExtension(selected as IDomainExtension);
                                }}>
                                    <SelectTrigger className="w-[30%]" defaultValue={"1"}>
                                        <SelectValue placeholder="Extensão" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {domainExtensions.map((item, _index) => (
                                            <SelectItem key={_index} value={item.id.toString()}>{item.tipo}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="button" onClick={() => setIsOpened(false)} variant={'outline'}>Cancelar</Button>
                        <Button onClick={(verifyDomain)} disabled={verifDomain.length < 3 || loaderLoading || selectedExtension.id === 0 || verifDomain.includes('.') || verifDomain.includes('@' || verifDomain.includes('#'))} className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] flex items*center justify-center gap-2 ">{loaderLoading ? <TailSpin color="#fff" width={20} /> : <>Verificar disponibilidade <Search width={18} /></>}</Button>

                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={modalRegister} >
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-black">Titularidade do domínio</DialogTitle>
                        <DialogDescription className="text-black">
                            Insira as informações de titularidade do domínio.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <div>
                            <Label className="text-right">
                                NIF | BI
                            </Label>
                            <div className="flex gap-2">
                                <Input value={nif} onChange={(e) => setNif(e.target.value)} placeholder="Insira o NIF ou BI" className="inputVerifyDomain w-full" />
                                {(!isNIFLoaded && !isBILoaded) && <Button type="button" className="w-max px-3" onClick={verifyNif} disabled={loadingVerify} variant={'outline'}>{loadingVerify ? <TailSpin width={20} color="#222" /> : 'Verificar'}</Button>} </div>
                        </div>
                        {(isNIFLoaded || isBILoaded) && <><div>
                            <Label className="text-right">
                                Titular
                            </Label>
                            <div className="flex gap-2">
                                <Input value={clientLoadedInfo.name} className="inputVerifyDomain w-full" />
                            </div>
                        </div>
                            <div>
                                <Label className="text-right">
                                    País
                                </Label>
                                <div className="flex gap-2">
                                    <Input placeholder="País" value={country} onChange={(e) => setCountry(e.target.value)} className="inputVerifyDomain w-full" />
                                </div>
                            </div>
                            <div>
                                <Label className="text-right">
                                    Endereço
                                </Label>
                                <div className="flex gap-2">
                                    <Input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} className="inputVerifyDomain w-full" />
                                </div>
                            </div> </>}
                        <div className="w-full flex items-center justify-center gap-2">
                            <Button type="button" className="w-1/2" onClick={() => {
                                setModalRegister(false)
                                setIsBILoaded(false)
                                setIsNIFLoaded(false)
                                setClientLoadedInfo({ name: "" })
                            }} variant={'outline'}>Cancelar</Button>
                            {
                                (isNIFLoaded || isBILoaded) && (
                                    <Button type="button" className="w-1/2 bg-zinc-900 hover:bg-zinc-950" onClick={registerTitular} variant={'default'}>{registerLoading ? <TailSpin width={20} color="#fff" /> : 'Confirmar'}</Button>
                                )
                            }
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openedStatus} >
                <DialogContent className="sm:max-w-[325px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-[#000]">{currentDomain}</DialogTitle>
                        <DialogDescription className="text-[#000]">
                        <>Domínio disponível para registro ao preço de <span className="bg-[#12753A11] text-[#12753A] py-1.5 px-3">{formatMoney((currentDomain.split('.')[0].length === 3  && (selectedExtension.tipo === '.ao' || selectedExtension.tipo === '.co.ao')) ? 300000 : selectedExtension.preco)}</span></>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold" style={{ color: "#096909"}}>Domínio disponível</h1>
                        <div className="flex items-center justify-center gap-2 mt-6 w-full">
                            <Button className="bg-[#fff] hover:bg-[#fff]" type="button" onClick={() => setOpenedStatus(false)} variant={'outline'}>Verificar outro</Button>
                            <Button className="bg-[#012f01] w-1/2 hover:bg-[#012f01]" type="button" onClick={() => {
                                setOpenedStatus(false)
                                setModalRegister(true)
                            }}>Registar</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ExitModal openedExit={openedExit} setOpenedExit={setOpenedExit} />
        </>
    )
}
