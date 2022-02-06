import { setPosts } from "./PostAction";

const INITIAL_STATE = {
    posts: []
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case setPosts.type: 
            return {...state, posts: action.payload}
        default:
            return state;
    }
}