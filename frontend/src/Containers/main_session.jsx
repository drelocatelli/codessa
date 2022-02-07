import { parseCookies } from "nookies";
import { Container } from "react-bootstrap";
import { RevalidateLogin } from "../Services/Authentication/AuthService";
import HeaderSession from "./header_session";

export default function MainSession(props) {
    return (
        <>
            <HeaderSession />
            <Container>
                <div style={{ marginTop: '50px' }}>
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
    if (typeof token != 'undefined') {
        RevalidateLogin(token)
            .then(response => {
                return {
                    props: {}
                }
            }).catch(err => {
                console.log('Não foi possivel autenticar com o token informado');
            });
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }


}