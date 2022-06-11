import Link from "next/link";
import { Container } from "react-bootstrap";
import { userCheck } from "../../authentication";
import Main from "../../Components/Containers/main";
import { Categories } from "../../Services/Posts/PostService";

export default function Page(props) {

    const {categorie} = props;

    return (
        <Main>
            <Container>
                <h5>#{categorie.title}</h5>
                <br />
                {categorie.posts.map(post => (
                    <div key={post.id}>
                        <Link href={`/article/${post.id}`}>{post.title}</Link>
                    </div>
                ))}
            </Container>
        </Main>
    );
}

export const getServerSideProps = userCheck(async (ctx) => {

    const response = await Categories(ctx.query.id);

    return {
        props: {
            categorie: response.data.categories
        }
    }
});