import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function HeaderSession() {

    const [userLogged, setUserLogged] = useState(undefined);

    useEffect(() => {
        const userLoggedIn = parseCookies()['userLoggedIn'];

        setUserLogged(JSON.parse(userLoggedIn))

    }, []);

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href='/dashboard'>Codessa</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/dashboard/'>Pagina Inicial</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Meu painel" id="basic-nav-dropdown">
                            {/* <NavDropdown.Item href="/dashboard/postar">Criar artigo</NavDropdown.Item> */}
                            <NavDropdown.Item href="/dashboard/meu_conteudo">Meus artigos</NavDropdown.Item>
                            {(typeof userLogged != 'undefined' && userLogged.permissions == 'ADMIN') ?
                                (
                                    <NavDropdown.Item href="/dashboard/administrar">Administrar</NavDropdown.Item>
                                )
                                : null}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/dashboard/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}