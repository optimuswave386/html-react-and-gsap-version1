import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function UserProfileModal({ user, onClose }) {
    
    const [show, setShow] = useState(true); // Assuming the modal is always shown when this component is rendered
    
    return (
        <>
        <Modal style={{ height: 'fit-content' }} show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>User Profile</p>
            <p>Name: {user.name}</p>
            { user.email && <p>Email: {user.email}</p> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    );

}