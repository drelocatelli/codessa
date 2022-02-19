import { Button, Container } from "react-bootstrap";
import MainSession from "../../Containers/main_session";
import stylesPosts from '../../../styles/posts.module.css';
import { GetAllPosts } from "../../Services/Posts/PostService";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Parse from "../../Utils/HtmlParse";
import { useState } from "react";

export default function Page(props) {

    const {posts} = props;

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

                            await GetAllPosts(currentPage + 1)
                                .then(response => {
                                    let rowsLength = response.data.posts.rows.length;
                                    if (rowsLength == 0) {
                                        setDisabledButtonPosts(true);
                                        toast.error('Não há mais artigos para carregar', {id:'post-loading'});
                                    }
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
                <Posts posts={posts.rows} />
                <MorePosts morePosts={morePosts} />
                <div className={stylesPosts.pagination}>
                    <LoadMore />
                </div>
            </Container>
        </MainSession>
    );
}

export function MorePosts({ morePosts }) {
    return (<>
        {(morePosts.length != 0) ?
            <>
                {morePosts.map(post => (
                    <div className={stylesPosts.post} key={post.id}>
                        <h5>
                            <Link href={`/dashboard/article/${post.id}`}>{post.title}</Link>
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
                        <Link href={`/dashboard/article/${post.id}`}>{post.title}</Link>
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
        props: {
            posts: posts.data.posts
        }
    }

}
