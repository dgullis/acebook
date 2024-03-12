
import './ConfirmDeleteModal.css'
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import './DeleteButton.css'
import { useState } from 'react';
import { deleteThePost } from '../../services/posts';

const DeleteButton = (props) => {
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    
    const handleDeletePostTrue = async () => {
        try {
            const result = await deleteThePost(props.postID, props.token);
            console.log(result)
            setConfirmDeleteModal(false);
            props.toggleStateChange()
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};


    const handleDeletePost = () => {
        setConfirmDeleteModal(true)
    }

    const handleDeletePostFalse = () => {
        setConfirmDeleteModal(false)
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
