import { parseCookies } from "nookies";
import { RevalidateLogin } from "../Services/Authentication/AuthService";
import Header from "./header";

export default function Main(props) {

    return (
        <>
            <Header/>

            {props.children}
        </>
    );

}

export const getServerSideProps = async (ctx) => {
    console.log('Revalidate login...');

    const { token } = parseCookies(ctx);

    if(typeof token != 'undefined') {
        let revalidateLogin = await RevalidateLogin(token);
        if (revalidateLogin.status >= 200 && revalidateLogin.status <= 226)
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
    }


    return {
        props: {

        }
    }

}