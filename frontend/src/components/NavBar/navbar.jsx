import React, { useState, useEffect } from 'react';
import './navbar.css';
import SearchNavItem from './SearchNavItem';
import HomeNavItem from './HomeNavItem';
import LogoutNavItem from './LogoutNavItem';
import LoginNavItem from './LoginNavItem';
import SignupNavItem from './SignupNavItem';
import SearchResultsDropDown from './SearchResultsDropDown';
import { Link } from 'react-router-dom';
import './SearchResultsDropDown.css'
import UserNavItem from './UserNavItem';
import './navbar.css'

// Component renders a navbar
// Items on the navbar are conditional based on if a user is currently logged in 
const Navbar = ({refresh}) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [showSearchResults, setShowSearchResults] = useState(false) // State variable to manage visibility of search results
    const [foundUsers, setFoundUsers] = useState([]) // State variable to manage list of found users from search

    // Update user state when refresh changes
    useEffect(() => {
      setUser(JSON.parse(window.localStorage.getItem("user")));
  }, [refresh]);

    const handleSearch = (searchResults) => {
      setFoundUsers(searchResults) // Sets state with results from search
      setShowSearchResults(true) // Triggers to show search results drop down
    }

  return (
  <>
  <div className="navbar-container">
    <div className="navbar">
      <div data-testId="searchItem" className="search-nav-item">
        
        
        { token && 
        <SearchNavItem 
          handleSearch={handleSearch}
        />
        }

        {showSearchResults && 
          <div className="search-results-dropdown">
          <SearchResultsDropDown 
            setShowSearchResults={setShowSearchResults}
            foundUsers={foundUsers}
          />
          </div>
        }
      </div>


      <div className="acebook-logo">
        aceBook
      </div>

      <div className="navbar-right">
        <div className="home-nav-item">
          <HomeNavItem />
        </div>
        
         {/* If user logged in show items: logout, user image. otherwise show itemsL login, signup */}
        {token ?
          <>
          <div className="logout-nav-item"> 
            <LogoutNavItem />
          </div>
          <div className="user-nav-item">
            <UserNavItem 
              user={user}
            />
          </div>
          </>
            :
            <>
          <div className="login-nav-item"> 
            <LoginNavItem />
          </div>
          <div className="signup-nav-item"> 
            <SignupNavItem />
          </div>
          
          </>
        }
      </div>
    </div>
  </div>
</>

)};

export default Navbar;