import axios from "axios"

export const axiosInst = axios.create({
    baseURL: `${process.env.DOMAIN_URL}:${process.env.PORT}/api/`,
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
})