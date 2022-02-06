import { Container } from "react-bootstrap";
import Posts from "../../Components/posts";
import MainSession from "../../Containers/main_session";

export default function Page() {
    return(
        <MainSession>
            <Container>
                <Posts />
            </Container>
        </MainSession>
    );
}