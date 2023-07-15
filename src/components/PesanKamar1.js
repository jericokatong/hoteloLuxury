import { useState } from "react";
import { Card, Nav, Row, Col, Form, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import glri1 from "../assets/img/glri1.jpg";
import "../styles/pesankamar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PesanKamar1 = ({ email, isLogin }) => {
  const [activeTab, setActiveTab] = useState("info-pemesanan");
  const [notHome, setNotHome] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="pkbg">
      <div>
        <NavigationBar email={email} isLogin={isLogin} notHome={notHome} />
        <hr className="custom-hr" />
      </div>
      <div className="text-center custom-text">
        <h2>PEMESANAN KAMAR</h2>
        <hr className="custom-hr2" />
      </div>
      <div className="d-flex justify-content-center">
        <Card className="custom-card">
          <Card.Header className="header">
            <Nav variant="tabs" defaultActiveKey="#info-pemesanan">
              <Nav.Item>
                <Nav.Link active={activeTab === "info-pemesanan"} onClick={() => handleTabChange("info-pemesanan")}>
                  Info Pemesanan
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={activeTab === "data-pribadi"} onClick={() => handleTabChange("data-pribadi")}>
                  Data Pribadi
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            {activeTab === "info-pemesanan" && (
              <Row>
                <Col md={6}>
                  <img src={glri1} alt="Gambar" className="gambar-room" />
                </Col>
                <Col md={6} className="textip">
                  <Card.Title>Standard Room</Card.Title>
                  <Card.Text className="pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </Card.Text>
                  <Card.Text>Harga: Rp. 200000 / malam</Card.Text>
                </Col>
              </Row>
            )}
            {activeTab === "data-pribadi" && (
              <div>
                <Card.Title className="cardtitle">Silakan masukkan data diri anda dengan data yang benar.</Card.Title>
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan nama lengkap" style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="email" placeholder="Masukkan email" style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan nomor hp" style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="date" placeholderText="Chekckin" as={DatePicker} dateFormat="yyyy/MM/dd" isClearable selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="date" placeholderText="Checkout" as={DatePicker} dateFormat="yyyy/MM/dd" isClearable selected={selectedDate} onChange={(date) => setSelectedDate(date)} style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan jumlah orang" style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan jumlah kamar" style={{ borderColor: "#DEA435" }} />
                    </Col>
                  </Row>
                </Form>
                <div className="mt-3">
                  <Button variant="warning" className="cancel btn">
                    Cancel
                  </Button>
                  <Button variant="warning" className="pesansekarang btn">
                    Pesan Sekarang
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PesanKamar1;
