import React from "react";
import { useState } from "react";
import "./EditUserModal.css"
import EditProfilePictureModal from "../EditProfilePictureModal/EditProfilePictureModal";
import EditBioModal from "../EditBioModal/EditBioModal";
import User from "../User/User";

export default function EditUserModal( {username, image, handleImageUpdate, handleBioUpdate, triggerStateChange, bio}) { 
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
            Edit profile
        </button>

        {modal && (

            <div className="edit-user-modal">
            
                <div 
                    onClick={toggleModal}
                    className="edit-user-modal-overlay">
                </div>
                
                <div className="edit-user-modal-content">
                    <div className="content-header">
                        Edit profile
                    </div>
                    
                    <div className="profile-picture">
                        <div className="header">
                        Profile picture
                        </div>

                        <div className="user-image-container">
                            <div className="image-container">
                                <img src={image} alt="Profile Picture" />
                            </div>
                            <div className="edit-button-container">
                                {editPictureModal ? (
                                    null
                                ) : (
                                    <button className="edit-button"
                                    onClick={toggleEditPictureModal}
                                >Edit</button>
                                )} 

                                
                            </div>

                            {editPictureModal && 
                            <div>
                                <EditProfilePictureModal 
                                    username={username}
                                    toggleEditPictureModal={toggleEditPictureModal}
                                    handleImageUpdate={handleImageUpdate}
                                    triggerStateChange={triggerStateChange}
                                /> 
                                <div className="back-button-container">
                                    <button
                                        onClick={toggleEditPictureModal}
                                    >Back</button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    
                    <div className="bio">
                        <div className="header">
                            Bio
                        </div>

                        {editBioModal ? (null) : (
                            <div className="edit-button-container">
                            <button className="edit-button"
                                onClick={toggleEditBioModal}
                            >
                                Edit
                            </button>
                        </div>
                        ) }
                        

                        {editBioModal && 
                            <div>
                            <EditBioModal 
                                username={username}
                                bio={bio}
                                toggleEditBioModal={toggleEditBioModal}
                                handleBioUpdate={handleBioUpdate}
                                triggerStateChange={triggerStateChange}
                            />
                            
                            <div className="back-button-container">
                                <button onClick={toggleEditBioModal}>
                                Back
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

