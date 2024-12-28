import usePublicStoreMicrosoftExchange from "@/contexts/publicStoreMicrosoftExchange";
import { CardPlanoMicrosoft } from "./card-plano";
import { usePlansMicrosoft } from "@/repositories/planoMicrosoftExchangeRepository";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import { RejectModal } from "@/pages/(public)/components/rejectModal";
import { BuyMicrosoftExchangeModal } from "@/pages/(public)/components/buyMicrosoftExchange";
import Skeleton from "react-loading-skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const ListaPlanoMicrosoftExchange = () => {
    const {
        plans,
        actions: { setPlans },
    } = usePublicStoreMicrosoftExchange();
    const { data, isLoading } = usePlansMicrosoft();
    const [opendedModal, setOpenedModal] = useState(false);
    const [planIndex, setPlanIndex] = useState(0);
    const [opendedReject, setOpenedReject] = useState(false);
    const { cartLenght } = useCart();
    useEffect(() => {
        setPlans(data ?? []);

        console.log("setados", data);
    }, [data]);

    function openModal(index: number) {
        console.log(plans);
        if (cartLenght >= 1) {
            setOpenedReject(true);
        } else {
            setPlanIndex(index);
            console.log(index);
            setOpenedModal(true);
        }
    }
    if (isLoading)
        return (
            <div className="flex flex-wrap gap-6 justify-center">
                <Skeleton
                    baseColor="#fff"
                    highlightColor="#edf3f8"
                    height={800}
                    className="rounded-[16px] w-full md:w-[370px]"
                />
                <Skeleton
                    baseColor="#fff"
                    highlightColor="#edf3f8"
                    height={800}
                    className="rounded-[16px] w-full md:w-[370px]"
                />
                <Skeleton
                    baseColor="#fff"
                    highlightColor="#edf3f8"
                    height={800}
                    className="rounded-[16px] w-full md:w-[370px]"
                />
            </div>
        );

    return (
        <>
          <div 
          className="flex flex-wrap gap-6 justify-center"
          >
          <Carousel
           opts={{
            align: "center",
            axis:"x"
          }}
          className="w-full"
     >
         <CarouselContent  className="-ml-1" >
             {plans.map((plan, index) => (
                 <CarouselItem
                     key={plan.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                     <CardPlanoMicrosoft
                         key={index}
                         titulo={plan.titulo}
                         id={plan.id}
                         preco={plan.preco * plan.ciclos[0].ciclo.multiplicador }
                         cicle={
                             plan.ciclos[0].ciclo.multiplicador +  `meses`
                         }
                         descricao={plan.descricao}
                         link={() => openModal(index)}
                         recursos={plan.recursos}
                         planoPopular={plan.planoPopular}
                     />
                 </CarouselItem>
             ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
     </Carousel>
          </div>



            <BuyMicrosoftExchangeModal
                plans={plans}
                opened={opendedModal}
                setOpened={setOpenedModal}
                planIndex={planIndex}
            />
            <RejectModal
                openedReject={opendedReject}
                setOpenedReject={setOpenedReject}
            />
        </>
    );
};

export default ListaPlanoMicrosoftExchange;