import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import PesanKamar from "./pages/PesanKamar";
import AdminDashboard from "./pages/AdminDashboard";
import Kamar from "./pages/AdminKamar";
import Pengguna from "./pages/AdminPengguna";
import Terkonfirmasi from "./pages/AdminTerkonfirmasi";
import Pending from "./pages/AdminPending";
import Baru from "./pages/AdminBaru";
import KonfirmasiPemesanan from "./components/KonfirmasiPemesanan";

import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.headers.common["Authorization"] = ``;

function App() {
  const [aksesToken, setAksesToken] = useState("");
  const [pelanggan_id, set_pelanggan_id] = useState(null);
  const [hasil, setHasil] = useState(null);

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
      const response = await axios.get("http://localhost:5000/token");

      setAksesToken(response.data.accessToken);
      console.log("ini token eee", response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      setEmail(decoded.email);

      try {
        console.log("ini dibawa", response.data.accessToken);

        const hasil = await axios.get(`http://localhost:5000/pelanggan/${jwt_decode(response.data.accessToken).email}`, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        });
        console.log("iniiiiiiiii hasil", hasil.data);
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
            const result = await axios.get("http://localhost:5000/token");
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
            />
          }
        />
        <Route path="/pesankamar" element={<PesanKamar email={email} isLogin={isLogin} notHome={notHome} aksesToken={aksesToken} refreshToken={refreshToken} setAksesToken={setAksesToken} />} />

        <Route path="/konfirmasipemesanan" element={<KonfirmasiPemesanan email={email} isLogin={isLogin} notHome={notHome} setAksesToken={setAksesToken} />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/kamar" element={<Kamar />} />
        <Route path="/admin/pengguna" element={<Pengguna />} />
        <Route path="/admin/konfirmasi" element={<Terkonfirmasi />} />
        <Route path="/admin/pending" element={<Pending />} />
        <Route path="/admin/baru" element={<Baru />} />
      </Routes>
    </Router>
  );
}

export default App;
