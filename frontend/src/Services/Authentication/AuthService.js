import axios from "axios"
import toast from "react-hot-toast";
import { SaveLogin } from "../../Store/Authentication/AuthAction";
import { setCookie } from 'nookies';
import {dayTime} from '../../Utils/CookieTime';
import Router, { useRouter } from "next/router";
import { ENDPOINT } from "../Service";

export function Authenticate(data) {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${ENDPOINT}/users/login`,
            data
        }).then((response) => {
            setCookie(null, 'TOKEN_CODESSA', response.data.token, {
                maxAge: dayTime(30),
                secure: true,
                path: '/'
            });
            dispatch(SaveLogin(response.data.token));
            Router.push('/dashboard');
        }).catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.msg, {id: 'login_error'})
        });
    }
}

export async function RevalidateLogin(token) {
    return await axios.get(`${ENDPOINT}/users/revalidate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function Register(data) {
    return await axios.post(`${ENDPOINT}/users/register`, data);
}