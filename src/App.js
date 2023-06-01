import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import PesanKamar from './pages/PesanKamar';
import AdminDashboard from './pages/AdminDashboard';
import Kamar from './pages/AdminKamar';
import Pengguna from './pages/AdminPengguna';
import Terkonfirmasi from './pages/AdminTerkonfirmasi';
import Pending from './pages/AdminPending';
import Baru from './pages/AdminBaru';
import KonfirmasiPemesanan from './components/KonfirmasiPemesanan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pesankamar' element={<PesanKamar/>} />
        <Route path='/konfirmasipemesanan' element={<KonfirmasiPemesanan/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/admin/kamar' element={<Kamar/>} />
        <Route path='/admin/pengguna' element={<Pengguna/>} />
        <Route path='/admin/konfirmasi' element={<Terkonfirmasi/>} />
        <Route path='/admin/pending' element={<Pending/>} />
        <Route path='/admin/baru' element={<Baru/>} />
      </Routes>
    </Router>
  );
}

export default App;
