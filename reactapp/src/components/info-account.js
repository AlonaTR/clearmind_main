import React from 'react'

import PropTypes from 'prop-types'

import './info-account.css'

const InfoAccount = ({
  username,
  email,
  detailsImageSrc,
  detailsImageAlt,
  rootClassName,
}) => {
  console.log('InfoAccount props:', { username, email }); // Debugging statement

  return (
    <div className={`info-account-container ${rootClassName}`}>
      <img
        alt={detailsImageAlt}
        src={detailsImageSrc}
        className="info-account-details-image"
      />
      <span className="info-account-text-name">Username: {username}</span>
      <span className="info-account-text-email">Email: {email}</span>
    </div>
  )
}

InfoAccount.defaultProps = {
  detailsImageSrc:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBlcnNvbiUyMHxlbnwwfHx8fDE3MDM4NDIzMDd8MA&ixlib=rb-4.0.3&w=200',
  detailsImageAlt: 'User Profile Image',
  rootClassName: '',
}

InfoAccount.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  detailsImageSrc: PropTypes.string,
  detailsImageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default InfoAccount
