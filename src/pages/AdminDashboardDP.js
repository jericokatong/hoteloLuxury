
import NavigationAdmin from '../components/NavigationAdmin';
import DashboardDP from './DashboardDP';

import '../styles/style.css';

const AdminDashboardDP = () => {
  return (
    <div className='d-flex bg'>
      <div>
        <NavigationAdmin/>
      </div>
      <div>
        <DashboardDP/>
      </div>
    </div>
  )
}

export default AdminDashboardDP;
