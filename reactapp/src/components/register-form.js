import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './register-form.css'

const RegisterForm = ({
  onRegister,
  onInputChange,
  registerError,
  rootClassName,
  heroSubHeading22,
  heroSubHeading24,
  heroSubHeading21,
  heroSubHeading11,
  heroSubHeading31,
  heroSubHeading23,
  heroSubHeading2,
}) => {

  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    };

    if (!formData.username) newErrors.username = heroSubHeading24;
    if (!formData.email) newErrors.email = heroSubHeading22;
    if (!formData.password1) newErrors.password1 = heroSubHeading11;
    if (!formData.password2) newErrors.password2 = 'Confirm password cannot be empty';
    if (formData.password1 && formData.password2 && formData.password1 !== formData.password2)
      newErrors.password2 = heroSubHeading2;

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onRegister(formData);
    }
  };

  
  return (
    <form onSubmit={handleSubmit} className={`register-form-container ${rootClassName}`}>
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={formData.username}
      onChange={handleInputChange}
      className="register-form-input-username register-form-input input"
    />
    {errors.username && <div className="error-message">{errors.username}</div>}

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
      className="register-form-input-email register-form-input input"
    />
    {errors.email && <div className="error-message">{errors.email}</div>}

    <input
      type="password"
      name="password1"
      placeholder="Password"
      value={formData.password1}
      onChange={handleInputChange}
      className="register-form-input-password register-form-input input"
    />
    {errors.password1 && <div className="error-message">{errors.password1}</div>}

    <input
      type="password"
      name="password2"
      placeholder="Confirm Password"
      value={formData.password2}
      onChange={handleInputChange}
      className="register-form-input-password2 register-form-input input"
    />
    {errors.password2 && <div className="error-message">{errors.password2}</div>}

    <div className="register-form-error">
      {registerError}
    </div>
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
