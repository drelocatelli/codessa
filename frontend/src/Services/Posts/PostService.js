import axios from "axios";
import { parseCookies } from "nookies";
import { setPosts } from "../../Store/Posts/PostAction";
import { endpoint } from "../Service";

export function GetAllPosts() {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: `${endpoint}/posts/all`
        }).then((response) => {
            dispatch(setPosts(response.data.posts));
        }).catch(err => {
            console.log(err.response);
        });
    }
}

export function Post(data) {
    
    return axios({
        method: 'POST',
        url: `${endpoint}/posts/new`,
        headers: {
            'Authorization': `Bearer ${parseCookies()['token']}`
        },
        data
    });
}