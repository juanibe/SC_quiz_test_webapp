import axios from 'axios';
import qs from 'qs'

import { getJwt } from '../helpers/get-jwt.helper'

class AxiosService {
    constructor() {
        const token = getJwt()
        let service = axios.create({
            baseURL: 'http://localhost:3001/',
            headers: {
                csrf: 'token',
                Authorization: `Bearer ${token}`
            },
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {
        if (error.response) {
            return error.response
        } else {
            return 'Network error'
        }
    }

    get(path, params, callback) {
        return this.service.get(path, {
            params: params, paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then((response) => callback(response ? response.status : 500, response ? response.data : {}));
    }

    delete(path, callback) {
        return this.service.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
        }).then((response) => callback(response ? response.status : 500, response ? response.data : {}));
    }

    post(path, payload, callback) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response ? response.status : 500, response ? response.data : {}));
    }

    put(path, payload, callback) {
        return this.service.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response ? response.status : 500, response ? response.data : {}));
    }
}

export default AxiosService;