import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavigationLinks from './navigation-links';
import './nav-bar.css';

const NavBar = (props) => {
  const history = useHistory();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogIn = () => {
    history.push('/log-in');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('User data from localStorage:', user);

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      console.log('User data:', parsedUser);
    }
  }, []);



  return (
    <div className={`nav-bar-container ${props.rootClassName}`}>
      <header data-role="Header" className="nav-bar-header">
        <span className="nav-bar-text">
          <Link to="/home" className="log-in-hero-heading-link">
            {props.name}
          </Link>
        </span>
        <div className="main-nav-links-wrapper">
          <NavigationLinks
            rootClassName="navigation-links-root-class-name8"
            className="desktop-nav-links"
          />
        </div>
        <div className="nav-bar-btn-group">
          {userData ? (
            <div
              data-thq="thq-dropdown"
              onMouseEnter={() => setIsDisplayed(true)}
              onMouseLeave={() => setIsDisplayed(false)}
              className="nav-bar-thq-dropdown list-item"
            >
              <div
                data-thq="thq-dropdown-toggle"
                className="nav-bar-dropdown-toggle"
              >
                <span className="nav-bar-text1">Account</span>
                <div
                  data-thq="thq-dropdown-arrow"
                  className="nav-bar-dropdown-arrow"
                >
                  <svg viewBox="0 0 1024 1024" className="nav-bar-icon">
                    <path d="M426 726v-428l214 214z" className=""></path>
                  </svg>
                </div>
              </div>
              <ul
                data-thq="thq-dropdown-list"
                className="nav-bar-dropdown-list"
                style={{ display: isDisplayed ? 'flex' : 'none' }}
              >
                <li data-thq="thq-dropdown" className="nav-bar-dropdown list-item">
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="nav-bar-dropdown-toggle1"
                  >
                    <a href="/account" className="nav-bar-text2">Account</a>
                  </div>
                </li>
                <li
                  data-thq="thq-dropdown"
                  className="nav-bar-dropdown1 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="nav-bar-dropdown-toggle2"
                  >
                    <a href="/activity" className="nav-bar-text3">My activity</a>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={handleLogIn} className="nav-bar-login button">Login &rarr;</button>
          )}
        </div>
      </header>
      <div className="mobile-nav-links-wrapper">
        <NavigationLinks
          rootClassName="navigation-links-root-class-name8"
          className="mobile-nav-links"
        />
      </div>
    </div>
  );
};

NavBar.defaultProps = {
  name: 'ClearMind',
  rootClassName: '',
};

NavBar.propTypes = {
  name: PropTypes.string,
  rootClassName: PropTypes.string,
};

export default NavBar;
