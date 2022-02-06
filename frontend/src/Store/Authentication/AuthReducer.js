import {SaveLogin} from './AuthAction';

const INITIAL_STATE = {
    token: undefined
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SaveLogin.type:
            return {...state, token: action.payload}
        default:
            return state;
    }
}