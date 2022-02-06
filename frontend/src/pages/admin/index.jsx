import { Container, Form, Button } from "react-bootstrap";
import Main, {getServerSideProps} from "../../Containers/main";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Authenticate } from "../../Services/Authentication/AuthService";
import { Toaster, toast } from "react-hot-toast";

export default function Page() {

    const dispatch = useDispatch();
    const {authentication} = useSelector(state => {return state});
    const {handleSubmit, register} = useForm();

    function login(data) {
        let isDataEmpty = Object.values(data).some(x => x === '' || x === null);

        if(!isDataEmpty) {
            dispatch(Authenticate(data));
        }else {
            toast.error('Campos não podem ser nulos!');
        }
    }
    
    return (
        <Main>
            <Toaster />
            <Container>
                <div className='container'>
                    <h3>Área administrativa</h3> <br />
                    <form onSubmit={handleSubmit(login)}>
                        <Form.Group>
                            <Form.Control {...register('username')} type="text" placeholder="Usuário" />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control {...register('password')} type="password" placeholder="****" />
                        </Form.Group>
                        <br />
                        <div style={{textAlign: 'center'}}>
                            <Form.Group>
                                <Button variant="primary" type="submit">Fazer login</Button>
                            </Form.Group>
                        </div>
                    </form>
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

export {getServerSideProps}