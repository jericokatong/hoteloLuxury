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

import ModalComponents from "./ModalComponents";

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
  pelanggan_id,
}) => {
  const titles = ["Standard Room", "Superior Room", "Deluxe Room"];
  const price = [200000, 250000, 320000];
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
                    <Button
                      onClick={() =>
                        navigate("/pesankamar", {
                          state: {
                            subtitle: titles[index],
                            price: price[index],
                            idKamar: index + 2,
                            pelanggan_id,
                          },
                        })
                      }
                      variant="warning"
                      size="sm"
                      className="ms-2 booknow"
                    >
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
    </div>
  );
};

export default JenisKamar;
