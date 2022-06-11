import Link from "next/link";
import { userAuth } from "../../../authentication";
import MainSession from "../../../Components/Containers/main_session";
import { Categories } from "../../../Services/Posts/PostService";

export default function Page(props) {

    const {categorie} = props;
    
    console.log(categorie)

    return(
        <MainSession>
            <h5>#{categorie.title}</h5>
            <br />
            {categorie.posts.map(post => (
                <div key={post.id}>
                    <Link href={`/dashboard/article/${post.id}`}>{post.title}</Link>
                </div>
            ))}
        </MainSession>
    )
}

export const getServerSideProps = userAuth(async (ctx) => {

    const response = await Categories(ctx.params.id);

    return {
        props: {
            categorie: response.data.categories
        }
    }
});