import { useState } from 'react';
import { createPost } from '../../services/posts'
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'
import './NewPost.css'


const NewPost = ( {token, userId, toggleStateChange, userImg} ) => {
    const [postMessage, setPostMessage] = useState('');
    const [file, setFile] = useState(null)
    const [uploadImage, setuploadImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [uploadedImage, setUploadedImage] = useState(null)
    const [firebaseURL, setFirebaseURL] = useState("")
    console.log("userId1", userId)


    
    const uploadImageFirebase = () => {
        const imageRef = ref(storage, `post-images/${file.name + v4()}`)
        uploadBytes(imageRef, file)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((downloadURL) => {
                        const formData = new FormData();
                        formData.append('postMessage', postMessage);
                        console.log("userId2", userId)
                        console.log("imageURL", downloadURL)
                        formData.append('userId', userId);
                        formData.append('imageURL', downloadURL);
                        console.log("image formdata", formData.userId)

                        createPost(token, userId, downloadURL, postMessage)
                            .then(res => {
                                // console.log(res)
                                setPostMessage('')
                                setFile(null)
                                setErrorMessage('')
                                setuploadImage(false)
                                setUploadedImage(null)
                                setFirebaseURL("")
                                toggleStateChange()

                            })
                            .catch(error => {
                                console.log('error submitting post', error)
                            })   

                    })
                    .catch((error) => {
                        console.error("error getting download URL:", error)
                    })
            })
            .catch((error) => {
                console.error("error uploading image", error)
            })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(!file && !postMessage){
            return alert("cannot post empty comment")
        } 
        
        if (file) {
            uploadImageFirebase()
        } else {
            const formData = new FormData();
            formData.append('postMessage', postMessage);
            formData.append('userId', userId);

            createPost(token, formData)
                .then(res => {
                    // console.log(res)
                    setPostMessage('')
                    setFile(null)
                    setErrorMessage('')
                    setuploadImage(false)
                    setUploadedImage(null)
                    setFirebaseURL("")
                    alert("Image Uploaded")
                    toggleStateChange()

                })
                .catch(error => {
                    console.log('error submitting post', error)
                })   

            


        }

    }

    const handleUploadImageClick = () => {
        setuploadImage(!uploadImage)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setUploadedImage(URL.createObjectURL(e.target.files[0]))
    }

    const closeImage = () => {
        setUploadedImage(null)
    }

    
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