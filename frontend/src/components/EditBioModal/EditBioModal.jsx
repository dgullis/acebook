import "./EditBioModal.css"
import { useState } from "react";
import { editBio } from "../../services/user";

// Component renders a textarea with a users existing bio then can be edited and saved.
export default function EditBioModal(  {username, toggleEditBioModal, userPageRender, bio} ) {
    const [bioText, setBioText] = useState(bio) // State for storing bio text. Initially set to users existing bio.

    const handleSubmit = (event) => {
        event.preventDefault();
        editBio(bioText, username) // Attempts to store updated bio for user
            .then((res) => {
                console.log(res)
                toggleEditBioModal() // Closes modal
                userPageRender() // Triggers re-render of user page
                })
    }

    const handleChange = (event) => {
        setBioText(event.target.value)
    }

    return (

    <div className="edit-bio-modal">
        <form onSubmit={handleSubmit}>
            <textarea className="bio-textarea" value={bioText} onChange={handleChange} />
            <div className="submit-button-container">
                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    </div>
    )

}