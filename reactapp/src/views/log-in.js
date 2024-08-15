import React, { useState, useEffect } from 'react'
import { useHistory, Link  } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import InfoAccount from '../components/info-account'
import RegisterForm from '../components/register-form'
import LogInForm from '../components/log-in-form'
import './log-in.css'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'


const LogIn = (props) => {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginError, setLoginError] = useState('');


   // Add state to handle form inputs and errors
   const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password1: '',
    password2: '',
    email: '',
  });
  const [registerError, setRegisterError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  


  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
      setUserData(JSON.parse(user))
    }
  }, [])

 
  const handleLogin = async (userInfo) => {
    console.log('handleLogin called with:', userInfo);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password,
        }),
      });
      const data = await response.json();
      if (response.ok && data.status === 'success' && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
        setIsLoggedIn(true);
        setUserData(data.user);
        props.history.push('/account'); // Redirect to account page
      } else {
        setLoginError('Wrong username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Perform input validation
    const { username, email, password1, password2 } = registerInfo;
    if (!username || !email || !password1 || !password2) {
      setRegisterError('All fields are required');
      return; // Exit the function if validation fails
    }

    // Additional password match validation
    if (password1 !== password2) {
      setRegisterError('Passwords do not match');
      return; // Exit the function if password validation fails
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerInfo.username,
          email: registerInfo.email,
          password1: registerInfo.password1,
          password2: registerInfo.password2,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
        setIsLoggedIn(true);
        setUserData(data.user);
        props.history.push('/account'); // Redirect to the account page
      } else {
        // Registration failed, handle errors
        setRegisterError(data.errors || 'Registration failed');
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      setRegisterError('Network error or other unexpected error');
    }
  };
  

  return (
    <div className="log-in-container">
      <Helmet>
        <title>LogIn - Clear Mind</title>
        <meta property="og:title" content="LogIn - Clear Mind" />
      </Helmet>
      <div className="log-in-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="log-in-hero1">
          <div className="log-in-container1">
            <h1 className="log-in-hero-heading heading1">
              
            </h1>
            <span className="allitems-hero-sub-heading">
              Discover the Power of Meditation
            </span>
            <div className="log-in-container2">
            {isLoggedIn && userData ? (
              <InfoAccount
                // Pass the necessary props to InfoAccount component
                username={userData.username}
                email={userData.email}
                // ...other props
              />
            ) : showRegisterForm ? (
              <RegisterForm
                onRegister={handleRegister}
                onInputChange={handleInputChange}
                registerError={registerError}
              />
            ) : (
              <LogInForm
                rootClassName="log-in-form-root-class-name"
                onLogin={handleLogin} 
                heroSubHeading2={loginError && loginError[0]}
              />
            )}
            </div>
            <div className="log-in-btn-group">
              
              {!showRegisterForm && (
                <button
                  className="log-in-hero-button2 button"
                  onClick={() => setShowRegisterForm(true)}>
                  Register →
                </button>
              )}
              {showRegisterForm && (
                <button
                  className="log-in-hero-button2 button"
                  onClick={() => setShowRegisterForm(false)}>
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id='footer'></div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default LogIn
