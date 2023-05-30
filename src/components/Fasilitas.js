import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const Fasilitas = () => {
  const cardData = [
    {
      title: 'Restoran',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'fslts1.jpg',
    },
    {
      title: 'Akses Rooftop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'fslts2.jpg',
    },
    {
      title: 'Gym',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'fslts3.jpg',
    },
    {
      title: 'Kolam Renang',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'fslts4.jpg',
    },
  ];

  return (
    <Container>
      <Row className="mt-3">
        {cardData.map((card, index) => (
          <React.Fragment key={index}>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <Row>
                <Col xs={12}>
                  <Image src={require(`../assets/img/${card.image}`)} alt={`Gambar ${index + 1}`} fluid style={{ maxWidth: '80%', padding: '20px' }} />
                </Col>
              </Row>
            </Col>
            <Col md={6} className="d-flex align-items-start">
              <Row>
                <Col xs={12} className="mb-4">
                  <Card className="border-0 bg-transparent">
                    <Card.Body className="d-flex align-items-start">
                      <div style={{ marginLeft: '-100px', marginRight: '80px' }}>
                        <Card.Title style={{ color: '#5C5C5C', fontFamily: 'Poppins Medium' }}>{card.title}</Card.Title>
                        <Card.Text style={{ color: '#5C5C5C', fontFamily: 'Poppins Regular', marginTop:'30px' }}>
                          {card.description}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <hr style={{ marginTop: '20px', borderTop: '2px solid #5C5C5C', width: '879px', marginLeft: '130px' }} />
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
}

export default Fasilitas;
