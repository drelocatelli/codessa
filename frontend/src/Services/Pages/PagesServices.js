import axios from 'axios';
import {ENDPOINT} from '../Service';

export function GetAllPages() {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/pages`
    });
}

export function GetPageById(id) {
    return axios({
        method: 'GET',
        url: `${ENDPOINT}/pages/page/${id}`
    });
}