import { parseCookies } from 'nookies';
import {DestroyLogin, SaveLogin} from './AuthAction';

const INITIAL_STATE = {
    token: parseCookies().token ?? undefined,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SaveLogin.type:
            return {...state, token: action.payload}
        case DestroyLogin.type: 
            return {...state, token: undefined};
        default:
            return state;
    }
}