
import { io } from "socket.io-client";


//const url="https://gpo.angohost.ao"
const url_local="http://localhost:7000"
export const SocketIO = io(url_local)


