import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

const FormModal = ({load, show, trxResult, txHash, handleClose}) => {
    const modalMessage = () => {
        if(load){
            return (
                <Modal.Body >
                    <Row className='mb-3 mt-3 d-flex justify-content-center'>
                        <Spinner style={{textAlign:'center'}} animation="border" variant="secondary" />
                    </Row>
                    <h6 className="mt-4" style={{textAlign:'center'}}>Cek Hash Transaksi: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">Lihat di Etherscan</a></h6>
                </Modal.Body>
            )
        }else{
            return(
                <Modal.Body >
                    <Row className='mb-3'>
                        {trxResult.status == true ?
                        <TiTick size={80} style={{color:'green'}}/> :
                        <ImCross size={50} style={{color:'red'}}/> 
                        }
                    </Row>
                    <Row style={{display:'flex', justifyContent: 'center'}}>
                        {trxResult.status == true ? 'Rekapitulasi Berhasil' : 'Rekapitulasi Gagal'}
                    </Row>
                    <h6 className="mt-4" style={{textAlign:'center'}}>Cek Hash Transaksi : <a href={`https://sepolia.etherscan.io/tx/${trxResult.transactionHash}`} target="_blank">Lihat di Etherscan</a> </h6>
                </Modal.Body>
            )
        }
    }
    return(
        <Modal show={show} onHide={handleClose} backdrop="static"
            keyboard={false} aria-labelledby="contained-modal-title-vcenter"
            centered style={{margin:'2em'}} >
            <Modal.Header closeButton>
                <Modal.Title>{load ? 'Menunggu Konfirmasi' : 'Hasil Transaksi'}</Modal.Title>
            </Modal.Header>
            {modalMessage()}
        </Modal>
    )
}

export default FormModal;