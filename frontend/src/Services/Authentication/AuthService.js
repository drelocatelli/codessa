import axios from "axios"
import toast from "react-hot-toast";
import { setCookie } from 'nookies';
import { dayTime } from '../../Utils/CookieTime';
import Router from "next/router";
import { ENDPOINT } from "../Service";
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

export function Authenticate(data) {
    return axios({
        method: 'POST',
        url: `${ENDPOINT}/users/login`,
        data
    }).then((response) => {
        setCookie(null, 'TOKEN_CODESSA', response.data.token, {
            maxAge: dayTime(30),
            secure: true,
            path: '/'
        });
        Router.push('/dashboard');
    }).catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.msg, { id: 'login_error' })
    });
}

export async function RevalidateLogin(token) {
    const axiosInstance = axios.create({
        adapter: fetchAdapter
    });
    return await axiosInstance.get(`${ENDPOINT}/users/revalidate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function Register(data) {
    return await axios.post(`${ENDPOINT}/users/register`, data);
}