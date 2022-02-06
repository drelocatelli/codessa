import axios from "axios";
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