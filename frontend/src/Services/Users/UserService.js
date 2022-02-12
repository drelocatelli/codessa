import axios from "axios";
import { parseCookies } from "nookies";
import { ENDPOINT } from "../Service";

export async function GetAllUsers(ctx) {
    return await axios({
        method: 'GET',
        url: `${ENDPOINT}/users/get`,
        headers: {
            'Authorization': `Bearer ${parseCookies(ctx)['TOKEN_CODESSA']}`
        }
    });
}