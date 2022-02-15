import { Button, Container } from "react-bootstrap";
import MainSession from "../../Containers/main_session";
import { PrivateRoute } from "../../Containers/SessionManagement";
import stylesPosts from '../../../styles/posts.module.css';
import { GetAllPosts } from "../../Services/Posts/PostService";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Parse from "../../Utils/HtmlParse";
import { useState } from "react";

export default function Page(props) {

    let postsRows = props.posts;

    const [posts, setPosts] = useState(postsRows);

    const [morePosts, setMorePosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const [disabledButtonPosts, setDisabledButtonPosts] = useState(false);


    function LoadMore() {

        if (props.posts.count > 1)
            return (
                <>
                    <Button
                        variant='secondary'
                        disabled={disabledButtonPosts}
                        onClick={async () => {
                            if (currentPage === posts.count) {
                                setDisabledButtonPosts(true);
                            }
                            setCurrentPage(currentPage + 1);

                            await GetAllPosts(currentPage)
                                .then(response => {
                                    setMorePosts([...morePosts, ...response.data.posts.rows]);
                                }).catch(err => {
                                    console.log(err);
                                });
                        }}
                    >
                        Carregar mais artigos
                    </Button>
                </>
            );

        return (null);

    }

    return (
        <MainSession>
            <Toaster />
            <Container>
                <h5>Artigos publicados</h5>
                <Posts posts={posts.rows} morePosts={morePosts} />
                <div className={stylesPosts.pagination}>
                        <LoadMore />
                    </div>
            </Container>
        </MainSession>
    );
}

export function Posts({ posts, morePosts }) {
   
    if (posts == null || posts.length == 0)
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
                        <Link href={`/article/${post.id}`}>{post.title}</Link>
                    </h5>
                    <div className={stylesPosts.post_details}>
                        <li><b>Autor:</b> {post.User.name}</li>
                        <li><b>Data:</b> {post.createdAt}</li>
                    </div>
                    <div className={stylesPosts.post_body}>
                        {Parse(post.content.substring(0, 400))}
                    </div>
                </div>

            )
            )}
            {(morePosts.length != 0) ?
                <>
                    {morePosts.map(post => (
                        <div className={stylesPosts.post} key={post.id}>
                            <h5>
                                <Link href={`/article/${post.id}`}>{post.title}</Link>
                            </h5>
                            <div className={stylesPosts.post_details}>
                                <li><b>Autor:</b> {post.User.name}</li>
                                <li><b>Data:</b> {post.createdAt}</li>
                            </div>
                            <div className={stylesPosts.post_body}>
                                {Parse(post.content.substring(0, 400))}
                            </div>
                        </div>
                    ))}
                </>
                : null}
        </div>
    );
}

export async function getServerSideProps(ctx) {

    let posts = await GetAllPosts();

    return {
        ...await PrivateRoute(ctx),
        props: {
            posts: posts.data.posts
        }
    }

}
