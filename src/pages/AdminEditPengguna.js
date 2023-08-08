import NavigationAdmin from "../components/NavigationAdmin";
import EditPengguna from "./EditPengguna";
import { useLocation } from "react-router-dom";

import "../styles/style.css";

const AdminEditPengguna = () => {
  const location = useLocation();
  const { pelanggan_email } = location.state;

  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin />
      </div>
      <div>
        <EditPengguna pelanggan_email={pelanggan_email} />
      </div>
    </div>
  );
};

export default AdminEditPengguna;
