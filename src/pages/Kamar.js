import React from 'react';
import { Button, Table } from "react-bootstrap";
import '../styles/kamar.css'

const Kamar = () => {

  const data = [
    {
      no: '1',
      jenisKamar: 'Standar Room',
      harga: '200,000',
      jumlah: '15',
    },
    {
      no: '2',
      jenisKamar: 'Superior Room',
      harga: '250,000',
      jumlah: '10',
    },
    {
      no: '3',
      jenisKamar: 'Deluxe Room',
      harga: '320,000',
      jumlah: '8',
    },
  ];

  return (
    <div className='dash'>
    
      <header className="headerStyle">
        <h6 className='ms-4 mt-2'>Data kamar</h6>
        <Button variant="warning" size="sm" className="ms-auto me-5 add">Tambah Data</Button>{" "}
      </header>
      <Table striped bordered hover className="tabel">
        <thead className='head'>
          <tr>
            <th>No</th>
            <th>Jenis Kamar</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.no}>
              <td className='no'>{item.no}</td>
              <td className='body'>{item.jenisKamar}</td>
              <td className='body'>{item.harga}</td>
              <td className='body'>{item.jumlah}</td>
              <td className='body'>
                <Button variant="warning" className="edit" size="sm">
                    Edit
                </Button>{" "}
                <Button variant="warning" size="sm" className="ms-3 delete">
                    Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Kamar;
