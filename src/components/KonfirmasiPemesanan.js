import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Card, Nav, Row, Col, Form, Button, Container } from "react-bootstrap";
import "../styles/konfirmasipemesanan.css";
import JenisKamar from "./JenisKamar";

const KonfirmasiPemesanan = ({ email, isLogin, notHome, setAksesToken }) => {
  const [activeTab, setActiveTab] = useState("info-pemesanan");
  const [jumlah_kamar, set_jumlah_kamar] = useState(null);
  const [nama_lengkap_reservasi, set_nama_lengkap_reservasi] = useState("");
  const [email_reservasi, set_email_reservasi] = useState("");
  const [no_hp_reservasi, set_no_hp_reservasi] = useState("");
  const [status, set_status] = useState("");
  const [tanggal_checkin, set_tanggal_checkin] = useState(null);
  const [tanggal_checkout, set_tanggal_checkout] = useState(null);

  const location = useLocation();
  const { pelanggan_id, aksesToken, subtitle, price, total_biaya } = location.state;

  useEffect(() => {
    console.log("ini jumlah kamar wkwkwkwkwk", jumlah_kamar);
  }, [jumlah_kamar]);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    try {
      const hasilToken = await axios.get("http://localhost:5000/token");

      // setAksesToken(hasilToken.data.accessToken);

      const response = await axios.get(`http://localhost:5000/reservasi/${pelanggan_id}`, {
        headers: {
          Authorization: `Bearer ${hasilToken.data.accessToken}`,
        },
      });

      console.log(response);
      set_jumlah_kamar(response.data[response.data.length - 1].jumlah_kamar);
      set_tanggal_checkin(response.data[response.data.length - 1].tanggal_checkin);
      set_tanggal_checkout(response.data[response.data.length - 1].tanggal_checkout);
      set_nama_lengkap_reservasi(response.data[response.data.length - 1].nama_lengkap_reservasi);
      set_email_reservasi(response.data[response.data.length - 1].email_reservasi);
      set_no_hp_reservasi(response.data[response.data.length - 1].no_hp_reservasi);
      set_status(response.data[response.data.length - 1].status_pemesanan);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="konfrimasibg">
      <div>
        <NavigationBar email={email} isLogin={isLogin} notHome={notHome} />
        <hr className="custom-hr" />
      </div>
      <div className="text-center custom-text">
        <h2>KONFIRMASI PEMESANAN</h2>
        <hr className="custom-hr3" />
      </div>
      <div className="bodykonfir">
        <div className="success">Selamat! Pemesanan kamar berhasil dilakukan.</div>

        <div className="d-flex justify-content-center">
          <Card className="custom-card">
            <Card.Header className="header">
              <Nav variant="tabs" defaultActiveKey="#info-pemesanan">
                <Nav.Item>
                  <Nav.Link active={activeTab === "info-pemesanan"} onClick={() => handleTabChange("info-pemesanan")}>
                    Konfirmasi
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link active={activeTab === "data-pribadi"} onClick={() => handleTabChange("data-pribadi")}>
                    Cek Status
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {activeTab === "info-pemesanan" && (
                <Row>
                  <Col className="textip">
                    <Container className="inputform">
                      <Row>
                        <Col className="col-left">
                          <Row>
                            <h3 className="primaryText">{jumlah_kamar} KAMAR</h3>
                            <h5 className="secondaryText mb-3">
                              {formatDate(tanggal_checkin)} sampai {formatDate(tanggal_checkout)}
                            </h5>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">Nama Reservasi:</h5>
                            <h3 className="primaryText mb-3">{nama_lengkap_reservasi}</h3>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">Email Reservasi:</h5>
                            <h3 className="primaryText mb-3">{email_reservasi}</h3>
                          </Row>
                          <Row>
                            <h5 className="secondaryText">no. HP Reservasi:</h5>
                            <h3 className="primaryText">{no_hp_reservasi}</h3>
                          </Row>
                        </Col>
                        <Col className="col-right">
                          <Row>
                            <h3 className="primaryText">{subtitle}</h3>
                            <h5 className="secondaryText mb-3">Rp. {price.toLocaleString("id-ID")}</h5>
                          </Row>
                          <Row>
                            <h3 className="primaryText">Total Pembayaran</h3>
                            <h5 className="secondaryText">Rp. {total_biaya.toLocaleString("id-ID")}</h5>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              )}
              {activeTab === "data-pribadi" && (
                <div>
                  <span className="cardtitle1">Status Pemesanan: </span>
                  <span className="cardtitle"> "{status.toLocaleUpperCase()}"</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        <Container className="d-flex justify-content-end ms-2 ps-5 pt-4">
          <Button variant="warning" className="kembalikeberanda">
            Kembali ke Beranda
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default KonfirmasiPemesanan;
