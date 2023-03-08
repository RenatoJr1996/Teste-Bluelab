import { server } from "./app";
import './socketIO';



server.listen(3333, () => {
    console.log("Sever is Running")
});