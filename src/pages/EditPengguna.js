import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../styles/pengguna.css";

const EditPengguna = ({ pelanggan_email }) => {
  const [emailSebelum, setEmailSebelum] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [urlGambar, setUrlGambar] = useState(null);

  const [responseDataPengguna, setResponseDataPengguna] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ambilDataPenggunaByEmail();
  }, []);

  useEffect(() => {
    if (responseDataPengguna) {
      setEmail(responseDataPengguna.data.email);
      setEmailSebelum(responseDataPengguna.data.email);
      setNoHp(responseDataPengguna.data.no_hp);
      setUrlGambar(responseDataPengguna.data.url_image_pelanggan);
      console.log(responseDataPengguna);
    }
  }, responseDataPengguna);

  const ambilDataPenggunaByEmail = async () => {
    try {
      const result = await axios.get(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/pelanggan/${pelanggan_email}`);
      setResponseDataPengguna(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editPengguna = async (e) => {
    e.preventDefault();
    try {
      const responseToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

      const inputGambar = document.getElementById("gambar-kamar");

      const fileGambar = inputGambar.files[0];

      console.log("ini file gambar", fileGambar);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("no_hp", noHp);
      formData.append("file", fileGambar);

      console.log(responseToken);

      console.log("Email sebelum", emailSebelum);
      const cekEdit = await axios.patch(
        `http://localhost:5000/pelanggan/${emailSebelum}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${responseToken.data.accessToken}`,
          },
        }
      );
      console.log(cekEdit);
      navigate("/admin/pengguna");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Edit Data Pengguna</h6>
      </header>
      <div className="formContainer">
        <img src={urlGambar} alt="" width="200" />
        <Form onSubmit={editPengguna}>
          <Form.Group controlId="email" className="form-group-inline mt-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" className="form-control-width custom-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="form-group-inline mt-3">
            <Form.Label>No Hp:</Form.Label>
            <Form.Control type="tel" className="form-control-width custom-input" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
          </Form.Group>
          <Form.Group className="form-group-kanan mt-4">
            <Form.Label className="tm2">Edit Gambar:</Form.Label>
            <Form.Control type="file" id="gambar-kamar" className="custom-input" />
          </Form.Group>
          {/* <div className="form-group-row">
            <Form.Group controlId="roomType" className="form-group-inline mt-3">
              <Form.Label>Jenis Kamar:</Form.Label>
              <Form.Control as="select" className="form-control-medium1-width custom-input">
                <option>Standard Room</option>
                <option>Superior Room</option>
                <option>Deluxe Room</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="numberOfRooms" className="form-group-kanan mt-3">
              <Form.Label className="tm2">Jumlah Kamar:</Form.Label>
              <Form.Control type="number" className="form-control-medium2-width custom-input" />
            </Form.Group>
          </div>
          <div className="form-group-row">
            <Form.Group controlId="checkInDate" className="form-group-inline mt-3">
              <Form.Label>Check-in:</Form.Label>
              <Form.Control type="date" className="form-control-small1-width custom-input" />
            </Form.Group>
            <Form.Group controlId="checkOutDate" className="form-group-kanan mt-3">
              <Form.Label className="ts2">Check-out:</Form.Label>
              <Form.Control type="date" className="form-control-small2-width custom-input" />
            </Form.Group>
          </div> */}
          <Button type="submit" variant="warning" className="custom-button mb-5 mt-3">
            Simpan
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditPengguna;
