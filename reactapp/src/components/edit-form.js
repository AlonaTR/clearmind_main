import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './edit-form.css'

const EditForm = (props) => {
  const { userData, setEditMode, onFormSubmit } = props;
  const [formState, setFormState] = useState({
    username: userData.username,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.username) newErrors.username = 'You should type your name';
    if (!formState.email) newErrors.email = 'Type your Email';
    if (formState.newPassword) {
      if (formState.newPassword.length < 6) {
        newErrors.newPassword = 'Your password should have min 6 symbols';
      }
      if (formState.newPassword !== formState.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match';
      }
      // Ensure current password is present when changing password
      if (!formState.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const payload = {
      username: formState.username,
      email: formState.email,
    };
  
    if (formState.newPassword) {
      payload.currentPassword = formState.currentPassword;
      payload.newPassword = formState.newPassword;
    }
  
    try {
      const response = await fetch('/api/update-user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        const updatedUser = {
          username: formState.username,
          email: formState.email,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setEditMode(false);
        onFormSubmit();
      } else {
        console.log(data.message);
        setErrors({ ...errors, form: data.message });
      }
    } catch (error) {
      console.error('Request failed', error);
      setErrors({ ...errors, form: 'Request failed' });
    }
  };
  

  return (
    <form className="edit-form-container" onSubmit={handleSubmit}>
      <div className={`edit-form-container ${props.rootClassName}`}>
        <div className="edit-form-container1">
          <div className="edit-form-container2">
            <h1 className="edit-form-text">{props.heading}</h1>
            <span className="edit-form-text-name">{props.heroSubHeading31}</span>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              className="edit-form-input-name input"
            />
            {errors.username && <span className="edit-form-error-name">{errors.username}</span>}
            <span className="edit-form-text-email">{props.heroSubHeading}</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              placeholder="Email"
              onChange={handleChange}
              className="edit-form-input-email input"
            />
            {errors.email && <span className="edit-form-error-email">{errors.email}</span>}
          </div>
          <div className="edit-form-container3">
            <h1 className="edit-form-text1">{props.heading1}</h1>
            <span className="edit-form-text-password">{props.heroSubHeading11}</span>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formState.currentPassword}
              onChange={handleChange}
              className="edit-form-input-password input"
            />
            {errors.currentPassword && <span className="edit-form-error-password">{errors.currentPassword}</span>}
            <span className="edit-form-text-password2">{props.heroSubHeading1}</span>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formState.newPassword}
              onChange={handleChange}
              className="edit-form-input-password2 input"
            />
            {errors.newPassword && <span className="edit-form-error-password2">{errors.newPassword}</span>}
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formState.confirmNewPassword}
              onChange={handleChange}
              className="edit-form-input-password2 input"
            />
            {errors.confirmNewPassword && <span className="edit-form-error-password2">{errors.confirmNewPassword}</span>}
          </div>
        </div>
      </div>
      <div className="log-in-btn-group2">
        <button className="log-in-home-button button" type="submit">Save</button>
        <button onClick={() => setEditMode(false)} className="log-in-home-button button">Close</button>
      </div>
      {errors.form && <div className="form-error">{errors.form}</div>}
    </form>
  );
};

EditForm.defaultProps = {
  heroSubHeading22: 'Wrong email',
  heroSubHeading24: 'You should type your name',
  heroSubHeading21: 'Your password should have min 6 symbols',
  heroSubHeading11: 'Type your Password',
  detailsImageSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBlcnNvbiUyMHxlbnwwfHx8fDE3MDM4NDIzMDd8MA&ixlib=rb-4.0.3&w=200',
  heroSubHeading31: 'Type your Username',
  heroSubHeading: 'Type your Email',
  heroSubHeading1: 'Repeat your Password',
  rootClassName: '',
  heroSubHeading23: 'You should type your surname',
  heroSubHeading2: 'Wrong password',
  heading: 'User information',
  heading1: 'Password',
};

EditForm.propTypes = {
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
  heading: PropTypes.string,
  heading1: PropTypes.string,
};

export default EditForm;
