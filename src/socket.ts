
import { io } from "socket.io-client";


const url="https://gpo.angohost.ao"
const url_local="http://localhost:7000"

const apiUrlMode={
    production:url,
    development:url_local
}
export const SocketIO = io(apiUrlMode.production)


