import { Container } from 'react-bootstrap';
import MainSession, {getServerSideProps} from '../../Containers/main_session';
import MyPosts from '../../Components/myPosts';

export default function Page() {
    return(
        <MainSession>
            <Container>
                <h5>Meu conteúdo</h5>
                <MyPosts />
            </Container>
        </MainSession>
    );
}

export {getServerSideProps}