import { useState } from 'react';
import { createPost } from '../../services/posts'
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'
import './NewPost.css'


const NewPost = ( {token, userId, toggleStateChange, userImg} ) => {
    const [postMessage, setPostMessage] = useState(''); // State variable to manage new post text
    const [file, setFile] = useState(null) // State variable to manage uploaded file
    const [uploadImage, setUploadImage] = useState(false) // State variable to manage uploading selected image
    const [errorMessage, setErrorMessage] = useState("") // State variable to manage error messages
    const [uploadedImage, setUploadedImage] = useState(null) // STate variable to manage uploaded image

    const uploadImageFirebase = () => {
        // Creates a reference to the storage location for the image.
        // Creates unique name for file using filename + a random UUID e.g. abcd1234
        const imageRef = ref(storage, `post-images/${file.name + v4()}`)
        uploadBytes(imageRef, file)
            .then(() => {
                getDownloadURL(imageRef) // gets imageURL from firebase storage
                    .then((downloadURL) => {
                        createPost(token, userId, downloadURL, postMessage) // attempts to create new post with text / image
                            .then(res => {
                                setPostMessage('') // Clears state
                                setFile(null) // Sets state for uploaded file to null
                                setErrorMessage('') // Clears statue
                                setUploadImage(false) // Clears state
                                setUploadedImage(null) // Sets state for uploaded image to null
                                toggleStateChange() // Triggers re render of feed page

                            })
                            .catch(error => {
                                console.log('error submitting post', error) // Logs error if unable to create new post
                            })   

                    })
                    .catch((error) => {
                        console.error("error getting download URL:", error) // Logs error if unable to retriieve image URL from firebase
                    })
            })
            .catch((error) => {
                console.error("error uploading image", error) // Logs error if error uploading image to firebase
            })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(!file && !postMessage){
            return alert("cannot post empty comment") // Alert warning if no image selected and no text input
        } 
        
        if (file) {
            uploadImageFirebase() // If file chosen for post, post is created with this function
        } else {
            createPost(token, userId, null, postMessage) // attempts to create new post with just text (null represent no image with post)
                .then(res => {
                    setPostMessage('')
                    setFile(null)
                    setErrorMessage('')
                    setUploadImage(false)
                    setUploadedImage(null)
                    toggleStateChange()

                })
                .catch(error => {
                    console.log('error submitting post', error) // Logs error if unable to create new post
                })   
        }

    }

    // const handleUploadImageClick = () => {
    //     setuploadImage(!uploadImage)
    // }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]) // Sets state to selected image
        setUploadedImage(URL.createObjectURL(e.target.files[0])) // Sets state to selected image
    }

    const closeImage = () => {
        setUploadedImage(null) // Sets state to null 
    }

    {/* returns container displaying current user image, text box, button to upload image, button to post*/}
    return (
        <div className="new-post-container">
            <form onSubmit={handleSubmit}>
                <div className="text-area-container">
                <div className="circle">
                    <img src={userImg}></img>
                </div>
                    <textarea
                        className="new-post-text-area"
                        name="text"
                        value = {postMessage}
                        placeholder="make a new post..."
                        onChange={(message) => setPostMessage(message.target.value)}
                    >
                    </textarea>
                    {uploadedImage &&
                    <div className="uploaded-image-container">
                        <img src={uploadedImage} />
                    </div>
                    }
                    
                    
                </div>

                <div className="new-post-options">
                <div className="image-button-container">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa-solid fa-image"></i>
                            Upload Image
                        </label>
                        <input className="newpost-choose-file"
                            id="file-upload"
                            type="file" 
                            name="file"
                            accept="image/png, image/jpeg" 
                            onChange={handleFileChange}
                        />
                        {uploadedImage && 
                        <div className="delete-image-button-container">
                            <button type='button' className="delete-image-button" onClick={closeImage}>Delete Image</button>
                        </div>
                        }

                </div>
            
                    <div className="post-button-container">
                        <button type='submit' className="post-button">Post</button>
                    </div>
                </div>
                
                {errorMessage && errorMessage}
            </form>
        </div>
    )


};

export default NewPost;