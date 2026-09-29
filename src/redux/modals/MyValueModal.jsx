import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setModalReturnValue } from '../modalSlice';

const MyValueModal = ({ onClose }) => {

  const [show, setShow] = useState(true); // Assuming the modal is always shown when this component is rendered
  const [inputValue, setInputValue] = useState(); // State to hold the input value
  const dispatch = useDispatch();

  const handleSave = () => {
    // Dispatch the action with the value
    dispatch(setModalReturnValue(inputValue));
    // The reducer in step 1 can handle closing the modal, or you can call onClose() here
    setShow(false);
  };
  
  return (
    <>
    <Modal style={{ height: 'fit-content' }} show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter a value"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    </>
  );
};

export default MyValueModal;