import React, { useState } from 'react';
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


const Navbar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [foundUsers, setFoundUsers] = useState([])

    const handleSearch = (searchResults) => {
      setFoundUsers(searchResults)
      setShowSearchResults(true) 
      console.log("search results", searchResults)
    }

  return (
  <>
  <div data-testid="navbar" id="navbar">
  
    <div className="logo-nav-item"> 
      <Link to={`/`}>
        <h3>AB</h3>
        </Link>
    </div>

    <div data-testId="searchItem" className="search-nav-item">
      <SearchNavItem 
        handleSearch={handleSearch}
      />
      {showSearchResults && 
        <div className="search-results-dropdown">
        <SearchResultsDropDown 
          setShowSearchResults={setShowSearchResults}
          foundUsers={foundUsers}
        />
        </div>
      }
    </div>

    <div className="home-nav-item">
      <HomeNavItem />
    </div>
    
    {token ? 

      <>
      <div className="logout-nav-item"> 
        <LogoutNavItem />
      </div>
      <div className="User-nav-item">
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
      <div className="login-nav-item"> 
        <SignupNavItem />
      </div>
      
      </>
    }
  </div>
</>

)};

export default Navbar;