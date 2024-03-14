import { Link } from "react-router-dom"
import './SearchResultsDropDown.css'
import { useEffect, useRef } from "react"

export default function SearchResultsDropDown( { foundUsers, setShowSearchResults } ) {
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSearchResults(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
            }, [dropdownRef])

        
    return (
        <div ref={dropdownRef} className="search-results">

        {foundUsers.length === 0 ?
        <div className="no-users-found"> 
            No users found
        </div>
            :
            <>
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
