import { useState } from "react"
import { searchUsers } from "../../services/user"
import SearchResultsDropDown from "./SearchResultsDropDown"
import "./SearchNavItem.css"

export default function SearchNavItem( { handleSearch }) {
    const [searchUserInput, setSearchUserInput] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([])

    const handleInputChange = (event) => {

        const inputValue = event.target.value;

        setSearchUserInput(inputValue)
        searchUsers(inputValue)
            .then((data) => {
                setFoundUsers(data.result)
                handleSearch(data.result)
            })
            .catch((err) => {
                console.error(err);
                setFoundUsers([]);
                handleSearch([]);
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

    if(!token) 
        return;

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