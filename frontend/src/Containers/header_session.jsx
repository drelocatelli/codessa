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
                            <Nav.Link href='/dashboard/'>Pagina Inicial</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Meu painel" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item href="/dashboard/postar">Criar artigo</NavDropdown.Item> */}
                                <NavDropdown.Item href="/dashboard/meu_conteudo">Meu conteúdo</NavDropdown.Item>
                                <NavDropdown.Item href="/dashboard/colaboradores">Colaboradores</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/dashboard/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}