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
    });
}

export async function RevalidateLogin(token) {
    return await axios.get(`${ENDPOINT}/users/revalidate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function Register(data) {
    return await axios.post(`${ENDPOINT}/users/register`, data);
}