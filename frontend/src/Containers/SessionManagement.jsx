import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Redirect from "../Components/redirect";
import { RevalidateLogin } from "../Services/Authentication/AuthService";

// redirect if user already logged in
export function RedirectUserLoggedIn({ children }) {

    const [isAuth, setIsAuth] = useState(undefined);
    const { token } = useSelector((state) => { return state.authentication });

    useEffect(() => {
        revalidate();
    }, []);

    //! revalidate token

    async function revalidate() {
        if (typeof token != 'undefined') {
            let revalidate = await RevalidateLogin(token);
            if (revalidate.status == 200) {
                setIsAuth(true);
                return;
            }
        }
        setIsAuth(false);
        return;
    }

    
    if(isAuth == true)
    return(<Redirect path='/dashboard' />);

    if(isAuth == false)
        return(<>{children}</>);
    
    return(null);

}


// redirect if user not logged
export function PrivateRoute({ children }) {

    const [isAuth, setIsAuth] = useState(undefined);
    const { token } = useSelector((state) => { return state.authentication });

    useEffect(() => {
        revalidate();
    }, []);

    //! revalidate token

    async function revalidate() {
        if (typeof token != 'undefined') {
            let revalidate = await RevalidateLogin(token);
            if (revalidate.status == 200) {
                setIsAuth(true);
                return;
            }
        }
        setIsAuth(false);
        return;
    }

    if(isAuth == true)
        return(<>{children}</>);
    
    if(isAuth == false)
        return(<Redirect path='/' />);
    
    return(null);


}