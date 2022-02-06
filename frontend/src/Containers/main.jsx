import { parseCookies } from "nookies";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RevalidateLogin } from "../Services/Authentication/AuthService";

export default function Main(props) {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href='/'>Codessa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Página inicial</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>

                        </Nav>
                        <Nav>
                            <Nav.Link href='/admin'>criar conteúdo</Nav.Link>
                        </Nav>
                        {/* <Nav>
                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/registro">Criar conta</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {props.children}
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    console.log('Revalidate login...');

    const { token } = parseCookies(ctx);

    if(typeof token != 'undefined') {
        let revalidateLogin = await RevalidateLogin(token);
        if (revalidateLogin.status >= 200 && revalidateLogin.status <= 226)
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
    }


    return {
        props: {

        }
    }

}