import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Card, Nav, Row, Col, Form, Button, Container } from "react-bootstrap";
import '../styles/konfirmasipemesanan.css'

const KonfirmasiPemesanan = () => {

  const [activeTab, setActiveTab] = useState('info-pemesanan');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="konfrimasibg">
      <div>
        <NavigationBar />
        <hr className="custom-hr" />
      </div>
      <div className="text-center custom-text">
        <h2>KONFIRMASI PEMESANAN</h2>
        <hr className="custom-hr3" />
      </div>
      <div className="bodykonfir">
        <div className="success">
          Selamat! Pemesanan kamar berhasil dilakukan.
        </div>

        <div className="d-flex justify-content-center">
          <Card className="custom-card">
            <Card.Header className="header">
              <Nav variant="tabs" defaultActiveKey="#info-pemesanan">
                <Nav.Item>
                  <Nav.Link active={activeTab === 'info-pemesanan'} onClick={() => handleTabChange('info-pemesanan')}>
                    Info Pemesanan
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link active={activeTab === 'data-pribadi'} onClick={() => handleTabChange('data-pribadi')}>
                    Data Pribadi
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {activeTab === 'info-pemesanan' && (
                <Row>
                  <Col className="textip">
                    <Container className="inputform">
                      <Row>
                        <Col className="col-left">
                          <Row >
                            <h3 className="primaryText">1 KAMAR</h3>
                            <h5 className="secondaryText mb-3">02/02/2023 sampai 04/02/2023</h5>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">nama:</h5>
                            <h3 className="primaryText mb-3">Ayu Kirana</h3>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">email:</h5>
                            <h3 className="primaryText mb-3">ayukirakira@gmail.com</h3>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">no. HP:</h5>
                            <h3 className="primaryText">081212121212</h3>
                          </Row>
                        </Col>
                        <Col className="col-right">
                          <Row>
                            <h3 className="primaryText">STANDARD ROOM</h3>
                            <h5 className="secondaryText mb-3">Rp. 200.000</h5>
                          </Row>
                          <Row>
                            <h3 className="primaryText">Total Pembayaran</h3>
                            <h5 className="secondaryText">Rp. 400.000</h5>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              )}
              {activeTab === 'data-pribadi' && (
                <div>
                  <span className="cardtitle1">Status Pemesanan: </span>
                  <span className="cardtitle"> "PENDING"</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        <Container className="d-flex justify-content-end ms-2 ps-5 pt-4">
          <Button variant="warning" className="kembalikeberanda">Kembali ke Beranda</Button>
        </Container>
      </div>
    </div>
  );
}

export default KonfirmasiPemesanan;
