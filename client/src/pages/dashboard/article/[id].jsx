import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import MainSession from "../../../Components/Containers/main_session";
import { GetPostById } from "../../../Services/Posts/PostService";
import stylePostPage from '../../../../styles/postPage.module.css'
import Parse, { ParseWithImage } from "../../../Utils/HtmlParse";
import { userAuth } from "../../../authentication";

export default function Page(props) {

    const { post } = props;

    console.log(post)

    if (post == null)
        return (
            <MainSession>
                <Container>
                    Nenhuma postagem foi encontrada.
                </Container>
            </MainSession>
        );

    return (
        <MainSession>
            <Container>
                <div className={stylePostPage.post} key={post.id}>
                    <h5>
                        {post.title}
                    </h5>
                    <div className={stylePostPage.post_details}>
                        <li><b>Autor:</b> {post.user.name}</li>
                        <li><b>Data:</b> {post.createdAt}</li>
                        <li><b>Categoria:</b> {post.categorie.title} </li>
                    </div>
                    <div className={stylePostPage.post_body}>
                        {ParseWithImage(post.content)}
                    </div>
                </div>
            </Container>
        </MainSession>
    );
}


export const getServerSideProps = userAuth(async (ctx) => {

    let posts = await GetPostById(ctx.query.id);

    return {
        props: {
            post: posts.data.post,
        }
    };

});
