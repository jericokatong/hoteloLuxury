import { Container, Row, Col, Image } from 'react-bootstrap';
import '../styles/tentangkami.css';
import glri1 from '../assets/img/glri1.jpg';
import glri2 from '../assets/img/glri2.jpg';
import glri3 from '../assets/img/glri3.jpg';
import glri4 from '../assets/img/glri4.jpg';
import glri5 from '../assets/img/glri5.jpg';
import glri6 from '../assets/img/glri6.jpg';
import JenisKamar from './JenisKamar';
import Fasilitas from './Fasilitas';
import Peta from './Peta';
import email from '../assets/img/email.png'
import map from '../assets/img/map.png'
import phone from '../assets/img/phone.png'

const TentangKami = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div>
              <h1 id="tentangkami"> </h1>
            </div>
            <div className="text-center tentangkami">
              <h1>
                <span className="font1">TENTANG</span>
                <span className="font2 ms-3">HOTELO</span>
              </h1>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
              <h6 className='text-start font3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h6>
            </div>
            <div className="text-center mt-5">
              <h2>
                <span className="font4">GALERI</span>
                <span className="font5 ms-2">HOTELO</span>
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="galeri mt-4">
          <div className="pics">
            <Image src={glri1} alt="Gambar 1" fluid />
          </div>
          <div className="pics">
            <Image src={glri5} alt="Gambar 2" fluid />
          </div>
          <div className="pics">
            <Image src={glri3} alt="Gambar 3" fluid />
          </div>
          <div className="pics">
            <Image src={glri4} alt="Gambar 4" fluid />
          </div>
          <div className="pics large">
            <Image src={glri6} alt="Gambar 6" fluid />
          </div>
          <div className="pics large">
            <Image src={glri2} alt="Gambar 7" fluid />
          </div>
        </div>
      </Container>
      <Container className='d-flex justify-content-center'>
        <Row>
          <Col>
            <div className="text-center jeniskamar" id='reservasi'>
              <h1>
                <span className="font1">JENIS</span>
                <span className="font2 ms-3">KAMAR</span>
              </h1>
              <hr style={{ marginTop: '10px', borderTop: '4px solid #B27B0E', width: '80px', marginLeft: '520px' }} />
            </div>
            <div className="text-center mt-5">
              <JenisKamar/>
            </div>
            <div className='text-center mt-5'>
              <h1 className='pb-5'>
                <span className="font2">FASILITAS HOTEL</span>
              </h1>
              <hr style={{marginTop:'-45px', marginBottom:'60px', borderTop: '4px solid #B27B0E', width: '80px', marginLeft: '520px' }} />
              <div>
                <Fasilitas/>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div className="text-center mt-5">
              <h1>
                <span className="font1">LOKASI</span>
              </h1>
            </div>
            <div className=" mt-5">
              <Peta/>
            </div>
          </Col>
        </Row>
      </Container>
      <Container style={{marginLeft:'240px', marginTop:'140px' ,width: '880px'}}>
        <Row>
          <Col>
            <div>
              <h3 className='font4'>KONTAK KAMI</h3>
              <Row className='mt-5'>
                <Col xs={2}>
                  <Image style={{marginTop:'-4px'}} src={map} alt="Gambar 1" fluid />
                </Col>
                <Col xs={10} className='fontfoot'>
                  <p>Jl. Soekarno No. 23, Manado, Indonesia</p>
                </Col>
              </Row>
              <Row style={{marginTop:'24px'}}>
                <Col xs={2}>
                  <Image style={{marginTop:'-4px'}} src={email} alt="Gambar 2" fluid />
                </Col>
                <Col xs={10} className='fontfoot'>
                  <p>hotelolux1reserv23@gmail.com</p>
                </Col>
              </Row>
              <Row style={{marginTop:'28px'}}>
                <Col xs={2}> 
                  <Image style={{marginTop:'-4px'}} src={phone} alt="Gambar 3" fluid />
                </Col>
                <Col xs={10} className='fontfoot'> 
                  <p>+62 23 123 456</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="akses-hotel">
              <h3 className='font4 mb-5'>AKSES HOTEL</h3>
              <p className='fontfoot'>8 km dari Bandara Udara Internasional Sam Ratulangi</p>
              <p className='fontfoot'>Akses mudah ke pusat perbelanjaan, kafe, restoran, bar, dan tempat ibadah</p>
              <p className='fontfoot'>Nyaman untuk menuju ke kota dan daerah disekitarnya</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TentangKami;
