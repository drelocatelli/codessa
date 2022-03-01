import { Container } from "react-bootstrap";
import Main from "../../Containers/main";
import stylePostPage from '../../../styles/postPage.module.css'
import Parse, { ParseWithImage } from "../../Utils/HtmlParse";
import { GetPageById } from "../../Services/Pages/PagesServices";

export default function Page(props) {

    const {page} = props;
    
    return (
        <Main>
            <Container>
                <div>
                    <div className={stylePostPage.post} key={page.id}>
                        <h5>
                            {page.title}
                        </h5>
                        <div className={stylePostPage.post_details}>
                            <li><b>Autor:</b> {page.User.name}</li>
                            <li><b>Data:</b> {page.updatedAt}</li>
                        </div>
                        <div className={stylePostPage.post_body}>
                            {ParseWithImage(page.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </Main>
    );
}

export async function getServerSideProps(ctx) {

    const page = await GetPageById(ctx.query.id);

    if(page.data.page == null)
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }

    return {
        props: { page: page.data.page }
    }

}