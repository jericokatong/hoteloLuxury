import React, { useEffect, useState } from "react";
import { Button, Table, Card } from "react-bootstrap";
import "../styles/kamar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Kamar = () => {
  const [dataKamar, setDataKamar] = useState(null);
  const [responseDataKamar, setResponseDataKamar] = useState(null);
  const navigate = useNavigate();

  const data = [
    {
      no: "1",
      jenisKamar: "Standar Room",
      harga: "200,000",
      jumlah: "15",
    },
    {
      no: "2",
      jenisKamar: "Superior Room",
      harga: "250,000",
      jumlah: "10",
    },
    {
      no: "3",
      jenisKamar: "Deluxe Room",
      harga: "320,000",
      jumlah: "8",
    },
  ];

  useEffect(() => {
    ambilDataKamar();
  }, []);

  useEffect(() => {
    if (responseDataKamar) {
      setDataKamar(responseDataKamar.data);
      console.log(dataKamar);
    }
  }, [responseDataKamar]);

  const ambilDataKamar = async () => {
    try {
      const response = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/kamar");
      setResponseDataKamar(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteKamar = async (kamar_id) => {
    try {
      await axios.delete(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/kamar/${kamar_id}`);
      ambilDataKamar();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Data kamar</h6>
        <Button variant="warning" size="sm" className="ms-auto me-5 add" onClick={() => navigate("/admin/kamar/tambah")}>
          Tambah Data
        </Button>{" "}
      </header>
      <Table striped bordered hover className="tabel">
        <thead className="head">
          <tr>
            <th>No</th>
            <th>Jenis Kamar</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {dataKamar &&
            dataKamar.map((item, index) => (
              <tr key={item.kamar_id}>
                <td className="no">{index + 1}</td>
                <td className="body" style={{ textAlign: "center" }}>
                  <Card style={{ width: "250px", margin: "auto" }}>
                    <Card.Img variant="top" src={item.url_image} />
                    <Card.Body style={{ background: "#dea435", color: "white" }}>
                      <Card.Title>{item.jenis_kamar}</Card.Title>
                    </Card.Body>
                  </Card>
                </td>
                <td className="body">{item.harga_per_malam.toLocaleString("id-ID")}</td>
                <td className="body">{item.jumlah_kamar}</td>
                <td className="body">
                  <Button
                    variant="warning"
                    className="edit"
                    size="sm"
                    onClick={() =>
                      navigate("/admin/kamar/edit", {
                        state: {
                          kamar_id: item.kamar_id,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>{" "}
                  <Button variant="warning" size="sm" className="ms-3 delete" onClick={() => deleteKamar(item.kamar_id)}>
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

export default Kamar;
