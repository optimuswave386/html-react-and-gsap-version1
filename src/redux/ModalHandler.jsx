import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';

// Import all possible modal components
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import UserProfileModal from './modals/UserProfileModal';
import MyValueModal from './modals/MyValueModal';

const MODAL_COMPONENTS = {
  'DELETE_CONFIRM': DeleteConfirmModal,
  'USER_PROFILE': UserProfileModal,
  'VALUE_MODAL': MyValueModal,
  /* other modals */
};

const ModalHandler = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };
  
  if (!isOpen || !modalType) {
    return null;
  }
  
  const SpecificModal = MODAL_COMPONENTS[modalType];

  if (!SpecificModal) {
    return null;
  }

  // Render the specific modal with its props and close handler
  return <SpecificModal {...modalProps} onClose={handleClose} />;
};

export default ModalHandler;