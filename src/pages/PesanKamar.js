import PesanKamar1 from "../components/PesanKamar1";
import { useLocation } from "react-router-dom";

const PesanKamar = ({ email, isLogin, notHome, aksesToken, refreshToken, setAksesToken }) => {
  const location = useLocation();
  const { subtitle, price, idKamar, pelanggan_id } = location.state;

  return <PesanKamar1 email={email} isLogin={isLogin} notHome={notHome} subtitle={subtitle} price={price} idKamar={idKamar} aksesToken={aksesToken} refreshToken={refreshToken} setAksesToken={setAksesToken} pelanggan_id={pelanggan_id} />;
};

export default PesanKamar;
