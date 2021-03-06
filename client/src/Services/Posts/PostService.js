import axios from "axios";
import { parseCookies } from "nookies";
import {ENDPOINT} from '../Service';

export async function GetAllPosts(page = 0) {
    return await axios({
            method: 'GET',
            url: `${ENDPOINT}/posts/all/page/${page}`
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

export function GetAllCategories() {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/posts/categorie/all`,
    });
} 

export function NewCategorie(data) {
    return axios({
        method: 'POST',
        url: `${ENDPOINT}/posts/categorie/new`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['TOKEN_CODESSA']}`
        },
        data
    });
} 

export function Categories(id = '') {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/posts/categorie/${id}`,
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

export function UpdatePost(data, id) {
    return axios({
        method: 'PUT',
        url: `${ENDPOINT}/posts/id/${id}`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['TOKEN_CODESSA']}`
        },
        data
    });
}

export function DeletePost(id) {
    return axios({
        method: 'DELETE',
        url: `${ENDPOINT}/posts/id/${id}`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['TOKEN_CODESSA']}`
        }
    });
}