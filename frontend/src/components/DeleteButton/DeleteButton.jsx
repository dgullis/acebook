
import './ConfirmDeleteModal.css'
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from 'react';
import { deleteThePost } from '../../services/posts';

// Component renders a delete button and handles deletion of post after triggering a modal asking user to confirm delete action
const DeleteButton = (props) => {
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // State to track visibility of the confirmation modal
    
    const handleDeletePostTrue = async () => {
        try {
            const result = await deleteThePost(props.postID, props.token); // Attempt to delete the post
            setConfirmDeleteModal(false); // Close the confirmation modal after deletion
            props.toggleStateChange && props.toggleStateChange() // Trigger state change of feedpage
            props.userPageRender && props.userPageRender() // Trigger state change of user page
		} catch (error) {
			console.error("Error deleting post:", error); // Log error if deletion fails
		}
	};


    const handleDeletePost = () => {
        setConfirmDeleteModal(true) // Show the confirmation modal
    }

    const handleDeletePostFalse = () => {
        setConfirmDeleteModal(false) // Hide the confirmation modal
    }

    return props.showButton ? (
        <>
        <button onClick={handleDeletePost}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        { confirmDeleteModal && 
            <ConfirmDeleteModal 
                handleDeletePostTrue={handleDeletePostTrue}
                handleDeletePostFalse={handleDeletePostFalse}
            />
        }
        </>
    ) : null;

};

export default DeleteButton;
