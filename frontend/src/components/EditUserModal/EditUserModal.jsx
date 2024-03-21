import React from "react";
import { useState } from "react";
import "./EditUserModal.css"
import EditProfilePictureModal from "../EditProfilePictureModal/EditProfilePictureModal";
import EditBioModal from "../EditBioModal/EditBioModal";
import User from "../User/User";

// Component, modal displaying current user profile image and buttons to edit their profile image and bio
export default function EditUserModal( {username, image, handleImageUpdate, handleBioUpdate, userPageRender, bio}) { 
    const [modal, setModal] = useState(false) // State to manage modal visibility
    const [editPictureModal, setEditPictureModal] = useState(false) // State to manage visibility of EditProfileImage modal
    const [editBioModal, setEditBioModal] = useState(false) // State to manage visibility of EditBio modal
    
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
                                    userPageRender={userPageRender}
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
                                userPageRender={userPageRender}
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

