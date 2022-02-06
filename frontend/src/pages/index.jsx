import { Container } from "react-bootstrap";
import Posts from "../Components/posts";
import Main, { getServerSideProps } from "../Containers/main";

export default function Page() {

    return (
        <Main>
            <Container>
                <Posts />
            </Container>
        </Main>
    )

}

export { getServerSideProps }