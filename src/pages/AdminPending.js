
import NavigationAdmin from '../components/NavigationAdmin';
import Pending from './Pending';

import '../styles/style.css';

const AdminPending = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <Pending/>
      </div>
    </div>
  )
}

export default AdminPending;
