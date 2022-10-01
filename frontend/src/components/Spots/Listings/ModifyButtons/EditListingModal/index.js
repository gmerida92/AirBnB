import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditListingForm from './EditListingForm'

function EditListingFormModal({ userSpotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListingForm userSpotId={userSpotId} />
        </Modal>
      )}
    </>
  );
}

export default EditListingFormModal;