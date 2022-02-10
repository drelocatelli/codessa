import { Container } from "react-bootstrap";
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