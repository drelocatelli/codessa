import Link from 'next/link';
import { Container } from 'react-bootstrap';
import MainSession from '../../Containers/main_session';
import { PrivateRoute } from '../../Containers/SessionManagement';
import { GetAllPostsByUserLoggedIn } from '../../Services/Posts/PostService';
import stylesPosts from '../../../styles/posts.module.css';

export default function Page(props) {

    const {posts} = props;
    
    return(
        <MainSession>
            <Container>
                <div style={{marginTop: '8em'}}>
                    <h5>Meu conteúdo</h5>
                    <Posts posts={posts} />
                </div>
            </Container>
        </MainSession>
    );
}

export function Posts({ posts }) {
    if (posts.length == 0)
        return (
            <div style={{ margin: '50px 30px', background: '#f9f9f9', padding: '12px' }}>
                Nenhuma postagem foi encontrada.
            </div>
        );

    return (
        <div style={{ marginTop: '28px' }}>
            {posts.map(post =>
            (
                <div className={stylesPosts.post} key={post.id}>
                    <h5>
                        <Link href={`/dashboard/article/${post.id}`}>{post.title}</Link>
                    </h5>
                    <div className={stylesPosts.post_details}>
                        <li><b>Autor:</b> {post.author}</li>
                        <li><b>Data:</b> {post.createdAt}</li>
                    </div>
                    <div className={stylesPosts.post_body}>
                        {`${post.content.substring(0, 400)} ...`}
                    </div>
                </div>

            )
            )}
        </div>
    );
}

export async function getServerSideProps(ctx) {

    let posts = await GetAllPostsByUserLoggedIn(ctx);
    
    return {
        ...await PrivateRoute(ctx),
        props: {
            posts: posts.data.posts    
        }
    };
    
}
