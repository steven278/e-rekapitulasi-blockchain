import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Pemilu2019 from '../assets/pemilu.jpeg'

const MyNavbar = () => {
    return (
        <Navbar bg="danger" expand="lg" variant="dark" onClick={() => window.location.reload(false)}>
            <Container>
                <Navbar.Brand href="#home">
                <img src={Pemilu2019} style={{width: '1.25rem', margin: '0 1rem 0 0'}} alt="" />
                    E-Rekapitulasi KPU
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;