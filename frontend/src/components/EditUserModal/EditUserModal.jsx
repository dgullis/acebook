import React from "react";
import { useState } from "react";
import "./EditUserModal.css"
import EditProfilePictureModal from "../EditProfilePictureModal/EditProfilePictureModal";
import EditBioModal from "../EditBioModal/EditBioModal";
import User from "../User/User";

export default function EditUserModal( {username, image, handleImageUpdate, handleBioUpdate, triggerStateChange}) { 
    const [modal, setModal] = useState(false)
    const [editPictureModal, setEditPictureModal] = useState(false)
    const [editBioModal, setEditBioModal] = useState(false)
    
    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleEditPictureModal = () => {
        setEditPictureModal(!editPictureModal)
    }

    const toggleEditBioModal = () => {
        setEditBioModal(!editBioModal)

    }

    return (
        <>
        <button 
        onClick={toggleModal}
        className="btn-modal">
            Edit Profile
        </button>

        {modal && (

            <div className="modal">
            
                <div 
                    onClick={toggleModal}
                    className="overlay">
                </div>
                
                <div className="modal-content">
                    <div className="content-header">
                        Edit Profile
                    </div>
                    
                    <div className="profile-picture">
                        <div className="header">
                        Profile Picture
                        </div>
                        <div className="user-image-container">
                            <div className="image-container">
                                <img src={image} alt="Profile Picture" />
                            </div>
                            <div className="edit-button-container">
                            <button className="edit-button"
                                onClick={toggleEditPictureModal}
                            >edit</button>
                            </div>

                            {editPictureModal && 
                            <div>
                                <EditProfilePictureModal 
                                    username={username}
                                    toggleEditPictureModal={toggleEditPictureModal}
                                    handleImageUpdate={handleImageUpdate}
                                    triggerStateChange={triggerStateChange}
                                /> 
                                <div className="button-container">
                                    <button
                                        onClick={toggleEditPictureModal}
                                    >close</button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    
                    <div className="bio">
                        <div className="header">
                            bio
                        </div>
                        <div className="edit-button-container">
                            <button className="edit-button"
                                onClick={toggleEditBioModal}
                            >
                                edit
                            </button>
                        </div>

                        {editBioModal && 
                            <div>
                            <EditBioModal 
                                username={username}
                                toggleEditBioModal={toggleEditBioModal}
                                handleBioUpdate={handleBioUpdate}
                                triggerStateChange={triggerStateChange}
                            />
                            
                            <div className="button-container">
                                <button onClick={toggleEditBioModal}>
                                    close
                                </button>
                            </div>
                            </div>
                        }

                    </div>
                    <button
                        className="close-modal"
                        onClick={toggleModal}>
                            Close
                    </button>
                </div>
            </div>

        )}

        </>

    )
}

