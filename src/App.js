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

function App() {
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");

      const decoded = jwt_decode(response.data.accessToken);
      setEmail(decoded.email);
      if (decoded.email) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home email={email} setEmail={setEmail} noHp={noHp} setNoHp={setNoHp} password={password} setPassword={setPassword} isLogin={isLogin} setIsLogin={setIsLogin} />} />
        <Route path="/pesankamar" element={<PesanKamar email={email} isLogin={isLogin} />} />
        <Route path="/konfirmasipemesanan" element={<KonfirmasiPemesanan />} />
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
