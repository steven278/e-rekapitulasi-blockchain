import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

const FormModal = ({load, show, trxResult, txHash, handleClose}) => {
    const modalHeader = () => {
        if(load){
            return(
                <Modal.Header className="bg-secondary light login-modal-close">
                </Modal.Header>
            )
        }else{
            return(
                <Modal.Header closeButton className={`${trxResult.status ? 'bg-success': 'bg-danger'} light login-modal-close`}>
                </Modal.Header>
            )
        }
    }
    const modalMessage = () => {
        if(load){
            return (
                <Modal.Body >
                    <Row className='mb-3 mt-3 d-flex justify-content-center'>
                        <Spinner style={{textAlign:'center'}} animation="border" variant="secondary" />
                    </Row>
                    <Row className='mt-3 mb-2'>
                        <h4 className="d-flex justify-content-center 'text-secondary" >
                            Menunggu Konfirmasi
                        </h4>
                    </Row>
                    <h6 className="mt-4" style={{textAlign:'center'}}>Cek Hash Transaksi: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">Lihat di Etherscan</a></h6>
                </Modal.Body>
            )
        }else{
            return(
                <Modal.Body >
                    <Row className='mb-3 mt-2'>
                        {trxResult.status == true ?
                        <TiTick size={80} style={{color:'green'}}/> :
                        <ImCross size={50} style={{color:'red'}}/> 
                        }
                    </Row>
                    <Row className='mt-3 mb-2'>
                        <h4 className={`d-flex justify-content-center ${trxResult.status ? 'text-success' : 'text-danger'}`}>
                            {trxResult.status == true ? 'Registrasi Wallet Berhasil' : 'Registrasi Wallet Gagal'}
                        </h4>
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
            {modalHeader()}
            {modalMessage()}
        </Modal>
    )
}

export default FormModal;