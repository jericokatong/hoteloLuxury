import React from 'react';
import { Button, Table } from 'react-bootstrap';
import '../styles/pending.css';

const Pending = () => {

  const data = [
    {
      no: '1',
      checkIn: ['02/04/2023'],
      checkOut: ['04/04/2023'],
      jumlahKamar: ['2'],
      tipeKamar: ['Standard Room'],
      nama: ['Adzana Shaliha'],
      noHp: ['08123456789'],
      email: ['adzana@gmail.com'],
    },
    {
      no: '2',
      checkIn: ['03/04/2023'],
      checkOut: ['08/04/2023'],
      jumlahKamar: ['1'],
      tipeKamar: ['Deluxe Room'],
      nama: ['Fureya'],
      noHp: ['08123456789'],
      email: ['fureya@gmail.com'],
    },
  ];

   return (
    <div className='dash'>
      <header className="headerStyle">
        <h6 className='ms-4 mt-2'>Menunggu Konfirmasi</h6>
      </header>
      <h3 className='a'>Berikut daftar pelanggan yang menunggu konfirmasi.</h3>
      <Table striped bordered hover className="tabel">
        <thead className='head'>
          <tr>
            <th>No</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Jumlah Kamar</th>
            <th>Tipe Kamar</th>
            <th>Nama</th>
            <th>No Hp</th>
            <th>Email</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.no}>
              <td className='no'>{item.no}</td>
              <td className='body'>{item.checkIn[0]}</td>
              <td className='body'>{item.checkOut[0]}</td>
              <td className='body'>{item.jumlahKamar[0]}</td>
              <td className='body'>{item.tipeKamar[0]}</td>
              <td className='body'>{item.nama[0]}</td>
              <td className='body'>{item.noHp[0]}</td>
              <td className='body'>{item.email[0]}</td>
              <td className='body'>
                <div className="button-group">
                  <Button variant="warning" className="confirm" size="sm">
                    Confirm
                  </Button>{" "}
                  <Button variant="warning" size="sm" className="delete">
                    Delete
                  </Button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pending;
