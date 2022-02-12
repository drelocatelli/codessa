import axios from "axios";
import { parseCookies } from "nookies";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export async function GetAllPosts() {
    return await axios({
            method: 'GET',
            url: `${endpoint}/posts/all`
        });
}

export async function GetPostById(id) {
    return axios({
        method: 'GET',
        url: `${endpoint}/posts/id/${id}`
    });
}

export async function GetAllPostsByUserLoggedIn(ctx) {
    return axios({
        method: 'GET',
        url: `${endpoint}/posts/userLogged`,
        headers: {
            'Authorization': `Bearer ${parseCookies(ctx)['TOKEN_CODESSA']}`
        },
    });
}

export function Post(data) {
    
    return axios({
        method: 'POST',
        url: `${endpoint}/posts/new`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['TOKEN_CODESSA']}`
        },
        data
    });
}