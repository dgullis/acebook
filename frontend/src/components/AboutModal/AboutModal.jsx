import { useState } from "react"
import "./AboutModal.css"

export default function AboutModal() {
    const [showModal, setShowModal] = useState(false);


    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <>
        <div className="about-button-container" onClick={toggleModal}>
            <button id="about-button" type="button">
                About aceBook
            </button>
        </div>

        {showModal && 
        <div className="modal">
            <div className="overlay" onClick={toggleModal}>
                <div className="about-modal-content">
                    Completed during the Makers Academy software development Bootcamp.
                    This was a two-week, small group project, to create a
                    facebook clone from a skeleton legacy codebase.
                <ul>
                    <li>Dan Gullis - <a href="https://github.com/dgullis" target="_blank" rel="noopener noreferrer" className="custom-link">@dgullis</a></li>
                    <li>Simon Budden - <a href="https://github.com/fantastito" target="_blank" rel="noopener noreferrer" className="custom-link">@fantastito</a></li>
                    <li>Ed Gemmill - <a href="https://github.com/EdGemmill" target="_blank" rel="noopener noreferrer" className="custom-link">@EdGemmill</a></li>
                    <li>Nick Torkington - <a href="https://github.com/N1ckT0rk" target="_blank" rel="noopener noreferrer" className="custom-link">@N1ckT0rk</a></li>
                    <li>Thomas Powell - <a href="https://github.com/Tomtommx8" target="_blank" rel="noopener noreferrer" className="custom-link">@Tomtommx8</a></li>
                </ul>
                <button className="close-about-modal-button" onClick={toggleModal}>
                    Close
                </button>
                </div>
            </div>
        </div>
        }
        </>
    )
}

