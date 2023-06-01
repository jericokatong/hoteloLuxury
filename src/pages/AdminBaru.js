
import NavigationAdmin from '../components/NavigationAdmin';
import Baru from './Baru';

import '../styles/style.css';

const AdminBaru = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <Baru/>
      </div>
    </div>
  )
}

export default AdminBaru;
