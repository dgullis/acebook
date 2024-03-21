import "./EditProfilePictureModal.css"
import { useState, useEffect } from "react";
import { uploadImage } from "../../services/user";
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'

// Component renders an input button which allows a user to choose a new image for their profile image.
export default function EditProfilePictureModal({image, username, toggleEditPictureModal, userPageRender}) {
    const [modal, setModal] = useState(false)
    const [file, setFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")

    const handleUpload = () => {
        const formData = new FormData();
        if(file){
            formData.append('file', file) // Appending the selected file to the FormData object
        } else {
            console.log("error rror")
                return setErrorMessage("No file selected") // Display error if no file is selected
            }
        
        // Creates a reference to the storage location for the image.
        // Creates unique name for file using filename + a random UUID 
        const imageRef = ref(storage, `user-images/${file.name + v4()}`) 
        uploadBytes(imageRef, file)
        .then(() => {
            getDownloadURL(imageRef) // gets imageURL from firebase storage
                .then((downloadURL) => {
                    uploadImage(username, downloadURL) // Attempts to update profile image URL for user
                        .then(res => res.json())
                        .then(data => {
                            console.log(data.image)
                            const user = JSON.parse(window.localStorage.getItem("user"))
                            user.image = data.image
                            window.localStorage.setItem("user", JSON.stringify(user));
                            setFile(null)
                            setErrorMessage('')
                            toggleEditPictureModal()
                            userPageRender()
            });


                })})
        
    
    const toggleModal = () => {
        setModal(!modal)
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]) // Updates file state when gile selected
    }

    // useEffect hook to trigger image upload when file state changes
    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]); 


    return (
        <>
            <div className="upload-profile-piture-containter">

            <div className="image-input">
            <label htmlFor="file-upload" className="upload-profile-picture-custom-file-upload">
            Choose image
            </label>
                <input
                    id="file-upload"
                    className="upload-profile-picture-choose-file" 
                    type="file" 
                    name="file" 
                    accept="image/png, image/jpeg" 
                    onChange={handleFileChange}
                    />
                
            </div>
                
            </div>
        </>
    )

    

}