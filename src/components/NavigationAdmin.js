import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "../styles/navAdmin.css";
// import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/img/Logo.png";

const NavigationAdmin = ({ email, setEmail, setNoHp, setPassword, setIsLogin, setIsAdmin }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const adminLogout = async () => {
    await axios.delete("http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io/logout");
    setEmail("");
    setNoHp("");
    setPassword("");
    setIsLogin(false);
    setIsAdmin(false);

    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row ads">
        <div className="col-auto col-sm-2 d-flex flex-column justify-content-between min-vh-100" style={{ backgroundColor: "#FFF9EF" }}>
          <div className="mt-3 ">
            {email && (
              <div>
                <p>Selamat datang {email}</p>
                {/* <Button variant="danger" className="mb-4" onClick={adminLogout}>
                  Logout
                </Button> */}
              </div>
            )}

            <a className="ms-1">
              <img src={logo} width="175" height="29" alt="logo" />
            </a>
            <hr className="text-black d-none d-sm-block"></hr>
            <ul className="nav nav-pills flex-column" id="parentM">
              <li className={`nav-item my-1 ${activeMenu === "dashboard" ? "bg-color" : ""}`}>
                <Link to="/admin" className="nav-link text-black " onClick={() => handleMenuClick("dashboard")}>
                  <i className="bi bi-grid"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item my-1">
                <a href="#submenu" className="nav-link text-black " data-bs-toggle="collapse" aria-current="page">
                  <i className="bi bi-calendar"></i>
                  <span className="ms-2 me-2 d-none d-sm-inline">Data</span>
                  <i className="bi bi-arrow-down-short text-end ms-4 ps-4"></i>
                </a>
                <ul className="nav collapse ms-4 flex-column" id="submenu" data-bs-parent="#parentM">
                  <li className={`nav-item ${activeMenu === "kamar" ? "bg-color" : ""}`}>
                    <Link to="/admin/kamar" className="nav-link text-black" onClick={() => handleMenuClick("kamar")}>
                      Kamar
                    </Link>
                  </li>
                  <li className={`nav-item ${activeMenu === "pengguna" ? "bg-color" : ""}`}>
                    <Link to="/admin/pengguna" className="nav-link text-black" href="#" onClick={() => handleMenuClick("pengguna")}>
                      Pengguna
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-1">
                <a href="#submenu" className="nav-link text-black" data-bs-toggle="collapse" aria-current="page">
                  <i className="bi bi-arrow-left-right"></i>
                  <span className="ms-2 d-none d-sm-inline">Transaksi</span>
                  <i className="bi bi-arrow-down-short text-end ms-4"></i>
                </a>
                <ul className="nav collapse ms-4 flex-column" id="submenu" data-bs-parent="#parentM">
                  <li to="/admin/konfirmasi" className={`nav-item ${activeMenu === "terkonfirmasi" ? "bg-color" : ""}`}>
                    <Link to="/admin/konfirmasi" className="nav-link text-black" onClick={() => handleMenuClick("terkonfirmasi")}>
                      Terkonfirmasi
                    </Link>
                  </li>
                  <li className={`nav-item ${activeMenu === "pending" ? "bg-color" : ""}`}>
                    <Link to="/admin/pending" className="nav-link text-black" href="#" onClick={() => handleMenuClick("pending")}>
                      Pending
                    </Link>
                  </li>
                  <li className={`nav-item ${activeMenu === "baru" ? "bg-color" : ""}`}>
                    <Link to="/admin/baru" className="nav-link text-black" href="#" onClick={() => handleMenuClick("baru")}>
                      Baru
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-1">
                <a href="#" className="nav-link text-black " aria-current="page">
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span className="ms-2 d-none d-sm-inline" onClick={adminLogout}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationAdmin;
