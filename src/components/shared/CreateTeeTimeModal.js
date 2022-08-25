import { Modal } from 'react-bootstrap';

import Button from '@mui/material/Button';

const CreateTeeTimeModal = (props) => {
	const { 
        msgAlert, 
        user,
        showAddTeeTimeModal,
        setShowAddTeeTimeModal
     } = props
	// console.log('props in Home:', props)

	return (
        <>
            <Button 
                size="small"
                color='success'
                style={{fontWeight: 'bold', marginBottom: 10}}
                onClick={() => setShowAddTeeTimeModal(true)}
                >
                    Post a new tee time
            </Button>

            <Modal
                size="lg"
                show={showAddTeeTimeModal}
                onHide={() => setShowAddTeeTimeModal(false)}
                backdrop={'static'}
            >
                <Modal.Header closeButton
                    style={{ backgroundColor: 'rgb(177, 177, 177)' }} />
                <Modal.Body
                    style={{ backgroundColor: 'whitesmoke' }}
                >
                    Body of modal to add tee time to database...
                </Modal.Body>
            </Modal>
        </>
	)
}

export default CreateTeeTimeModal