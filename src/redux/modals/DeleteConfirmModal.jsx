import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteConfirmModal({ userId, message, onClose }) {

    const [show, setShow] = useState(true); // Assuming the modal is always shown when this component is rendered
    
    return(
        <>
            <Modal style={{ height: 'fit-content' }} show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Delete Confirmation for User ID: {userId}</p>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}