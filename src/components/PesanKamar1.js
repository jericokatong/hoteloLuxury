import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Nav, Row, Col, Form, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import glri1 from "../assets/img/glri1.jpg";
import "../styles/pesankamar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PesanKamar1 = ({ email, isLogin, subtitle, price, idKamar, notHome, aksesToken, refreshToken, setAksesToken, pelanggan_id }) => {
  const [activeTab, setActiveTab] = useState("info-pemesanan");
  const navigate = useNavigate();
  // const [selectedDate, setSelectedDate] = useState(null);

  const [nama_lengkap_reservasi, set_nama_lengkap_reservasi] = useState("");
  const [email_reservasi, set_email_reservasi] = useState("");
  const [no_hp_reservasi, set_no_hp_reservasi] = useState("");
  const [tanggal_checkin, set_tanggal_checkin] = useState(null);
  const [tanggal_checkout, set_tanggal_checkout] = useState(null);
  const [jumlah_orang, set_jumlah_orang] = useState(null);
  const [jumlah_kamar, set_jumlah_kamar] = useState(null);
  const [total_biaya, set_total_biaya] = useState(null);
  const [responseBuatReservasi, setResponseBuatReservasi] = useState(null);

  useEffect(() => {
    console.log("ini di pesan kamar ", pelanggan_id);
  }, []);

  useEffect(() => {
    set_total_biaya(jumlah_kamar * price);
  }, [jumlah_kamar]);

  useEffect(() => {
    console.log("ini pelanggan id di pesan jerico", pelanggan_id);
    if (responseBuatReservasi) {
      navigate("/konfirmasipemesanan", {
        state: {
          pelanggan_id,
          aksesToken,
          subtitle,
          price,
          total_biaya,
        },
      });
    }
  }, [responseBuatReservasi]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePesanSekarang = async (e) => {
    e.preventDefault();

    try {
      const hasilToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/token");

      setAksesToken(hasilToken.data.accessToken);
      // set_total_biaya(jumlah_kamar * price);

      const hasil = await axios.post(
        `http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/reservasi/${idKamar}`,
        {
          pelanggan_id,
          kamar_id: idKamar,
          nama_lengkap_reservasi,
          email_reservasi,
          no_hp_reservasi,
          tanggal_checkin,
          tanggal_checkout,
          jumlah_orang,
          jumlah_kamar,
          total_biaya,
          status_pemesanan: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${hasilToken.data.accessToken}`,
          },
        }
      );
      console.log(hasil);
      setResponseBuatReservasi(hasil.data);
    } catch (error) {
      console.log(error);
    }
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
                  <Card.Title>{subtitle}</Card.Title>
                  <Card.Text className="pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </Card.Text>
                  <Card.Text>Harga: Rp. {price.toLocaleString("id-ID")} / malam</Card.Text>
                </Col>
              </Row>
            )}
            {activeTab === "data-pribadi" && (
              <div>
                <Card.Title className="cardtitle">Silakan masukkan data diri anda dengan data yang benar.</Card.Title>
                <Form onSubmit={handlePesanSekarang}>
                  <Row>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan nama lengkap" style={{ borderColor: "#DEA435" }} value={nama_lengkap_reservasi} onChange={(e) => set_nama_lengkap_reservasi(e.target.value)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="email" placeholder="Masukkan email reservasi" style={{ borderColor: "#DEA435" }} value={email_reservasi} onChange={(e) => set_email_reservasi(e.target.value)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan nomor hp" style={{ borderColor: "#DEA435" }} value={no_hp_reservasi} onChange={(e) => set_no_hp_reservasi(e.target.value)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="date" placeholderText="Chekckin" as={DatePicker} dateFormat="yyyy/MM/dd" isClearable selected={tanggal_checkin} onChange={(date) => set_tanggal_checkin(date)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="date" placeholderText="Checkout" as={DatePicker} dateFormat="yyyy/MM/dd" isClearable selected={tanggal_checkout} onChange={(date) => set_tanggal_checkout(date)} style={{ borderColor: "#DEA435" }} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan jumlah orang" style={{ borderColor: "#DEA435" }} value={jumlah_orang} onChange={(e) => set_jumlah_orang(e.target.value)} />
                    </Col>
                    <Col md={4}>
                      <Form.Control type="text" placeholder="Masukkan jumlah kamar" style={{ borderColor: "#DEA435" }} value={jumlah_kamar} onChange={(e) => set_jumlah_kamar(e.target.value)} />
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <Button variant="warning" className="cancel btn">
                      Cancel
                    </Button>
                    <Button variant="warning" className="pesansekarang btn" type="submit">
                      Pesan Sekarang
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PesanKamar1;
