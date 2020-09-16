import AxiosService from './axios.service';

class ApiFetch {
    constructor() {
        this.service = new AxiosService()
    }


    async login(url, payload) {
        const response = await this.service.post(url, payload, ((status, data) => data))
        return response
    }


    async register(url, payload) {
        const response = await this.service.post(url, payload, ((status, data) => data))
        return response
    }

    async get(url, params) {
        try {
            return await this.service.get(url, params, ((status, data) => data))
        } catch (err) {
            console.log(err)
        }
    }

    async post(url, payload) {
        try {
            return await this.service.post(url, payload, ((status, data) => data))
        } catch (err) {
            console.log(err)
        }
    }

    async delete(url) {
        try {
            return await this.service.delete(url, ((status, data) => data))
        } catch (err) {
            console.log(err)
        }
    }

    async update(url, payload) {
        try {
            return await this.service.patch(url, payload, ((status, data) => data))
        } catch (err) {
            console.log(err)
        }
    }

    async updatePut(url, payload) {
        try {
            return await this.service.put(url, payload, ((status, data) => data))
        } catch (err) {
            console.log(err)
        }

    }
}

export default ApiFetch;