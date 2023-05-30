import { Navbar, Container, NavLink, Button, Modal, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import '../styles/style.css';
import popup from '../assets/img/popup.jpg';

const NavigationBar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleShowSignUp = () => {
    setShowSignIn(false)
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <div>
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
        <Container className="fontnav">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="#tentangkami">Tentang Kami</NavLink>
          <NavLink href="#reservasi">Reservasi</NavLink>
          <NavLink href="/akunsaya">Akun Saya</NavLink>
        </Container>
        <Container className="d-flex justify-content-center">
          <Button variant="warning" className="signin" size="sm" onClick={handleShowSignIn}>
            Sign In
          </Button>{" "}
          <Button variant="warning" size="sm" className="ms-3 signup" onClick={handleShowSignUp}>
            Sign Up
          </Button>{" "}
        </Container>
      </Navbar>

      <Modal show={showSignIn} onHide={handleCloseSignIn} size="lg" centered>
        <Modal.Body className="p-0">
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <div className="modal-fields text-center ms-5 mt-5">
                <form>
                  <div className="mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" style={{ width: "330px", marginLeft:'-22px'}} placeholder="Masukkan Email" />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" style={{ width: "330px", marginLeft:'-22px', marginTop:'40px' }} placeholder="Masukkan Password" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button variant="warning" className="btnpopup" size="sm" onClick={handleCloseSignIn}>
                      Sign In
                    </Button>
                  </div>
                  <div>
                    <h6 className="teks1">
                        <span>Not a member?</span>
                        <Button variant="warning" className="teks" onClick={handleShowSignUp}>Sign Up</Button>
                    </h6>
                  </div>
                </form>
              </div>
            </Col>
            <Col md={6}>
              <div className="modal-image-container">
                <div className="back-button" onClick={handleCloseSignIn}/>
                <img src={popup} alt="Sign Up" className="modal-image1" />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showSignUp} onHide={handleCloseSignUp} size="lg" centered>
        <Modal.Body className="p-0">
          <Row>
            <Col md={6}>
              <div className="modal-image-container">
                <div className="back-button" onClick={handleCloseSignUp}/>
                <img src={popup} alt="Sign Up" className="modal-image" />
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <div  className="modal-fields text-center">
                <form>
                  <div className="mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" style={{ width: "330px", marginLeft:'-22px', marginTop:'35px'}} placeholder="Masukkan Email" />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="phone">Nomor HP</label>
                    <input type="text" className="form-control" id="phone" style={{ width: "330px", marginLeft:'-22px', marginTop:'30px'}} placeholder="Masukkan Nomor HP" />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" style={{ width: "330px", marginLeft:'-22px', marginTop:'30px' }} placeholder="Masukkan Password" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button variant="warning" className="btnpopup" size="sm" onClick={handleCloseSignUp}>
                      Sign Up
                    </Button>
                  </div>
                  <div>
                    <h6 className="teks1 mb-4">
                        <span>Already a member?</span>
                        <Button variant="warning" className="teks" onClick={handleShowSignIn}>Sign In</Button>
                    </h6>
                  </div>
                </form>
                
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavigationBar;
