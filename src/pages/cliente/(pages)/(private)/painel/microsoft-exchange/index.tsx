import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MicrosoftExchangeLayout() {
  
    const nav = useNavigate()
  
    useEffect(() => {
        if (window.location.pathname === '/cliente/painel/microsoft-exchange' || window.location.pathname === '/cliente/painel/microsoft-exchange/') {
            nav("/cliente/painel/microsoft-exchange/servicos")
        }
    }, [nav]);

    return (
        <div>
            <Outlet />
        </div>
    )
  }
