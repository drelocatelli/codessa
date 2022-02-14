import Link from "next/link";
import { Container, Nav, Navbar, NavDropdown, TabContent } from "react-bootstrap";

export default function HeaderSession() {
    return(
        <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand href='/dashboard'>Codessa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/dashboard/meusPosts'>Meu conteúdo</Nav.Link>
                            <Nav.Link href='/dashboard/colaboradores'>Colaboradores</Nav.Link>
                            <Nav.Link href='/dashboard/postar'>Criar artigo</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href='/dashboard/logout'>Logout</Nav.Link>
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
    );
}