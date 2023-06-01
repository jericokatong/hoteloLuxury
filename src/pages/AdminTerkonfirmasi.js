
import NavigationAdmin from '../components/NavigationAdmin';
import Terkonfirmasi from './Terkonfirmasi';

import '../styles/style.css';

const AdminTerkonfirmasi = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <Terkonfirmasi/>
      </div>
    </div>
  )
}

export default AdminTerkonfirmasi;
