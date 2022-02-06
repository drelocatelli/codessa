import axios from "axios"
import toast from "react-hot-toast";
import { SaveLogin } from "../../Store/Authentication/AuthAction";
import { endpoint } from "../Service"
import { setCookie } from 'nookies';
import {dayTime} from '../../Utils/CookieTime';
import Router, { useRouter } from "next/router";

export function Authenticate(data) {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${endpoint}/users/login`,
            data
        }).then((response) => {
            setCookie(null, 'token', response.data.token, {
                maxAge: dayTime(30),
                secure: true
            });
            dispatch(SaveLogin(response.data.token));
            Router.push('/dashboard');
        }).catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.msg)
        });
    }
}

export function RevalidateLogin(token) {
    return axios({
        method: 'GET',
        url: `${endpoint}/users/revalidate`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}