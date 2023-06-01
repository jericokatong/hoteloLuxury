import React from 'react';
import { Button, Table } from "react-bootstrap";
import '../styles/dashboarddp.css'

const DashboardDP = () => {

  const data = [
    {
      no: '1',
      profil: 'default',
      nama: 'Adzana Shaliha',
      email: 'adzana@gmail.com',
      noHp: '081234567890',
      akses: 'User',
    },
    {
      no: '2',
      profil:'default',
      nama: 'Admin',
      email: 'adminhotelo@gmail.com',
      noHp: '081234567891',
      akses: 'Admin',
    },
    {
      no: '3',
      profil: 'default',
      nama: 'Acel',
      email: 'acel@gmail.com',
      noHp: '081234567892',
      akses: 'User',
    },
  ];

  return (
    <div className='dash'>
      <header className="headerStyle">
        <h6 className='ms-4 mt-2'>Data pengguna</h6>
        <Button variant="warning" size="sm" className="ms-auto me-5 add">Tambah Data</Button>{" "}
      </header>
      <Table striped bordered hover className="tabel">
        <thead className='head'>
          <tr>
            <th>No</th>
            <th>Profil</th>
            <th>Nama Lengkap</th>
            <th>Email</th>
            <th>No Hp</th>
            <th>Akses</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.no}>
              <td className='no'>{item.no}</td>
              <td className='body'>{item.profil}</td>
              <td className='body'>{item.nama}</td>
              <td className='body'>{item.email}</td>
              <td className='body'>{item.noHp}</td>
              <td className='body'>{item.akses}</td>
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

export default DashboardDP;