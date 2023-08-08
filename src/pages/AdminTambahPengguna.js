import NavigationAdmin from "../components/NavigationAdmin";
import TambahPengguna from "./TambahPengguna";
import { useLocation } from "react-router-dom";

import "../styles/style.css";

const AdminTambahPengguna = () => {
  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin />
      </div>
      <div>
        <TambahPengguna />
      </div>
    </div>
  );
};

export default AdminTambahPengguna;
