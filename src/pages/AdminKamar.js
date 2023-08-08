import NavigationAdmin from "../components/NavigationAdmin";
import Kamar from "./Kamar";

import "../styles/style.css";

const AdminKamar = ({ email, setEmail, setNoHp, setPassword, setIsLogin, setIsAdmin }) => {
  return (
    <div className="d-flex bg">
      <div>
        <NavigationAdmin email={email} setEmail={setEmail} setNoHp={setNoHp} setPassword={setPassword} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
      </div>
      <div>
        <Kamar />
      </div>
    </div>
  );
};

export default AdminKamar;
