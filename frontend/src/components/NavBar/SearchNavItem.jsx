import { useState } from "react"
import { searchUsers } from "../../services/user"
import SearchResultsDropDown from "./SearchResultsDropDown"
import "./SearchNavItem.css"

export default function SearchNavItem( { handleSearch }) {
    const [searchUserInput, setSearchUserInput] = useState("") // State to manage user input in search box
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([]) // State the manage list of users found during search

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchUserInput(inputValue) // Updates the search input value
        searchUsers(inputValue) // Attempts to find users based on the current input value
            .then((data) => {
                setFoundUsers(data.result) // Update the found users list
                handleSearch(data.result) // Passes search results to function in navbar component
            })
            .catch((err) => {
                console.error(err);
                setFoundUsers([]); // Reset the found users list
                handleSearch([]); // Pass an empty array to function in navbar component
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        searchUsers(searchUserInput)
            .then((data) => {
                setFoundUsers(data.result)
                handleSearch(data.result)
            })
            .catch((err) => {
                console.error(err);
                setFoundUsers([])
                handleSearch(foundUsers)
            });
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input className="search-user-input" id="search-box" type="input"
                placeholder="Search user"
                value= {searchUserInput}
                onChange={handleInputChange}
                autoComplete="off"
            />
        </form>

        </>
    )



}