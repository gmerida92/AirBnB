import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditReviewForm from './EditReviewForm'

function EditReviewFormModal({ userReviewId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}><i className="fa-solid fa-arrows-rotate"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm userReviewId={userReviewId} onSubmit={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditReviewFormModal;