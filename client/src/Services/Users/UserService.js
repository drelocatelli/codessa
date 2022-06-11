import axios from "axios";
import { parseCookies } from "nookies";
import { ENDPOINT } from "../Service";

export async function GetAllUsers(ctx) {
    return await axios({
        method: 'GET',
        url: `${ENDPOINT}/users/getNotMe`,
        headers: {
            'Authorization': `Bearer ${parseCookies(ctx)['TOKEN_CODESSA']}`
        }
    });
}

export async function SetPermission(token, id, permission) {
    return await axios({
        method: 'POST',
        url: `${ENDPOINT}/users/permission`,
        data: {
            id,
            permission
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}