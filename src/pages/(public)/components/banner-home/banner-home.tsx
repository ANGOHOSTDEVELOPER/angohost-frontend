import "./styles.css";
//import imagem_banner from "@/assets/images/capa-home-angohost.png"
import imagem_banner_natal from "@/assets/images/banner_natal.jpg";
import CountdownClock from "../relogio/relogio";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../services/api";
import { TailSpin } from "react-loader-spinner";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
//import { Check } from "lucide-react";
import NeveComponent from "../neve/neve";

interface typeTempo {
    id: string;
    tempo: string;
}

export const BannerHome = () => {
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

    const [targetDate, setTargetDate] = useState<string>("2024-07-22T23:59:59");

    const buscarTempo = async (id: string) => {
        const tempo = (await api.get(`/tempo/${id}`)).data;

        return tempo;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["tempo-promo", "id"],
        queryFn: () => buscarTempo("b9bef38a-3a98-43d2-b425-f72136e5c120"),
    });

    async function tempoPub() {
        const tempo: typeTempo = await data;
        setTargetDate(tempo.tempo);
    }

    useEffect(() => {
        tempoPub();
    }, [data]);

    return (
        <>
            <main className="w-full">
                <div className="w-full relative">
                    <NeveComponent />
                    <img
                        className="w-[100%]"
                        src={imagem_banner_natal}
                        alt="banner natal"
                    />

                    <div className="absolute  flex justify-center flex-col  items-center inset-0 bg-gray-950 bg-opacity-60  top-0 left-0 w-[100%] h-[100%] z-50">
                        <div className="w-1/2 flex flex-col items-center justify-center"  >
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white  text-center">
    🎄 Aproveite o Espírito Natalino para Impulsionar seu Negócio Online com a <strong>Angohost</strong>! 🎄
  </h3>
                        <p className="bg-green-100 text-green-700 font-semibold text-lg sm:text-xl px-4 py-3 rounded-md shadow-md mb-6">
    🎁 Oferta exclusiva por tempo limitado!
  </p>


                        </div>
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
                                    ⏳ Corra e aproveite agora mesmo!{" "}
                                    <GoArrowRight className="ml-2" />
                                </Link>
                            </div>
                    </div>
                </div>
            </main>


        </>
    );
};
