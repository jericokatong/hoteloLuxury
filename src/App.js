import './App.css';
import NavigationBar from './components/NavigationBar';
import Beranda from './components/Beranda';
import TentangKami from './components/TentangKami'

import './styles/style.css';

function App() {
  return (
    <div>   
      <div className='mainbg'>
        <NavigationBar/>
        <Beranda/>
      </div>
      <div className='tentangkamibg'>
        <TentangKami/>
      </div>
    </div>
  );
}

export default App;
