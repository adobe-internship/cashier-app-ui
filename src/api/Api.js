import axios from "axios"

class Api {
    getHeaders() {
        return {
            "authorization": localStorage.getItem("token") || undefined
        }
    }

    post(path, data, ) {
        if(localStorage.getItem("token") == "undefined")
        {
            return axios.post(path, data, {
                headers: this.getHeaders()
            })
        }
        return axios.post(path, data, {
            headers: this.getHeaders()
        })
    }

    get(path) {
        return axios.get(path, {
            headers: this.getHeaders()
        })
    }
}
export default new Api()