import {INewOrder} from "@/interfaces/order";

export default {
    host: 'http://localhost',
    port: 4000,
    version: 'api/v1',
    getUrl: function (){
        return `${this.host}:${this.port}/${this.version}`
    },
    setGetHeaders(): RequestInit {
        return {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
    },
    setPostHeaders(payload: INewOrder): RequestInit {
        return {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    },
    setPatchHeaders(payload: INewOrder): RequestInit {
        return {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    },
}
