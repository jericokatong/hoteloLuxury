import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img/image1.jpg";
import image2 from "../assets/img/image2.jpg";
import image3 from "../assets/img/image3.jpg";
import "../styles/tentangkami.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import popup from "../assets/img/popup.jpg";

const images = [image1, image2, image3];

const JenisKamar = ({
  email,
  setEmail,
  noHp,
  setNoHp,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  showSignIn,
  showSignUp,
  showProfile,
  setShowProfile,
  navigate,
  register,
  login,
  logout,
  handleShowSignIn,
  handleCloseSignIn,
  handleShowSignUp,
  handleCloseSignUp,
  handleShowProfile,
  handleCloseProfile,
}) => {
  const titles = ["STANDARD ROOM", "SUPERIOR ROOM", "DELUXE ROOM"];
  const cardText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <div>
      <Row className="justify-content-center" style={{ marginTop: "20px", paddingBottom: "38px", marginLeft: "45px" }}>
        {images.map((image, index) => (
          <Col key={index} style={{ marginBottom: "20px" }}>
            <Card className="cardCustom" style={{ width: "280px" }}>
              <Card.Img variant="top" src={image} style={{ padding: "10px" }} />
              <Card.Body>
                <Card.Title style={{ fontSize: "16px", marginTop: "-6px" }}>{titles[index]}</Card.Title>
                <Card.Text className="mt-2" style={{ fontSize: "13px" }}>
                  {cardText}
                </Card.Text>
                {isLogin && (
                  <div className="d-flex justify-content-center mb-2 mt-2">
                    <Button onClick={() => navigate("/pesankamar")} variant="warning" size="sm" className="ms-2 booknow">
                      Book Sekarang
                    </Button>{" "}
                  </div>
                )}
                {!isLogin && (
                  <div className="d-flex justify-content-center mb-2 mt-2">
                    <Button variant="warning" className="ms-2 booknow" size="sm" onClick={handleShowSignIn}>
                      Book Sekarang
                    </Button>{" "}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showSignIn} onHide={handleCloseSignIn} size="lg" centered>
        <Modal.Body className="p-0">
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <div className="modal-fields text-center ms-5 mt-5">
                <form onSubmit={login}>
                  <div className="mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="emailJeniKamar" style={{ width: "330px", marginLeft: "-22px" }} placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      style={{ width: "330px", marginLeft: "-22px", marginTop: "40px" }}
                      placeholder="Masukkan Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button variant="warning" className="btnpopup" size="sm" type="submit">
                      Sign In
                    </Button>
                  </div>
                  <div>
                    <h6 className="teks1">
                      <span>Not a member?</span>
                      <Button variant="warning" className="teks" onClick={handleShowSignUp}>
                        Sign Up
                      </Button>
                    </h6>
                  </div>
                </form>
              </div>
            </Col>
            <Col md={6}>
              <div className="modal-image-container">
                <div className="back-button" onClick={handleCloseSignIn} />
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
                <div className="back-button" onClick={handleCloseSignUp} />
                <img src={popup} alt="Sign Up" className="modal-image" />
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <div className="modal-fields text-center">
                <form onSubmit={register}>
                  <div className="mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" style={{ width: "330px", marginLeft: "-22px", marginTop: "35px" }} placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="phone">Nomor HP</label>
                    <input type="text" className="form-control" id="phone" style={{ width: "330px", marginLeft: "-22px", marginTop: "30px" }} placeholder="Masukkan Nomor HP" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
                  </div>
                  <div className="mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      style={{ width: "330px", marginLeft: "-22px", marginTop: "30px" }}
                      placeholder="Masukkan Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button variant="warning" className="btnpopup" size="sm" type="submit">
                      Sign Up
                    </Button>
                  </div>
                  <div>
                    <h6 className="teks1 mb-4">
                      <span>Already a member?</span>
                      <Button variant="warning" className="teks" onClick={handleShowSignIn}>
                        Sign In
                      </Button>
                    </h6>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showProfile} onHide={handleCloseProfile} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Biodata Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4" style={{ backgroundColor: "#FBEEA8", borderRadius: "10px" }}>
            <div className="mb-3">
              <label htmlFor="nama">Nama</label>
              <input type="text" className="form-control" id="nama" placeholder="Masukkan Nama" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
            </div>
            <div className="mb-3">
              <label htmlFor="nohp">No HP</label>
              <input type="text" className="form-control" id="nohp" placeholder="Masukkan No HP" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Masukkan Email" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
            </div>
            <div className="mb-3">
              <label htmlFor="profil">Edit Foto Profil</label>
              <input type="file" className="form-control" id="profil" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
            </div>
            <Button variant="warning" onClick={handleCloseProfile}>
              Simpan
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      ;
    </div>
  );
};

export default JenisKamar;
