
import NavigationAdmin from '../components/NavigationAdmin';
import Pengguna from './Pengguna';

import '../styles/style.css';

const AdminPengguna = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <Pengguna/>
      </div>
    </div>
  )
}

export default AdminPengguna;
