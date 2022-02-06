import { Container } from "react-bootstrap";
import Main from "../../Containers/main";

export default function Page() {
    return(
        <Main>
            <Container>
                <div className='container'>
                    Aqui o formulario de login
                </div>
            </Container>
            <style jsx>{`
                .container {
                    display: flex;
                    flex-flow: column wrap;
                    place-content: center flex-end;
                    height: 80vh;
                    justify-content: center;
                }
            `}</style>
        </Main>
    );
}