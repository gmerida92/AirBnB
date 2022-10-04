import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import AddListingForm from './AddListingForm'

function AddListingFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddListingForm onSubmit={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default AddListingFormModal;