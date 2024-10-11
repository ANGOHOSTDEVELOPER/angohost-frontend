import { Link } from "react-router-dom"
import styled from "styled-components"


const ContainerModalHospedagem = styled.div`
top: 45px;
display: flex;
flex-direction: column;
position: absolute;
width: 300px ;
height: max-content;
justify-content: center;
align-items: center;
margin-left: 170px;
z-index: 2;
box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
background: #ffffff;
border-radius: 8px;
padding: 10px;
`
const ContainerFlex = styled(Link)`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 70px;
border-radius: 8px;
text-decoration: none;
cursor: pointer;
padding: 10px;
gap: 10px;


&:hover{
    background: #30486522;
    text-decoration: none;
}


`
const Icon = styled.div`
max-width: 40px;
max-height: 40px;
display: flex;
align-items: center;
justify-content: center;

img{
    width: 100%;
}
`
const Descricao = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;
height: 100%;
margin-top: 0px;
margin-left: 10px;

h3{
    font-size: 0.9rem;
    margin: 0px 0px 0px 0px;
    color: #304865;
    line-height: 20px;
    font-family: Poppins;
    margin-bottom: 0px;
}
p{
    font-size: 12px;
    line-height: 15px;
    margin: 5px 0px 0px 0px;
    color: #30486599
    ;
}
`

export const ModalContacto = () => {
    return (
        <ContainerModalHospedagem>
            <ContainerFlex style={{textDecoration:"none"}}    to={"/contactos"}  >
                <Icon>
                    <img src="https://www.squarebrothers.com/images/icon/live-chat.svg" alt="" />
                </Icon>
                <Descricao> 
                
               
                    <h3>Suporte 24/7</h3>
                    <p>
                    Nossos representantes ao vivo estão disponíveis no chat 24/7
                    </p>
                </Descricao>
            </ContainerFlex>
            <ContainerFlex style={{textDecoration:"none"}}   to={"https://wa.me/+244923000143"}  >
                <Icon>
                    <img src="https://www.squarebrothers.com/images/icon/whatsapp.svg" alt="" />
                </Icon>
                <Descricao> 
                    <h3>Whatsapp</h3>
                    <p>
                    Converse conosco no WhatsApp
                    </p>
                </Descricao>
            </ContainerFlex>
          
        </ContainerModalHospedagem>
    )
}