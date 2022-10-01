import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditReviewForm from './EditReviewForm'

function EditReviewFormModal({ userReviewId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm userReviewId={userReviewId}/>
                </Modal>
            )}
        </>
    );
}

export default EditReviewFormModal;