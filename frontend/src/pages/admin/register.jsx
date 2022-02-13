import { useRouter } from "next/router";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Main from "../../Containers/main";
import { LoadSession } from "../../Containers/SessionManagement";
import { Register } from "../../Services/Authentication/AuthService";

export default function Page() {

    const route = useRouter();

    const {handleSubmit, register} = useForm();

    function registration(data) {
        let isAnyFieldNull = Object.values(data).some(i => i == null || i == '');
        
        if(!isAnyFieldNull) {
            if(data.password == data.check_password) {
                // pode registrar
                data = {
                    name: data.name,
                    username: data.username,
                    password: data.password
                }
                Register(data)
                    .then((response) => {
                        route.push('/admin');
                        toast.success(response.data.msg, {id: 'register_success'});
                    }).catch(err => {
                        console.log(err.response)
                        toast.error(`${err.response.data.msg} : usuário já existe`, {id: 'register_error'});

                    });
            }else {
                toast.error('Senhas não combinam!', {id: 'register_error'});
            }
        } else {
            toast.error('Preencha os campos nulos!', {id: 'register_error'});
        }

    }
    
    return (
        <Main>
            <Toaster />
            <Container>
                <div className="container">
                    <h3>Solicitar acesso</h3> <br />
                    <form onSubmit={handleSubmit(registration)}>
                        <Form.Group>
                            <Form.Control {...register('name')} type='text' placeholder='Seu nome' />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control {...register('username')} type='text' placeholder='Usuário' />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control {...register('password')} type='password' placeholder='*******' />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Repita a senha</Form.Label>
                            <Form.Control {...register('check_password')} type='password' placeholder='*******' />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Button type="submit">Registrar-se</Button>
                        </Form.Group>
                    </form>
                </div>
                <style jsx>{`
                .container {
                    display: flex;
                    flex-flow: column wrap;
                    place-content: center flex-end;
                    height: 80vh;
                    justify-content: center;
                }
            `}</style>
            </Container>
        </Main>
    );

}

export async function getServerSideProps(ctx) {

    // console.log(ctx.req.url);

    return {
        ...await LoadSession(ctx),
        props: {}
    }

}