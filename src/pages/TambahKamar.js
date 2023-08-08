import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/editkamar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahKamar = () => {
  const [jenisKamar, setJenisKamar] = useState("");
  const [hargaKamar, setHargaKamar] = useState(0);
  const [jumlahKamar, setJumlahKamar] = useState(0);
  const [urlGambar, setUrlGambar] = useState(null);

  const navigate = useNavigate();

  const tambahKamar = async (e) => {
    e.preventDefault();
    try {
      const inputGambar = document.getElementById("gambar-kamar");

      const fileGambar = inputGambar.files[0];

      const formData = new FormData();
      formData.append("jenis_kamar", jenisKamar);
      formData.append("harga_per_malam", hargaKamar);
      formData.append("jumlah_kamar", jumlahKamar);
      formData.append("file", fileGambar);

      await axios.post(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/kamar`, formData);

      navigate("/admin/kamar");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Tambah Data Kamar</h6>
      </header>
      <div className="formContainer">
        <Form style={{ textAlign: "center" }} onSubmit={tambahKamar}>
          <Form.Group controlId="namaKamar" className="form-group-inline mt-5" style={{ textAlign: "left" }}>
            <Form.Label>Jenis Kamar:</Form.Label>
            <Form.Control type="text" className="form-control-width custom-input" value={jenisKamar} onChange={(e) => setJenisKamar(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="harga" className="form-group-inline mt-4" style={{ textAlign: "left" }}>
            <Form.Label>Harga:</Form.Label>
            <Form.Control type="number" className="form-control-width custom-input" value={hargaKamar} onChange={(e) => setHargaKamar(e.target.value)} required />
          </Form.Group>
          <div className="form-group-row">
            <Form.Group controlId="jumlahKamar" className="form-group-inline mt-4" style={{ textAlign: "left" }}>
              <Form.Label>Jumlah Kamar:</Form.Label>
              <Form.Control type="number" className="form-control-medium1-width custom-input" value={jumlahKamar} onChange={(e) => setJumlahKamar(e.target.value)} required />
            </Form.Group>
            <Form.Group className="form-group-kanan mt-4" style={{ textAlign: "left" }}>
              <Form.Label className="tm2"></Form.Label>
              <Form.Control type="file" id="gambar-kamar" className="custom-input" required />
            </Form.Group>
          </div>
          <Button type="submit" variant="warning" className="custom-button mb-5 mt-4">
            Simpan
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TambahKamar;
