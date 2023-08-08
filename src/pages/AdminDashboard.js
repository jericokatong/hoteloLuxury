import NavigationAdmin from "../components/NavigationAdmin";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import "../styles/style.css";

import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = ({ email, setEmail, setNoHp, setPassword, setIsLogin, setIsAdmin }) => {
  const [jumlahPengguna, setJumlahPengguna] = useState(0);
  const [jumlahKamar, setJumlahKamar] = useState(0);
  const [jumlahTransaksiPending, setJumlahTransaksiPending] = useState(0);
  const [jumlahTransaksiTerkonfirmasi, setJumlahTransaksiTerkonfirmasi] = useState(0);

  const [responsePelanggan, setResponsePelanggan] = useState(null);
  const [responseReservasi, setResponseReservasi] = useState(null);
  const [responseKamar, setResponseKamar] = useState(null);

  useEffect(() => {
    ambilData();
  }, []);

  // untuk ambil jumlah pelanggan
  useEffect(() => {
    if (responsePelanggan) {
      setJumlahPengguna(responsePelanggan.data.length);
      // console.log("ini tipeeee", typeof responsePelanggan.data.data);
      console.log("ini set pengguna", jumlahPengguna);
    }
  }, [responsePelanggan]);

  // untuk ambil jumlah konfirmasi dan pending
  useEffect(() => {
    if (responseReservasi) {
      const terkonfirmasi = responseReservasi.filter((value, index) => {
        return value.status_pemesanan === "confirm";
      });

      const pending = responseReservasi.filter((value, index) => {
        return value.status_pemesanan === "pending";
      });

      setJumlahTransaksiTerkonfirmasi(terkonfirmasi.length);
      setJumlahTransaksiPending(pending.length);
      console.log("ini jumlah terkonfirmasi", jumlahTransaksiTerkonfirmasi);
      console.log("ini jumlah pending", jumlahTransaksiPending);
    }
  }, [responseReservasi]);

  useEffect(() => {
    if (responseKamar) {
      setJumlahKamar(responseKamar.data.length);
      console.log("iniiinini kamar pe banya setela efek", jumlahKamar);
    }
  }, [responseKamar]);

  const ambilData = async () => {
    try {
      const responseAksesToken = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

      const responsePelanggan = await axios.get(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/pelanggan`, {
        headers: {
          Authorization: `Bearer ${responseAksesToken.data.accessToken}`,
        },
      });

      setResponsePelanggan(responsePelanggan.data);

      const responseReservasi = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/reservasi", {
        headers: {
          Authorization: `Bearer ${responseAksesToken.data.accessToken}`,
        },
      });
      setResponseReservasi(responseReservasi.data);

      const responseKamar = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/kamar");
      setResponseKamar(responseKamar.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
      </div>
      <Dashboard jumlahPengguna={jumlahPengguna} jumlahKamar={jumlahKamar} jumlahTransaksiTerkonfirmasi={jumlahTransaksiTerkonfirmasi} jumlahTransaksiPending={jumlahTransaksiPending} />
    </div>
  );
};

export default AdminDashboard;
