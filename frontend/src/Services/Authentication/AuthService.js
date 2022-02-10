import axios from "axios"
import toast from "react-hot-toast";
import { SaveLogin } from "../../Store/Authentication/AuthAction";
import { setCookie } from 'nookies';
import {dayTime} from '../../Utils/CookieTime';
import Router, { useRouter } from "next/router";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export function Authenticate(data) {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${endpoint}/users/login`,
            data
        }).then((response) => {
            setCookie(null, 'token', response.data.token, {
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
    return await axios.get(`${endpoint}/users/revalidate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}