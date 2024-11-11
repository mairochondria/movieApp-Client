import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink} from 'react-router-dom';
import UserContext from "../context/UserContext";

export default function AppNavBar() {

    const {user} = useContext(UserContext);

    // const [user, setUser] = useState(localStorage.getItem("token"));

    return (
        <Navbar expand="lg" className="bg-primary">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">Movie App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user.id !== null && (
                            <Nav.Link as={NavLink} to="/movies" exact="true">Movies</Nav.Link>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {user.id !== null ? (
                            <>
                                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}