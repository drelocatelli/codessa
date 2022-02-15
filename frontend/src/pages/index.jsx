import { Button, Container, Pagination } from "react-bootstrap";
import Main from "../Containers/main";
import styles from '../../styles/indexPage.module.css';
import stylesPosts from '../../styles/posts.module.css';
import { GetAllPosts } from "../Services/Posts/PostService";
import Link from "next/link";
import { LoadSession } from "../Containers/SessionManagement";
import Parse from "../Utils/HtmlParse";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page(props) {

    let postsRows = props.posts;

    const [posts, setPosts] = useState(postsRows);

    const [morePosts, setMorePosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [disabledButtonPosts, setDisabledButtonPosts] = useState(false);

    function LoadMore() {

        if (props.posts.count > 1)
            return (
                <>
                    <Button
                        variant='secondary'
                        disabled={disabledButtonPosts}
                        onClick={async () => {
                            setCurrentPage(currentPage + 1);
                            if (currentPage < props.posts.count) {
                                setDisabledButtonPosts(true);
                            }
                            console.log(currentPage)

                            await GetAllPosts(currentPage + 1)
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
        <Main>
            <Toaster />
            <Container>
                <div className={styles.profile}>
                    <div className={styles.body}>
                        <h1>Codessa</h1>
                        <hr />
                        A passionate fullstack developer from Brazil. <br />
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        <br /><br />
                        <a href="#">Github</a>
                    </div>
                    <div>
                        <img src='https://github.com/drelocatelli.png' />
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>Artigos</h2>
                    <Posts posts={posts.rows}  />
                    <MorePosts morePosts={morePosts} />
                    <div className={stylesPosts.pagination}>
                        <LoadMore />
                    </div>
                </div>
            </Container>
        </Main>
    )

}

export function MorePosts({ morePosts }) {
    return (<>
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
    </>);
}

export function Posts({ posts }) {

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

        </div>
    );
}

export async function getServerSideProps(ctx) {

    let posts = await GetAllPosts();

    return {
        ...await LoadSession(ctx),
        props: { posts: posts.data.posts }
    }

}