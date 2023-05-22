import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import NavigationBar from './components/NavigationBar';
import './styles/style.css';

function App() {
  return (
    <div>   
      <div className='background'>
        <NavigationBar />
        <div className='beranda d-flex align-items-end'>
          <Container className='d-flex justify-content-end'>
            <Row>
              <Col>
                <h1 className="text-end fontber">Kenyamanan Surga</h1>
                <h1 className="text-end fontber">menanti Anda!</h1>
                <h6 className="text-end fontdesc">Hotelo Luxury merupakan hotel terbaik di Kawasan Asia Barat</h6>
                <h6 className="text-end fontdesc">Daya yang memberikan pelayanan yang terbaik sehingga</h6>
                <h6 className="text-end fontdesc">kamu akan merasa nyaman seperti di Surga.</h6>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
