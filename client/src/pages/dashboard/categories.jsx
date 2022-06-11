import Link from "next/link";
import { userAuth } from "../../authentication";
import MainSession from "../../Components/Containers/main_session";
import { Categories } from "../../Services/Posts/PostService";

export default function Page(props) {

    const {posts} = props;
    
    return(
        <MainSession>
            {posts.map(post => (
                <li key={post.categorie.id}>
                    <Link href={`/dashboard/categorie/${post.categorie.id}`}>{post.categorie.title}</Link>
                </li>
            ))}
        </MainSession>
    );
}


export const getServerSideProps = userAuth(async (ctx) => {
    
    const response = await Categories();

    return {
        props: {
            posts: response.data.posts
        }
    }
});