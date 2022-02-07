import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import PostPage from "../../Components/postPage";
import Main, {getServerSideProps} from "../../Containers/main";

export default function Page(props) {

    const route = useRouter();

    return(
        <Main>
            <Container>
                <PostPage id={route.query.id} />
            </Container>
        </Main>
    );
}

export {getServerSideProps}