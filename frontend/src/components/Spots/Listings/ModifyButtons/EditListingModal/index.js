import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditListingForm from './EditListingForm'

function EditListingFormModal({ userSpotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit_button' onClick={() => setShowModal(true)}><i className="fa-solid fa-arrows-rotate"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListingForm userSpotId={userSpotId} onSubmit={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditListingFormModal;