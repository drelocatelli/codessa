import { Router } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Redirect from "../../Containers/redirect";
import {DestroyLogin} from '../../Store/Authentication/AuthAction';

export default function Page() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        destroyCookie(null, 'token');
        dispatch(DestroyLogin());
    }, []);
    
    return(<Redirect path='/' />);
}