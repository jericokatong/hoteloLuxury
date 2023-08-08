import NavigationAdmin from "../components/NavigationAdmin";
import Pengguna from "./Pengguna";

import "../styles/style.css";

const AdminPengguna = ({ email, setEmail, setNoHp, setPassword, setIsLogin, setIsAdmin }) => {
  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
      </div>
      <div>
        <Pengguna />
      </div>
    </div>
  );
};

export default AdminPengguna;
