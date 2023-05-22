import {Navbar, Container, NavLink, Button} from "react-bootstrap"
import '../styles/style.css'

const NavigationBar = () => {
    return(
        <Navbar>
            <Container className="d-flex justify-content-center">
              <Navbar.Brand href="#home">
                <img
                src="Logo.png"
                width="120"
                height="20"
                alt="React Bootstrap logo"
                />
                </Navbar.Brand>
            </Container>
            <Container className="fontnav">
                <NavLink exact to="/" activeClassName="active">Beranda</NavLink>
                <NavLink to="/tentangkami">Tentang Kami</NavLink>
                <NavLink to="/reservasi">Reservasi</NavLink>
                <NavLink to="/akunsaya">Akun Saya</NavLink>
            </Container>
            <Container className="d-flex justify-content-center">
                <Button variant="warning"  className="signin" size="sm">Sign In</Button>{' '}
                <Button variant="warning" size="sm" className="ms-3 signup">Sign Up</Button>{' '}
            </Container>
        </Navbar>
    )
}

export default NavigationBar


    //   <Container>
    //     <NavLink exact to="/" className="nav-link custom-link" activeClassName="active">
    //       Beranda
    //     </NavLink>
    //     <NavLink to="/tentang-kami" className="nav-link custom-link" activeClassName="active">
    //       Tentang Kami
    //     </NavLink>
    //     <NavLink to="/reservasi" className="nav-link custom-link" activeClassName="active">
    //       Reservasi
    //     </NavLink>
    //     <NavLink to="/akun-saya" className="nav-link custom-link" activeClassName="active">
    //       Akun Saya
    //     </NavLink>
    //   </Container>

    //   dibagian ccs
    //   .custom-link {
    //     color: #B27B0E;
    //    }
