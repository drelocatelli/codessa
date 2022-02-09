import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import PostPage from "../../../Components/postPage";
import MainSession from "../../../Containers/main_session";

export default function Page(props) {

    const route = useRouter();

    return(
        <MainSession>
            <Container>
                <PostPage id={route.query.id} />
            </Container>
        </MainSession>
    );
}
