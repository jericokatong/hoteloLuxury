
import NavigationAdmin from '../components/NavigationAdmin';
import EditKamar from './EditKamar';

import '../styles/style.css';

const AdminEditKamar = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <EditKamar/>
      </div>
    </div>
  )
}

export default AdminEditKamar;
