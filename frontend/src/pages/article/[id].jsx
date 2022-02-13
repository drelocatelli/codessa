import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Main from "../../Containers/main";
import { LoadSession } from "../../Containers/SessionManagement";
import { GetPostById } from "../../Services/Posts/PostService";

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
                <div style={{ marginTop: '7em' }}>
                    <div className="post" key={post.id}>
                        <h5>
                            {post.title}
                        </h5>
                        <div className='post-details'>
                            <li><b>Autor:</b> {post.User.name}</li>
                            <li><b>Data:</b> {post.createdAt}</li>
                        </div>
                        <div className="post-body">
                            {post.content}
                        </div>
                    </div>

                    <style jsx>{`
                    .post {
                        margin-bottom: 30px;
                        background: #f8f9fa;
                        padding: 15px;
                        border: 1px solid transparent;
                    }
                    .post-body {
                        word-wrap: break-word;
                    }
                    .post-details {
                        font-size: 12px;
                        border-top: 1px solid #ccc;
                        padding-top: 10px;
                        color: #949494;
                        margin-bottom: 25px;
                    }
                    .post-details li {
                        list-style:none;
                        display: inline;
                        margin-right: 10px;
                    }
                `}</style>
                </div>
            </Container>
        </Main>
    );
}

export async function getServerSideProps(ctx) {

    let posts = await GetPostById(ctx.query.id);

    return {
        ...await LoadSession(ctx),
        props: { post: posts.data.post }
    }

}