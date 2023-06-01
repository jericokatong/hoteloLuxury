import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/baru.css';

const Baru = () => {
  return (
    <div className='dash'>
      <header className="headerStyle">
        <h6 className='ms-4 mt-2'>Tambah Transaksi</h6>
      </header>
      <h3 className='a'>Silakan masukkan data pelanggan dengan benar.</h3>
      <div className="formContainer">
        <Form>
          <Form.Group controlId="fullName" className="form-group-inline mt-5">
            <Form.Label>Nama lengkap:</Form.Label>
            <Form.Control type="text" className="form-control-width custom-input" />
          </Form.Group>
          <Form.Group controlId="email" className="form-group-inline mt-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" className="form-control-width custom-input" />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="form-group-inline mt-3">
            <Form.Label>No Hp:</Form.Label>
            <Form.Control type="tel" className="form-control-width custom-input" />
          </Form.Group>
          <div className="form-group-row">
            <Form.Group controlId="roomType" className="form-group-inline mt-3">
              <Form.Label>Jenis Kamar:</Form.Label>
              <Form.Control as="select" className="form-control-medium1-width custom-input">
                <option>Standard Room</option>
                <option>Superior Room</option>
                <option>Deluxe Room</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="numberOfRooms" className="form-group-kanan mt-3">
              <Form.Label className='tm2'>Jumlah Kamar:</Form.Label>
              <Form.Control type="number" className="form-control-medium2-width custom-input" />
            </Form.Group>
          </div>
          <div className="form-group-row">
            <Form.Group controlId="checkInDate" className="form-group-inline mt-3">
              <Form.Label>Check-in:</Form.Label>
              <Form.Control type="date" className="form-control-small1-width custom-input" />
            </Form.Group>
            <Form.Group controlId="checkOutDate" className="form-group-kanan mt-3">
              <Form.Label className='ts2'>Check-out:</Form.Label>
              <Form.Control type="date" className="form-control-small2-width custom-input" />
            </Form.Group>
          </div>
          <Button type="submit" variant="warning" className="custom-button mb-5 mt-3">Simpan</Button>
        </Form>
      </div>
    </div>
  );
};

export default Baru;
