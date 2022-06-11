import Link from "next/link";
import { userAuth } from "../../../authentication";
import MainSession from "../../../Components/Containers/main_session";
import { Categories } from "../../../Services/Posts/PostService";

export default function Page(props) {

    const { posts } = props;

    return (
        <MainSession>
            <h1>Posts por tags:</h1>
            {posts.map(post => (
                <span key={post.id}><Link  href={`/dashboard/categories/${post.id}`}>{post.title}</Link> &nbsp;</span>
            ))}
        </MainSession>
    );
}


export const getServerSideProps = userAuth(async (ctx) => {

    const response = await Categories();

    return {
        props: {
            posts: response.data.categories
        }
    }
});