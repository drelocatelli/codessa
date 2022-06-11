import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Main from "../../Components/Containers/main";
import { GetPostById } from "../../Services/Posts/PostService";
import Parse, { ParseWithImage } from "../../Utils/HtmlParse";
import stylePostPage from '../../../styles/postPage.module.css'
import { userCheck } from "../../authentication";

export default function Page(props) {

    const { post } = props;
    const route = useRouter();

    if (post == null)
        return (
            <Main>
                <Container>
                    <div style={{ marginTop: '7em' }}>
                        Nenhuma postagem foi encontrada.
                    </div>
                </Container>
            </Main>
        );

    return (
        <Main>
            <Container>
                <div>
                    <div className={stylePostPage.post} key={post.id}>
                        <h5>
                            {post.title}
                        </h5>
                        <div className={stylePostPage.post_details}>
                            <li><b>Autor:</b> {post.user.name}</li>
                            <li><b>Data:</b> {post.createdAt}</li>
                        </div>
                        <div className={stylePostPage.post_body}>
                            {ParseWithImage(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </Main>
    );
}

export const getServerSideProps = userCheck(async (ctx) => {

    let posts = await GetPostById(ctx.query.id);

    return {
        props: { post: posts.data.post }
    }

});