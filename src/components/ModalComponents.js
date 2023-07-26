import { Navbar, Container, NavLink, Button, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import React, { useEffect } from "react";
import popup from "../assets/img/popup.jpg";
import "../styles/style.css";

const ModalComponents = ({
  showSignIn,
  handleCloseSignIn,
  password,
  setPassword,
  handleShowSignUp,
  showSignUp,
  handleCloseSignUp,
  showProfile,
  handleCloseProfile,
  login,
  email,
  setEmail,
  register,
  noHp,
  setNoHp,
  handleShowSignIn,
  handleShowProfile,
  urlGambar,
  refreshToken,
}) => {
  useEffect(() => {
    console.log("ini ee gambar", urlGambar);
    console.log("ini no hp wuwiwuiw", noHp);
  }, []);

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      const hasilToken = await axios.get("http://localhost:5000/token");

      const inputGambar = document.getElementById("profil");

      const fileGambar = inputGambar.files[0];

      console.log("ini filegambar naruto", fileGambar);

      const formData = new FormData();
      formData.append("no_hp", noHp);
      formData.append("file", fileGambar);

      const hasil = await axios.patch(`http://localhost:5000/pelanggan`, formData, {
        headers: {
          Authorization: `Bearer ${hasilToken.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("ini hasil edit gambar", hasil);
      refreshToken();
      handleCloseProfile();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Modal show={showSignIn} onHide={handleCloseSignIn} size="lg" centered>
        <Modal.Body className="p-0">
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <div className="modal-fields text-center ms-5 mt-5">
                <form onSubmit={login}>
                  <div className="mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" style={{ width: "330px", marginLeft: "-22px" }} placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <form onSubmit={editProfile}>
            <div className="p-4" style={{ backgroundColor: "#FBEEA8", borderRadius: "10px" }}>
              <div className="d-flex align-items-center justify-content-center mb-4" style={{ width: "100%" }}>
                <img src={urlGambar} alt="" width="200" />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" value={email} readOnly className="form-control" id="email" placeholder="Masukkan Email" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
              </div>
              <div className="mb-3">
                <label htmlFor="nohp">No HP</label>
                <input type="text" onChange={(e) => setNoHp(e.target.value)} value={noHp} className="form-control" id="nohp" placeholder="Masukkan No HP" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
              </div>
              <div className="mb-3">
                <label htmlFor="profil">Edit Foto Profil</label>
                <input type="file" className="form-control" id="profil" style={{ borderColor: "#B27B0E", backgroundColor: "#FBEEA8" }} />
              </div>
              <Button variant="warning" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponents;
