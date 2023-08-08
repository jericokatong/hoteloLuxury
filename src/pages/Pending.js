import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "../styles/pending.css";
import userEvent from "@testing-library/user-event";

const Pending = () => {
  const [responseReservasi, setResponseReservasi] = useState(null);
  const [dataReservasi, setDataReservasi] = useState(null);

  const [responseHistoryReservasi, setResponseHistoryReservasi] = useState(null);
  const [dataHistoryReservasi, setDataHistoryReservasi] = useState(null);

  const data = [
    {
      no: "1",
      checkIn: ["02/04/2023"],
      checkOut: ["04/04/2023"],
      jumlahKamar: ["2"],
      tipeKamar: ["Standard Room"],
      nama: ["Adzana Shaliha"],
      noHp: ["08123456789"],
      email: ["adzana@gmail.com"],
    },
    {
      no: "2",
      checkIn: ["03/04/2023"],
      checkOut: ["08/04/2023"],
      jumlahKamar: ["1"],
      tipeKamar: ["Deluxe Room"],
      nama: ["Fureya"],
      noHp: ["08123456789"],
      email: ["fureya@gmail.com"],
    },
  ];

  useEffect(() => {
    ambilDataPending();
  }, []);

  useEffect(() => {
    if (responseReservasi) {
      // console.log("INI RESPONSE RESERVASI", responseReservasi[0].Kamar.jenis_kamar);
      setDataReservasi(responseReservasi);
    }
  }, [responseReservasi]);

  useEffect(() => {
    if (responseHistoryReservasi) {
      console.log("INI HISTORY", responseHistoryReservasi.data);
      setDataHistoryReservasi(responseHistoryReservasi.data);
    }
  }, [responseHistoryReservasi]);

  const ambilDataPending = async () => {
    try {
      const hasilToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

      // setResponseToken(hasilToken.data);

      const result = await axios.get(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/reservasi`, {
        headers: {
          Authorization: `Bearer ${hasilToken.data.accessToken}`,
        },
      });

      const resultHistory = await axios.get(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/history_reservasi`, {
        headers: {
          Authorization: `Bearer ${hasilToken.data.accessToken}`,
        },
      });

      setResponseReservasi(result.data);
      setResponseHistoryReservasi(resultHistory.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const konfirmasiReservasi = async (reservasi_id) => {
    try {
      const hasilToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

      const cekKonfirmasi = await axios.patch(
        `http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/konfirmasi/${reservasi_id}`,
        {
          // Data (payload) permintaan
          // ...
        },
        {
          // Konfigurasi tambahan termasuk headers di sini
          headers: {
            Authorization: `Bearer ${hasilToken.data.accessToken}`,
          },
        }
      );

      ambilDataPending();
      console.log("CEK KONFIRMASI", cekKonfirmasi);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteDataReservasiPending = async (reservasi_id) => {
    try {
      const hasilToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

      await axios.delete(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/reservasi/${reservasi_id}`, {
        headers: {
          Authorization: `Bearer ${hasilToken.data.accessToken}`,
        },
      });

      ambilDataPending();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="dash">
      <header className="headerStyle">
        <h6 className="ms-4 mt-2">Menunggu Konfirmasi</h6>
      </header>
      <h3 className="a">Berikut daftar pelanggan yang menunggu konfirmasi.</h3>
      <Table striped bordered hover className="tabel">
        <thead className="head">
          <tr>
            <th>No</th>
            <th>Email Pelanggan</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Jumlah Kamar</th>
            <th>Jumlah Orang</th>
            <th>Tipe Kamar</th>
            <th>Nama Reservasi</th>
            <th>Email Reservasi</th>
            <th>No Hp Reservasi</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {dataReservasi &&
            dataReservasi.map((item, index) => {
              if (item.status_pemesanan === "pending") {
                return (
                  <tr key={item.no}>
                    <td className="no">{index + 1}</td>
                    <td className="no">{item.pelanggan.email}</td>
                    <td className="body">{formatDate(item.tanggal_checkin)}</td>
                    <td className="body">{formatDate(item.tanggal_checkout)}</td>
                    <td className="body">{item.jumlah_kamar}</td>
                    <td className="body">{item.jumlah_orang}</td>
                    <td className="body">{item.kamar.jenis_kamar}</td>
                    <td className="body">{item.nama_lengkap_reservasi}</td>
                    <td className="body">{item.email_reservasi}</td>
                    <td className="body">{item.no_hp_reservasi}</td>
                    <td className="body">
                      <div className="button-group">
                        <Button variant="warning" className="confirm" size="sm" onClick={() => konfirmasiReservasi(item.reservasi_id)}>
                          Confirm
                        </Button>{" "}
                        <Button variant="warning" size="sm" className="delete" onClick={() => deleteDataReservasiPending(item.reservasi_id)}>
                          Delete
                        </Button>{" "}
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          {dataHistoryReservasi &&
            dataHistoryReservasi.map((item, index) => {
              if (item.status_pemesanan === "pending") {
                return (
                  <tr key={item.reservasi_id}>
                    <td className="no">{index + 1}</td>
                    <td className="no">{item.email_pelanggan}</td>
                    <td className="body">{formatDate(item.tanggal_checkin)}</td>
                    <td className="body">{formatDate(item.tanggal_checkout)}</td>
                    <td className="body">{item.jumlah_kamar}</td>
                    <td className="body">{item.jumlah_orang}</td>
                    <td className="body">{item.jenis_kamar}</td>
                    <td className="body">{item.nama_lengkap_reservasi}</td>
                    <td className="body">{item.email_reservasi}</td>
                    <td className="body">{item.no_hp_reservasi}</td>
                    <td className="body">
                      {/* <div className="button-group">
                        <Button variant="warning" className="confirm" size="sm">
                          Confirm
                        </Button>{" "}
                        <Button variant="warning" size="sm" className="delete">
                          Delete
                        </Button>{" "}
                      </div> */}
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Pending;
