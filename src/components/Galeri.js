import { Card, Button, Row, Col } from 'react-bootstrap';
import image1 from '../assets/img/image1.jpg';
import image2 from '../assets/img/image2.jpg';
import image3 from '../assets/img/image3.jpg';

const images = [
  image1,
  image2,
  image3
];

const Galeri = () => {
  const titles = ["STANDARD ROOM", "SUPERIOR ROOM", "DELUXE ROOM"];
  const cardText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <Row className="justify-content-center" style={{ marginTop: '20px', paddingBottom: '38px', marginLeft:'45px' }}>
      {images.map((image, index) => (
        <Col key={index} style={{ marginBottom: '20px' }}>
          <Card className="cardCustom" style={{ width: '280px'}}>
            <Card.Img variant="top" src={image} style={{ padding: '10px' }} />
            <Card.Body>
              <Card.Title style={{fontSize:'16px', marginTop:'-6px'}}>{titles[index]}</Card.Title>
              <Card.Text className='mt-2' style={{fontSize:'13px'}}>{cardText}</Card.Text>
              <div className="d-flex justify-content-center mb-2 mt-2">
                <Button size="sm" className="ms-3" style={{ backgroundColor: '#B27B0E', fontFamily: 'Poppins, sans-serif', color: '#FFF6C4', border: '#FFF6C4', padding: '2px 5px', fontSize: '10px' }}>Book Sekarang</Button>
                <Button size="sm" className="ms-3" style={{ backgroundColor: '#FFF', border: '1px solid #B27B0E', fontFamily: 'Poppins, sans-serif', color: '#B27B0E', padding: '2px 5px', fontSize: '10px' }}>Info Selengkapnya</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Galeri;
