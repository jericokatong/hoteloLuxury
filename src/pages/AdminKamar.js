
import NavigationAdmin from '../components/NavigationAdmin';
import Kamar from './Kamar';

import '../styles/style.css';

const AdminKamar = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <Kamar/>
      </div>
    </div>
  )
}

export default AdminKamar;
