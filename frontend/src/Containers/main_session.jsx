import { parseCookies } from "nookies";
import { Container } from "react-bootstrap";
import { RevalidateLogin } from "../Services/Authentication/AuthService";
import HeaderSession from "./header_session";

export default function MainSession(props) {
    return (
        <>
            <HeaderSession />
            <Container>
                <div style={{marginTop: '50px'}}>
                    {props.children}
                </div>
            </Container>
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    console.log('Revalidate login...');

    const { token } = parseCookies(ctx);

    // verifica se há token e revalida
    if(typeof token != 'undefined') {
        let revalidateLogin = await RevalidateLogin(token);
        if (revalidateLogin.status >= 400)
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
    }


    // se nao houver token
    if(typeof token == 'undefined') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }

}