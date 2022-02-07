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
    console.log('Check login permission...');

    const { token } = parseCookies(ctx);

    // verifica se há token e revalida
    if (typeof token != 'undefined') {
        let revalidate = await RevalidateLogin(token);
        if(revalidate.status == 200) {
            return {
                props: {}
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