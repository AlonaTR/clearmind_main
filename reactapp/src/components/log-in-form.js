import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './log-in-form.css'

const LogInForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Reset errors
    setError('')

    // Validation
    let isValid = true
    let errorMessage = ''
    if (username.trim() === '' || password.trim() === '') {
      errorMessage = 'Input fields cannot be empty'
      isValid = false
    } 

    if (!isValid) {
      setError(errorMessage)
      return
    }

    // Pass the username and password to the parent component's login handler
    props.onLogin({ username: username, password: password })
  }

  return (
    <form className={`log-in-form-container ${props.rootClassName}`} onSubmit={handleSubmit}>
      <span className="log-in-form-text-email">{props.heroSubHeading}</span>
      <input
        type="text"
        placeholder="Username"
        className="log-in-form-input-email input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span className="log-in-form-text-password">{props.heroSubHeading1}</span>
      <input
        type="password"
        placeholder="Password"
        className="log-in-form-input-password input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="error-message ">
        {error || props.heroSubHeading2}
      </span>
      
      <div className="log-in-btn-group2">
        <button type="submit" className="log-in-home-button button">
          Log In
        </button>
      </div>
    </form>
  );
};

LogInForm.defaultProps = {
  textinputPlaceholder1: 'placeholder',
  heroButton2: 'Learn More →',
  heroSubHeading: 'Input Username',
  heroSubHeading2: '',
  heroSubHeading1: 'Input Password',
  textinputPlaceholder: 'placeholder',
  rootClassName: '',
}

LogInForm.propTypes = {
  textinputPlaceholder1: PropTypes.string,
  heroButton2: PropTypes.string,
  heroSubHeading: PropTypes.string,
  heroSubHeading2: PropTypes.string,
  heroSubHeading1: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default LogInForm
