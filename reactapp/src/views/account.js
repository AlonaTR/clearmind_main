import React, { useState, useEffect } from 'react'
import { useHistory, Link  } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Footer from '../components/footer'
import './account.css'
import NavBar from '../components/nav-bar'
import EditForm from '../components/edit-form'

const Account = (props) => {
  const [userData, setUserData] = useState(null);
  const history = useHistory(); 
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('User data from localStorage:', user); // Log the raw user data from localStorage

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      console.log('User data:', parsedUser); // Debugging statement
    } else {
      // If there's no user data in localStorage, redirect to the login page
      history.push('/log-in');
    }
  }, [history]);
  
  const onFormSubmit = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    }
    setEditMode(false);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear user data from localStorage and state
    localStorage.removeItem('user');
    setUserData(null);
    // Redirect to login page or home page
    props.history.push('/log-in');
  };

  return (
    <div className="account-container">
      <Helmet>
        <title>Account - Clear Mind</title>
        <meta property="og:title" content="Account - Clear Mind" />
      </Helmet>
      <div className="account-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="account-hero1">
          <div className="account-container1">
            <h1 className="log-in-hero-heading heading1">
              <Link to='/home' className="log-in-hero-heading-link">
                Clear Mind
              </Link>
            </h1>
            <div className="account-container2">
            {editMode ? (
              <EditForm userData={userData} setEditMode={setEditMode} onFormSubmit={onFormSubmit} />
            ) : (
              userData ? ( // Check if userData is not null
                <div className='info-account-container info-account-root-class-name'>
                  <span className="info-account-text-name">Username:</span>
                  <span className="info-account-text-name1">{userData.username}</span>
                  <span className="info-account-text-email">Email:</span>
                  <span className="info-account-text-email1">{userData.email}</span>
      
                </div>
              ) : (
                
                <p>Loading user data...</p> // Display a loading message or spinner
              )
              )}
            </div>
            {!editMode && (
              <div className="account-btn-group">
                <button className="account-log-out-button button" onClick={handleLogout}>Log Out</button>
                <button className="account-edit-button button" onClick={toggleEditMode}>Edit→</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id='footer'></div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Account
