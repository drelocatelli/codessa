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
        RevalidateLogin(token)
            .then(response => {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                    }
                }
            }).catch(err => {
                console.log('Não foi possivel autenticar com o token informado')
            });
    }

    return {
        props: { }
    }

}