import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Main, { getServerSideProps } from "../Containers/main";
import { GetAllPosts } from "../Services/Posts/PostService";

export default function Page() {

    const { posts } = useSelector(state => { return state.PostReducer });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllPosts());
    }, []);

    if (posts.length === 0)
        return (
            <Main>
                <Container>
                    <div style={{ margin: '50px 30px', background: '#f9f9f9', padding: '12px' }}>
                        Carregando postagens...
                    </div>
                </Container>
            </Main>
        )

    return (
        <Main>
            <Container>
                <div style={{ marginTop: '28px' }}>
                    {posts.map(post => 
                        (
                            <div className="post">
                                <h5>{post.title}</h5>
                                <div className="post-body">
                                    {`${post.content.substring(0, 400)} ...`}
                                </div>
                            </div>

                        )
                    )}

                    <style jsx>{`
                    .post {
                        margin-bottom: 30px;
                        background: #fcfcfc;
                        padding: 15px;
                        border: 1px solid #f0f0f0;
                    }
                    .post-body {
                        word-wrap: break-word;
                    }
                `}</style>
                </div>
            </Container>
        </Main>
    );
}

export { getServerSideProps }