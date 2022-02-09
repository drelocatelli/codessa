import Link from "next/link";
import { useEffect, useState } from "react";
import { GetAllPosts } from "../Services/Posts/PostService";

export default function Posts() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        let getAllPosts = await GetAllPosts();
        setPosts(getAllPosts.data.posts)
    }

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
                <div className="post" key={post.id}>
                    <h5>
                        <Link href={`/dashboard/post/${post.id}`}>{post.title}</Link>
                    </h5>
                    <div className='post-details'>
                        <li><b>Autor:</b> {post.author}</li>
                        <li><b>Data:</b> {post.createdAt}</li>
                    </div>
                    <div className="post-body">
                        {`${post.content.substring(0, 400)} ...`}
                    </div>
                </div>

            )
            )}

            <style jsx>{`
                    .post h5 a{
                        color: #0d6efd;
                    }
                    .post {
                        margin-bottom: 30px;
                        background: #fcfcfc;
                        padding: 15px;
                        border: 1px solid #f0f0f0;
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
    );
}