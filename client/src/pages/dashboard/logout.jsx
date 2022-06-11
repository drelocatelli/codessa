import { destroyCookie } from "nookies";
import { useEffect } from "react";
import Redirect from "../../Components/Containers/redirect";

export default function Page() {

    
    useEffect(() => {
        destroyCookie(null, 'TOKEN_CODESSA', {
            path: '/'
        });
    }, []);
    
    return(<Redirect path='/' />);
}