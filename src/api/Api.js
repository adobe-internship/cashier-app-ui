import axios from "axios"

class Api {
    getHeaders() {
        return {
            "authorization": localStorage.getItem("token") || undefined,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    post(path, data, ) {
        return axios.post(path, data, {
            headers: this.getHeaders()
        })
    }

    get(path) {
        return axios.get(path, {
            headers: this.getHeaders()
        })
    }

    delete(path)
    {
        return axios.delete(path,{
            headers:this.getHeaders()
        })
    }
}
export default new Api()