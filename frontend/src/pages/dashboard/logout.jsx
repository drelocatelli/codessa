import { Router } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import Redirect from "../../Containers/redirect";

export default function Page() {

    useEffect(() => {
        destroyCookie(null, 'token');
    }, []);
    
    return(<Redirect path='/' />);
}