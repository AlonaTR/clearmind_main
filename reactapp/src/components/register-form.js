import React from 'react'

import PropTypes from 'prop-types'

import './register-form.css'

const RegisterForm = ({
  onRegister,
  onInputChange,
  registerError,
  rootClassName,
  detailsImageAlt,
  detailsImageSrc,
  heroSubHeading31,
  heroSubHeading24,
  heroSubHeading3,
  heroSubHeading23,
  heroSubHeading,
  heroSubHeading22,
  heroSubHeading11,
  heroSubHeading21,
  heroSubHeading1,
  heroSubHeading2,
}) => {
  console.log(registerError);
  return (
    <form onSubmit={onRegister} className={`register-form-container ${rootClassName}`}>
      {/* <img
        alt={detailsImageAlt}
        src={detailsImageSrc}
        className="register-form-details-image"
      />
       */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={onInputChange}
        className="register-form-input-username register-form-input  input"
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={onInputChange}
        className="register-form-input-email register-form-input input"
      />
      <input
        type="password"
        name="password1"
        placeholder="Password"
        onChange={onInputChange}
        className="register-form-input-password  register-form-input input"
      />
      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        onChange={onInputChange}
        className="register-form-input-password2 register-form-input input"
      />
      {registerError && Object.keys(registerError).map((key) => (
        <div key={key} className="register-form-error">
          {registerError[key]}
        </div>
      ))}
      <div className="log-in-btn-group2">
      <button type="submit" className="log-in-home-button button">Register</button>
      </div>
    </form>
  )
}

RegisterForm.defaultProps = {
  heroSubHeading22: 'Wrong email',
  heroSubHeading24: 'You should type your name',
  heroSubHeading21: 'Your password should have min 6 symbols',
  heroSubHeading11: 'Type your Password',
  detailsImageSrc:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBlcnNvbiUyMHxlbnwwfHx8fDE3MDM4NDIzMDd8MA&ixlib=rb-4.0.3&w=200',
  heroSubHeading31: 'Type your Name',
  heroSubHeading: 'Type your Email',
  heroSubHeading3: 'Type your Surname',
  heroSubHeading1: 'Repeat your Password',
  detailsImageAlt: 'image',
  rootClassName: '',
  heroSubHeading23: 'You should type your surname',
  heroSubHeading2: 'Wrong password',
}

RegisterForm.propTypes = {
  heroSubHeading22: PropTypes.string,
  heroSubHeading24: PropTypes.string,
  heroSubHeading21: PropTypes.string,
  heroSubHeading11: PropTypes.string,
  detailsImageSrc: PropTypes.string,
  heroSubHeading31: PropTypes.string,
  heroSubHeading: PropTypes.string,
  heroSubHeading3: PropTypes.string,
  heroSubHeading1: PropTypes.string,
  detailsImageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  heroSubHeading23: PropTypes.string,
  heroSubHeading2: PropTypes.string,
}

export default RegisterForm
