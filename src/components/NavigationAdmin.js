import { Navbar, Container, NavLink, Button } from "react-bootstrap";
import React, { useState } from "react";
import '../styles/style.css';

const NavigationAdmin= () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Navbar>
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/">
            <img
              src="Logo.png"
              width="120"
              height="20"
              alt="logo"
            />
          </Navbar.Brand>
        </Container>
        <Container className={`fontnav ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="#tentangkami">Tentang Kami</NavLink>
          <NavLink href="#reservasi">Reservasi</NavLink>
          <NavLink href="/akunsaya">Akun Saya</NavLink>
        </Container>
        <Container className="d-flex justify-content-center">
          <Button variant="warning" className="signin" size="sm" onClick={handleToggleSidebar}>
            Sign In
          </Button>{" "}
          <Button variant="warning" size="sm" className="ms-3 signup" onClick={handleToggleSidebar}>
            Sign Up
          </Button>{" "}
        </Container>
      </Navbar>

    </div>
  );
};

export default NavigationAdmin;
