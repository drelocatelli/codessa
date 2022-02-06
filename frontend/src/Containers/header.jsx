import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {useSelector} from 'react-redux';
import HeaderSession from "./header_session";

export default function Header() {

    const {token} = useSelector(state => {return state.authentication});
    
    if(typeof token != undefined)
        return(<HeaderSession />);
    
    return (
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
                        <Nav.Link href='/admin'>Nova postagem</Nav.Link>
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