import "./styles.css"
//import imagem_banner from "@/assets/images/capa-home-angohost.png"
import imagem_banner_natal from "@/assets/images/banner_natal.jpg"
import CountdownClock from "../relogio/relogio"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../../../../services/api"
import { TailSpin } from "react-loader-spinner"
import { GoArrowRight } from "react-icons/go"
import { Link } from "react-router-dom"
import { Check } from "lucide-react"

interface typeTempo{
    id:string
    tempo:string
}

export const BannerHome =  () => {
     
    // // const targetDate = "2024-07-22T23:59:59";
    // // const [targetDate,setTargetDate]=useState<string>("2024-09-30T23:59:59")
    // const [time,setTime]=useState<typeTempo>()

   

    // const buscarTempo=async (id:string)=>{
    //     const tempo=(await api.get(`/tempo/${id}`)).data
    
    //     return tempo
    // }
    // const {data,isLoading}=useQuery({
    //     queryKey:["tempo-promo","id"],
    //     queryFn:()=>buscarTempo("22fa65b7-a73c-4114-b67f-ed707ef27a4c")
    // })

    // // async function tempoPub(){
    // //     const tempo:typeTempo= await data
    // //     setTargetDate(tempo.tempo)
    // // }
    // useEffect(()=>{
      
    //     setTime(data)
    // },[data])



    const [targetDate, setTargetDate] = useState<string>("2024-07-22T23:59:59")

    const buscarTempo = async (id: string) => {
        const tempo = (await api.get(`/tempo/${id}`)).data
           
        return tempo
    }

    const { data, isLoading } = useQuery({
        queryKey: ["tempo-promo", "id"],
        queryFn: () => buscarTempo("22fa65b7-a73c-4114-b67f-ed707ef27a4c")
    })

    async function tempoPub() {
        const tempo: typeTempo = await data
        setTargetDate(tempo.tempo)
    }

    useEffect(() => {
        tempoPub()
    }, [data])


    return (
        <div className="banner-home"  >
            <div className="banner-home-flex"   >
                {/* <div className="banner-home-left" >
                    <div className="banner-home-left-info" >
                    <span className="text-zinc-600 text-[0.8rem] sm:text-[1.1rem]">Com Angohost, seu projeto online está em boas mãos.</span>
                        <h2 className="text-3xl">Transfira seu domínio .co.ao ou .ao


                        para nós e desfruta de 1 ano de e-mail corporativo
                        </h2>
                        <h2 className="text-3xl"></h2>
                        <p  className=" text-zinc-600 text-[0.8rem] sm:text-[1.1rem]" >
                        Angohost, levando sua marca ao mundo digital com facilidade
                        </p>
                        <ul className="mb-3">
                            <li className="flex justify-start items-center  text-zinc-600 gap-1  " > <Check width={24} color="#00B090" />Domínio grátis</li>
                            <li className="flex justify-start items-center  text-zinc-600 gap-1  " > <Check width={24} color="#00B090" />Migração de sites grátis</li>
                            <li className="flex justify-start items-center  text-zinc-600 gap-1  " > <Check width={24} color="#00B090" />Suporte ao cliente 24h</li>

                        </ul>
                        <h4 className="banner-home-left-info-h4 text-red-500 text-2xl font-semibold ">Oferta por tempo limitado corra!</h4>
                        <div className="banner-home-left-info-button_container  " >
                           {isLoading?<TailSpin color="red" width={20} />: <CountdownClock targetDate={targetDate} />}
                           <Link className="h-[45px] ml-2 px-3 rounded-lg flex items-center justify-center hover:text-white" style={{ textDecoration: "none", background: 'linear-gradient(-90deg, rgb(43 6 67 / 85%), rgb(120 3 121), rgb(2, 18, 31))' }} to={"/Email-profissional"}>Começa agora <GoArrowRight /> </Link>
                        </div>
                       
                    </div>
                </div> */}













<div className="banner-home-left bg-black p-6 rounded-xl shadow-lg relative mb-4">
      {/* Adicionando a neve como efeito de fundo */}
     

      <div className="banner-home-left-info">
        {/* <span className="text-white text-[1rem] sm:text-[1.2rem] font-medium">
          Com Angohost, seu projeto online está em boas mãos.
        </span>
        
        <h2 className="text-white text-xl font-semibold ">
          Transfira seu domínio .co.ao ou .ao para nós e desfrute de 1 ano de e-mail corporativo
        </h2> */}

        <p className="text-2xl" >
        Na Angohost, garantimos que seu projeto online esteja em boas mãos.
         Transfira seu domínio .co.ao ou .ao para nossa plataforma e usufrua de 1 ano de e-mail corporativo, com total segurança, suporte especializado e a excelência que sua marca merece.
        </p>

        <p className="text-white text-[1rem] sm:text-[1.2rem] mt-4 opacity-90 leading-relaxed">
          Angohost, levando sua marca ao mundo digital com facilidade.
        </p>

        <ul className="mt-4 space-y-2">
          <li className="flex justify-start items-center text-white gap-2 text-lg font-medium">
            <Check width={24} color="#00B090" />Domínio grátis
          </li>
          <li className="flex justify-start items-center text-white gap-2 text-lg font-medium">
            <Check width={24} color="#00B090" />Migração de sites grátis
          </li>
          <li className="flex justify-start items-center text-white gap-2 text-lg font-medium">
            <Check width={24} color="#00B090" />Suporte ao cliente 24h
          </li>
        </ul>

        <h4 className="text-red-500 text-2xl font-medium mt-6">
          Oferta por tempo limitado, corra!
        </h4>

        <div className="banner-home-left-info-button_container mt-4 flex items-center">
          {/* Condicional para exibir a contagem regressiva ou o carregamento */}
          {isLoading ? (
            <TailSpin color="red" width={20} />
          ) : (
            <CountdownClock targetDate={targetDate} />
          )}

          <Link
            className="ml-4 px-6 py-2 rounded-lg flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-green-700 transition duration-300 ease-in-out"
            style={{ textDecoration: "none" }}
            to={"/Email-profissional"}
          >
            Começa agora <GoArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>


                
                <div className="banner-home-rigth" >
                    <div className="banner-home-image-capa" >
                        <img src={imagem_banner_natal} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}