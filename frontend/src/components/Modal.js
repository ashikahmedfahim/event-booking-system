import React from 'react'
import './Modal.css'

const Modal = ({ title, children, onClose, onSave }) => {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <h2>{title}</h2>
                <div className='modal-content'>
                    {children}
                </div>
                <div className='modal-actions'>
                    <button onClick={onClose} className='modal-button'>Close</button>
                    <button onClick={onSave} className='modal-button'>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Modal