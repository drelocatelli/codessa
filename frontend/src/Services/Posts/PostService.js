import axios from "axios";
import { parseCookies } from "nookies";
import {ENDPOINT} from '../Service';

export async function GetAllPosts() {
    return await axios({
            method: 'GET',
            url: `${ENDPOINT}/posts/all`
        });
}

export async function GetPostById(id) {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/posts/id/${id}`
    });
}

export async function GetAllPostsByUserLoggedIn(ctx) {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/posts/userLogged`,
        headers: {
            'Authorization': `Bearer ${parseCookies(ctx)['TOKEN_CODESSA']}`
        },
    });
}

export function Post(data) {
    
    return axios({
        method: 'POST',
        url: `${ENDPOINT}/posts/new`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['TOKEN_CODESSA']}`
        },
        data
    });
}