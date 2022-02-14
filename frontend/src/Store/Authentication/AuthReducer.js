import { parseCookies } from 'nookies';
import {DestroyLogin, SaveLogin} from './AuthAction';

const INITIAL_STATE = {
    TOKEN_CODESSA: parseCookies().TOKEN_CODESSA ?? undefined,
    USER_DATA: undefined,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SaveLogin.type:
            return {...state, TOKEN_CODESSA: action.payload}
        case DestroyLogin.type: 
            return {...state, TOKEN_CODESSA: undefined};
        default:
            return state;
    }
}