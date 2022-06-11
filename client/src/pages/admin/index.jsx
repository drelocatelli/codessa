import { Container, Form, Button } from "react-bootstrap";
import Main from "../../Components/Containers/main";
import { useForm } from "react-hook-form";
import { Authenticate } from "../../Services/Authentication/AuthService";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { userCheck } from "../../authentication";
import { setCookie } from "nookies";

export default function Page() {

    const route = useRouter();

    const { handleSubmit, register } = useForm();

    function login(data) {
        let isDataEmpty = Object.values(data).some(x => x === '' || x === null);

        if (!isDataEmpty) {
            try {
                const response = Authenticate(data);
                setCookie(null, 'TOKEN_CODESSA', response.data.token, {
                    maxAge: dayTime(30),
                    secure: true,
                    path: '/'
                });
                route.push('/dashboard');
            } catch (err) {
                console.log(err)
                // toast.error(err.response.data.msg, { id: 'login_error' })
            }
        } else {
            toast.error('Campos não podem ser nulos!', { id: 'null_fields' });
        }
    }

    return (
        <>
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
                            <div style={{ textAlign: 'center' }}>
                                <Link href={`${route.asPath}/register`}>Solicitar acesso</Link>
                            </div>
                            <br />
                            <div style={{ textAlign: 'center' }}>
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
                    justify-content: center;
                }
            `}</style>
            </Main>
        </>
    );
}

export const getServerSideProps = userCheck(async (ctx) => {
    return {
        props: {
        }
    }
});