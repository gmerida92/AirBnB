import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm.js';


function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='signup_user_button' onClick={() => setShowModal(true)}>Sign up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;