import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/editkamar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahPengguna = () => {
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [urlGambar, setUrlGambar] = useState(null);

  const navigate = useNavigate();

  const tambahPengguna = async (e) => {
    e.preventDefault();
    try {
      const inputGambar = document.getElementById("gambar-pengguna");

      const fileGambar = inputGambar.files[0];

      const formData = new FormData();
      formData.append("email", email);
      formData.append("no_hp", noHp);
      formData.append("password", password);
      formData.append("file", fileGambar);

      await axios.post(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/register`, formData);

      navigate("/admin/pengguna");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Tambah Data Pengguna</h6>
      </header>
      <div className="formContainer">
        <Form style={{ textAlign: "center" }} onSubmit={tambahPengguna}>
          <Form.Group controlId="namaKamar" className="form-group-inline mt-5" style={{ textAlign: "left" }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" className="form-control-width custom-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="harga" className="form-group-inline mt-4" style={{ textAlign: "left" }}>
            <Form.Label>No HP:</Form.Label>
            <Form.Control type="text" className="form-control-width custom-input" value={noHp} onChange={(e) => setNoHp(e.target.value)} required />
          </Form.Group>
          <div className="form-group-row">
            <Form.Group controlId="jumlahKamar" className="form-group-inline mt-4" style={{ textAlign: "left" }}>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" className="form-control-medium1-width custom-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="form-group-kanan mt-4" style={{ textAlign: "left" }}>
              <Form.Label className="tm2"></Form.Label>
              <Form.Control type="file" id="gambar-pengguna" className="custom-input" required />
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

export default TambahPengguna;
