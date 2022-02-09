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
        let revalidate = RevalidateLogin(token);
        if(revalidate.status == 200) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
    }

    return {
        props: { }
    }

}