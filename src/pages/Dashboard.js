import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/dashboard.css";

const Dashboard = ({ jumlahPengguna, jumlahKamar, jumlahTransaksiTerkonfirmasi, jumlahTransaksiPending }) => {
  return (
    <div className="dash">
      <div className="row space">
        <div className="col-md-3">
          <div className="card c1">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h3>{jumlahPengguna} </h3>
                  <h3>Pengguna</h3>
                </div>
                <div className="ms-auto pb-4">
                  <i className="bi bi-pencil"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card c2">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h3>{jumlahKamar}</h3>
                  <h3>Kamar</h3>
                </div>
                <div className="ms-auto pb-4">
                  <i className="bi bi-pencil"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card c3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h3>{jumlahTransaksiPending}</h3>
                  <h3>Transaksi Pending</h3>
                </div>
                <div className="ms-auto pb-4">
                  <i className="bi bi-pencil"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card c4">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h3>{jumlahTransaksiTerkonfirmasi}</h3>
                  <h3>Transaksi Terkonfirmasi</h3>
                </div>
                <div className="ms-auto pb-4">
                  <i className="bi bi-pencil"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
