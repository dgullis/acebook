import { Link } from "react-router-dom"
import './SearchResultsDropDown.css'
import { useEffect, useRef } from "react"

// Component
export default function SearchResultsDropDown( { foundUsers, setShowSearchResults } ) {
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Checks if click event occured outside component
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSearchResults(false) // Close the search results dropdown
            }
        }
        // Adds event listener for mousedown clicks and passed event to function
        document.addEventListener('mousedown', handleClickOutside)
        
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
            }, [dropdownRef])

        
    return (
        <div ref={dropdownRef} className="search-results">
        
        {/* if no users found displays message */}
        {foundUsers.length === 0 ?
        <div className="no-users-found"> 
            No users found
        </div>
            :
            <>
            {/* if user(s) found from search displays results showing user profile image and username as clickable link to their profile */}
            {foundUsers.map((user) => {
                return ( 
                    <Link to={`/users/${user.username}`} className="found-user" key={user._id}>
                
                    <div className="user-image-container">
                        <img  className="user-image" src={user.image}></img>
                    </div>
                    <div className="user-name-link">
                            {user.username}
                    </div>
                    
                    </Link>
                )
            }
            )}
            </>

            }
        </div>

    )


}
