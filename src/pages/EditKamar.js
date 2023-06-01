import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/editkamar.css';

const EditKamar = () => {
  return (
    <div className='dash'>
      <header className="headerStyle">
        <h6 className='ms-4 mt-2'>Edit Data Kamar</h6>
      </header>
      <div className="formContainer">
        <Form>
          <Form.Group controlId="namaKamar" className="form-group-inline mt-5">
            <Form.Label>Nama Kamar:</Form.Label>
            <Form.Control type="text" className="form-control-width custom-input" />
          </Form.Group>
          <Form.Group controlId="harga" className="form-group-inline mt-4">
            <Form.Label>Harga:</Form.Label>
            <Form.Control type="number" className="form-control-width custom-input" />
          </Form.Group>
          <div className="form-group-row">
            <Form.Group controlId="jumlahKamar" className="form-group-inline mt-4">
              <Form.Label>Jumlah Kamar:</Form.Label>
              <Form.Control type="number" className="form-control-medium1-width custom-input" />
            </Form.Group>
            <Form.Group controlId="editGambar" className="form-group-kanan mt-4">
              <Form.Label className='tm2'>Edit Gambar:</Form.Label>
              <Form.Control type="file" className="form-control-medium2-width custom-input" />
            </Form.Group>
          </div>
          <Button type="submit" variant="warning" className="custom-button mb-5 mt-4">Simpan</Button>
        </Form>
      </div>
    </div>
  );
};

export default EditKamar;
