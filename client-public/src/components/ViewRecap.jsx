import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
const ViewRecap = () => {
    return(
        <Container>
            <h3 className="mt-4">Data Pemilih dan Penggunaan Hak Pilih</h3>
            <Table striped bordered hover className='mt-3'>
                <thead className="bg-dark text-light">
                    <tr>
                        <th className="w-75">Uraian</th>
                        <th>Jumlah (L + P)</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>Pemilih Terdaftar (DPT)</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Pengguna Hak Pilih</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover className='mt-3'>
                <thead className="bg-dark text-light">
                    <tr>
                        <th className="w-75">Uraian</th>
                        <th>Suara Sah</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>Paslon 01</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Paslon 02</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover className='mt-3'>
                <thead className="bg-dark text-light">
                    <tr>
                        <th className="w-75">Uraian</th>
                        <th>Suara Sah</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>Jumlah Seluruh Suara Sah</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Jumlah Suara Tidak Sah</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Jumlah Seluruh Suara Sah dan Tidak Sah</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </Table>
            <h4>URL Form C1</h4>
            <a href="https://google.com">lihat form c1</a>
        </Container>
    )
}

export default ViewRecap;