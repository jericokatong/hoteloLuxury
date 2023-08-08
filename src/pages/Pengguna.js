import React, { useEffect, useState } from "react";
import { Button, Table, Card } from "react-bootstrap";
import "../styles/kamar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pengguna = () => {
  const [dataPengguna, setDataPengguna] = useState(null);
  const [responseDataPengguna, setResponseDataPengguna] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ambilDataPengguna();
  }, []);

  useEffect(() => {
    if (responseDataPengguna) {
      setDataPengguna(responseDataPengguna.data);
      console.log("INI DATA PENGGUNA ahaah", dataPengguna);
    }
  }, [responseDataPengguna]);

  const ambilDataPengguna = async () => {
    try {
      const response = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/pelanggan");
      setResponseDataPengguna(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePengguna = async (pelanggan_id) => {
    try {
      await axios.delete(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/pelanggan/${pelanggan_id}`);
      ambilDataPengguna();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Data Pengguna</h6>
        <Button variant="warning" size="sm" className="ms-auto me-5 add" onClick={() => navigate("/admin/pengguna/tambah")}>
          Tambah Data
        </Button>{" "}
      </header>
      <Table striped bordered hover className="tabel">
        <thead className="head">
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Email</th>
            <th>No Hp</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {dataPengguna &&
            dataPengguna.map((item, index) => (
              <tr key={item.pelanggan_id}>
                <td className="no">{index + 1}</td>
                <td className="body" style={{ textAlign: "center" }}>
                  <img src={item.url_image_pelanggan} alt="" width="100px" />
                </td>
                <td className="body">{item.email}</td>
                <td className="body">{item.no_hp}</td>
                <td className="body">
                  <Button
                    variant="warning"
                    className="edit"
                    size="sm"
                    onClick={() =>
                      navigate("/admin/pengguna/edit", {
                        state: {
                          pelanggan_email: item.email,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>{" "}
                  <Button variant="warning" size="sm" className="ms-3 delete" onClick={() => deletePengguna(item.pelanggan_id)}>
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pengguna;
