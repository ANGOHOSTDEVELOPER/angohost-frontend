import "./email-office-365.css"
import { Footer } from "../../components/footer"
import NavbarFull from "../../components/nav/nav"
import { LOGOBRANCO } from "../../../../utils/logos"
import { FaMicrosoft } from "react-icons/fa";
import { Helmet } from "react-helmet"

import { RejectModal } from "../../components/rejectModal"

import ListaPlanoMicrosoftExchange from "./components/list-plano-microsoft-exchange"
import { useState } from "react";


const PaginaEmailOffice365 = () => {


  const [opendedReject, setOpendedReject] = useState(false)




//   const plans = [
//     {
//       title: 'Exchange 365 Basic',
//       price: 24700,
//       priceDetail: 'utilizador/mês',
//       buttonLabel: 'Comprar agora',
//       link: '#',
//       features: [
//         '4 vCPU Cores',
//         'Gestão de identidade e acesso para até 50 colaboradores',
//         'E-mail empresarial personalizado',
//         'SSD 400GB  de armazenamento na nuvem',
//         '6GB RAM do Servidor',
//         'Filtragem de spam e malware automática',
//         'Suporte por telefone e na Web',
//         'Permite até 50 usuário'
//       ],
//     },
//     {
//       title: 'Exchange 365 Premium',
//       price: 28000,
//       priceDetail: 'utilizador/mês',
//       buttonLabel: 'Comprar agora',
//       link: '#',
//       features: [
//         '6 vCPU Cores',
//         'Gestão de identidade e acesso para até 100 colaboradores',
//         'Versões para computador do Word, Excel, PowerPoint e Outlook',
//         'Webinars com registo de participantes e relatórios',
//         'SSD 600GB  de armazenamento na nuvem',
//         '16GB RAM do Servidor',
//         'Áreas de trabalho colaborativas',
//         'Permite até 100 usuário'
//       ],
//     },
//     {
//       title: 'Exchange 365 Empresas',
//       price: 24000,
//       priceDetail: 'utilizador/mês',
//       buttonLabel: 'Comprar agora',
//       link: '#',
//       features: [
//         '8 vCPU Cores',
//         'Gestão de identidade e acesso para até 100 colaboradores',
//         'Gestão de identidade e acesso avançada',
//         'Proteção contra vírus e ataques de phishing',
//         'SSD 1.2 TB  de armazenamento na nuvem',
//         '24 GB RAM do Servidor',
//         'Proteção de pontos finais empresariais',
//       ],
//     },
//     {
//       title: 'Exchange 365 Plus',
//       price: 20000,
//       priceDetail: 'utilizador/mês',
//       buttonLabel: 'Comprar agora',
//       link: '#',
//       features: [
//         '12 vCPU Cores',
//         'Versões para computador do Word, Excel, PowerPoint & Outlook',
//         '1.6 TB SSD de armazenamento na nuvem por utilizador',
//         '48 GB RAM do Servidor',
//         'Suporte por telefone e na Web em qualquer altura',
//       ],
//     },
//   ];






  return (
    <>
      <Helmet>
        <title>MicrosoftExchange - Aumente a credibilidade da sua empresa</title>
        <h1>Encontre o melhor plano do Microsoft 365 para a sua empresa
        </h1>
      </Helmet>
      <NavbarFull logo={LOGOBRANCO} color="#ffff" />
      <div>
        <div className="container-hospedagem">
          <div className="container-hospedagem-wordpress" >
            <div className="content-hospedagem-wordpress-left">
              <div className="content-info" >
                <h3>Microsoft 365</h3>
                <h2>Escolha entre planos com e sem o Microsoft Teams</h2>
                <p><strong>Credibilidade e Confiabilidade</strong></p>
              </div>
             
            </div>
            <div className="content-hospedagem-wordpress-rigth" >
              <FaMicrosoft color="#fff" size={200} />
            </div>
          </div>


        </div>
      </div>
      <div className="plano-title"  >
        <h2>Garanta já o seu email profissional e destaque-se no mercado!</h2>
        <p>Angohost - Sua Solução Completa em Serviços de MicrosoftExchange</p>
      </div>

   

    <ListaPlanoMicrosoftExchange/>


      <Footer />
     
      <RejectModal openedReject={opendedReject} setOpenedReject={setOpendedReject} />
    </>
  )
}


export default PaginaEmailOffice365;