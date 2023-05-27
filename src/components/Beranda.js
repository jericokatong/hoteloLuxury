import { Container, Row, Col,Button } from 'react-bootstrap';
import '../styles/beranda.css';

const Beranda = () => {
    return(
        <div className='beranda d-flex align-items-end'>
          <Container className='d-flex justify-content-end'>
            <Row>
              <Col>
              <div className="text-end ">
                <h1 className="fontber">Kenyamanan Surga</h1>
                  <h1 className="fontber">menanti Anda!</h1>
              </div>
                <div className="text-end mt-4">                  
                  <h6 className="fontdesc">Hotelo Luxury merupakan hotel terbaik di Kawasan Asia Barat</h6>
                  <h6 className="fontdesc">Daya yang memberikan pelayanan yang terbaik sehingga</h6>
                  <h6 className="fontdesc">kamu akan merasa nyaman seperti di Surga.</h6>
                </div>
                <div className="text-end mt-4">
                  <Button href="#reservasi" variant="warning" size="sm" className="klikdisini">Klik di sini</Button>{' '}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Beranda