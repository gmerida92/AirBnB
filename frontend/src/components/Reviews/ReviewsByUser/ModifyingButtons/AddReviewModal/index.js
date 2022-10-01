import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import AddReviewForm from './AddReviewForm'

function AddReviewFormModal({ loadSpotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddReviewForm loadSpotId={loadSpotId}/>
                </Modal>
            )}
        </>
    );
}

export default AddReviewFormModal;