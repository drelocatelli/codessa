import { parseCookies } from "nookies";
import { Container } from "react-bootstrap";
import { RevalidateLogin } from "../Services/Authentication/AuthService";
import HeaderSession from "./header_session";
import { PrivateRoute } from "./SessionManagement";

export default function MainSession(props) {
    return (
        <PrivateRoute>
            <HeaderSession />
            <Container>
                <div style={{ marginTop: '50px' }}>
                    {props.children}
                </div>
            </Container>
        </PrivateRoute>
    );
}