import Link from "next/link";
import { Container } from "react-bootstrap";
import { userCheck } from "../../authentication";
import Main from "../../Components/Containers/main";
import { Categories } from "../../Services/Posts/PostService";

export default function Page(props) {

    const { posts } = props;

    return (
        <Main>
            <Container>
                <h1>Posts por tags:</h1>
                {posts.map(post => (
                    <span key={post.id}><Link href={`categories/${post.id}`}>{post.title}</Link> &nbsp;</span>
                ))}
            </Container>
        </Main>
    );
}

export const getServerSideProps = userCheck(async (ctx) => {

    const response = await Categories();

    return {
        props: {
            posts: response.data.categories
        }
    }
});