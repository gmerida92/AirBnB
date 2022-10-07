import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import AddReviewForm from './AddReviewForm'

function AddReviewFormModal({ loadSpotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='add_review_button' onClick={() => setShowModal(true)}><i class="fa-solid fa-plus"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddReviewForm loadSpotId={loadSpotId} onSubmit={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
}

export default AddReviewFormModal;