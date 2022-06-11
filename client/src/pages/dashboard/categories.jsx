import Link from "next/link";
import { userAuth } from "../../authentication";
import MainSession from "../../Components/Containers/main_session";
import { Categories } from "../../Services/Posts/PostService";

export default function Page(props) {

    const {categories} = props;
    
    console.table(categories)

    // return(null)

    return(
        <MainSession>
            {categories.map(category => (
                <li key={category.id}>
                    <Link href={`/dashboard/categorie/${category.id}`}>{category.title}</Link>
                </li>
            ))}
        </MainSession>
    );
}


export const getServerSideProps = userAuth(async (ctx) => {
    
    const response = await Categories();

    return {
        props: {
            categories: response.data.categories
        }
    }
});