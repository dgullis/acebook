import './ConfirmDeleteModal.css'

export default function ConfirmDeleteModal({ handleDeletePostTrue, handleDeletePostFalse }) {

    
    return (

        <div className="confirm-delete-modal">
            <div className="confirm-delete-modal-overlay" onClick={handleDeletePostFalse}>
                <div className="confirm-delete-modal-content">
                    <div className="confirm-delete-modal-text">
                    Delete post?
                    </div>
                    <div className="confirm-delete-modal-options">
                        <div className="confirm-delete-modal-button-container">
                            <button
                                type="button"
                                onClick={handleDeletePostTrue}>
                                Yes
                            </button>
                        </div>
                        <div className="confirm-delete-modal-button-container">
                            <button
                                type="button"
                                onClick={handleDeletePostFalse}>
                                No
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        
    )
}