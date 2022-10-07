import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal';
import EditReviewForm from './EditReviewForm'

function EditReviewFormModal({ userReviewId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit_button' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm userReviewId={userReviewId} onSubmit={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditReviewFormModal;