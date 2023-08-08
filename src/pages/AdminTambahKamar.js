import NavigationAdmin from "../components/NavigationAdmin";
import TambahKamar from "./TambahKamar";
import { useLocation } from "react-router-dom";

import "../styles/style.css";

const AdminTambahKamar = () => {
  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin />
      </div>
      <div>
        <TambahKamar />
      </div>
    </div>
  );
};

export default AdminTambahKamar;
