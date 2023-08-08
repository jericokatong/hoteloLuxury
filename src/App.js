import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import PesanKamar from "./pages/PesanKamar";
import AdminDashboard from "./pages/AdminDashboard";

import AdminKamar from "./pages/AdminKamar";
import AdminEditKamar from "./pages/AdminEditKamar";
import AdminTambahKamar from "./pages/AdminTambahKamar";

import Pengguna from "./pages/Pengguna";
import AdminPengguna from "./pages/AdminPengguna";
import AdminEditPengguna from "./pages/AdminEditPengguna";

import Terkonfirmasi from "./pages/AdminTerkonfirmasi";
import Pending from "./pages/AdminPending";
import Baru from "./pages/AdminBaru";
import KonfirmasiPemesanan from "./components/KonfirmasiPemesanan";

import axios from "axios";
import jwt_decode from "jwt-decode";
import AdminTambahPengguna from "./pages/AdminTambahPengguna";

axios.defaults.headers.common["Authorization"] = ``;

function App() {
  const [aksesToken, setAksesToken] = useState("");
  const [pelanggan_id, set_pelanggan_id] = useState(null);
  const [hasil, setHasil] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [urlGambar, setUrlGambar] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [notHome, setNotHome] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (hasil) {
      set_pelanggan_id(hasil.data.pelanggan_id);
      setUrlGambar(hasil.data.url_image_pelanggan);
      setNoHp(hasil.data.no_hp);
      console.log(noHp);
      console.log("ini e id pelanggan", pelanggan_id);
    }
  }, [hasil, isLogin]);

  useEffect(() => {
    refreshToken();
  }, [isLogin]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/token");

      console.log("INI RESPONSE TOKEN", response);

      if (!response.data.accessToken) {
        const response = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/tokenadmin");

        setAksesToken(response.data.accessToken);
        console.log("ini token eee", response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);

        setEmail(decoded.email);
        console.log("ININ aada ator setIsAdmin");
        setIsAdmin(true);
        console.log(isAdmin);
      } else {
        setAksesToken(response.data.accessToken);
        console.log("ini token eee", response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);

        setEmail(decoded.email);

        try {
          console.log("ini dibawa", response.data.accessToken);

          const hasil = await axios.get(`http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/pelanggan/${jwt_decode(response.data.accessToken).email}`, {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          });
          console.log("INI EMAIL HA!", decoded);
          console.log("iniiiiiiiii hasil malma ijo", hasil.data);
          setHasil(hasil.data);
        } catch (error) {
          console.log("ini error pelanggan", error);
        }

        if (decoded.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          const expirationTime = decoded.exp;

          if (expirationTime > currentTime) {
            setIsLogin(true);
          } else {
            try {
              const result = await axios.get("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/token");
              const newDecoded = jwt_decode(result.data.accessToken);
              setAksesToken(result.data.accessToken);

              setEmail(newDecoded.email);
              setIsLogin(true);
            } catch (error) {
              console.log(error);
              setIsLogin(false);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              email={email}
              setEmail={setEmail}
              noHp={noHp}
              setNoHp={setNoHp}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              pelanggan_id={pelanggan_id}
              set_pelanggan_id={set_pelanggan_id}
              aksesToken={aksesToken}
              setAksesToken={setAksesToken}
              urlGambar={urlGambar}
              refreshToken={refreshToken}
              isAdmin={isAdmin}
            />
          }
        />
        <Route path="/pesankamar" element={<PesanKamar email={email} isLogin={isLogin} notHome={notHome} aksesToken={aksesToken} refreshToken={refreshToken} setAksesToken={setAksesToken} />} />

        <Route path="/konfirmasipemesanan" element={<KonfirmasiPemesanan email={email} isLogin={isLogin} notHome={notHome} setAksesToken={setAksesToken} />} />

        <Route path="/admin" element={<AdminDashboard email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />

        <Route path="/admin/kamar" element={<AdminKamar email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/kamar/edit" element={<AdminEditKamar />} />
        <Route path="/admin/kamar/tambah" element={<AdminTambahKamar />} />

        <Route path="/admin/pengguna" element={<AdminPengguna email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/pengguna/edit" element={<AdminEditPengguna />} />
        <Route path="/admin/pengguna/tambah" element={<AdminTambahPengguna />} />

        <Route path="/admin/konfirmasi" element={<Terkonfirmasi email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/pending" element={<Pending />} />
        <Route path="/admin/baru" element={<Baru />} />
      </Routes>
    </Router>
  );
}

export default App;
