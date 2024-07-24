import React from 'react'

import PropTypes from 'prop-types'
import './footer.css'

const Footer = (props) => {
  return (
      <div
        className={`footer-contact20 thq-section-padding ${props.rootClassName} `}
      >
        <p className="footer-text thq-body-large">{props.content1}</p>
        <div className="footer-max-width thq-section-max-width">
          <div className="footer-content">
            <svg
              viewBox="0 0 1024 1024"
              className="footer-icon thq-icon-medium"
            >
              <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
            </svg>
            <div className="footer-contact-info">
              <div className="footer-content1">
                <h3 className="footer-text1 thq-heading-3">{props.heading1}</h3>
              </div>
              <span className="footer-email thq-body-small">
                {props.email1}
              </span>
            </div>
          </div>
          <div className="footer-content2">
            <svg
              viewBox="0 0 1024 1024"
              className="footer-icon2 thq-icon-medium"
            >
              <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
            </svg>
            <div className="footer-contact-info1">
              <div className="footer-content3">
                <h3 className="footer-text2 thq-heading-3">{props.heading3}</h3>
              </div>
              <span className="footer-phone thq-body-small">
                {props.phone1}
              </span>
            </div>
          </div>
          <div className="footer-content4">
            <svg
              viewBox="0 0 1024 1024"
              className="footer-icon4 thq-icon-medium"
            >
              <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
            </svg>
            <div className="footer-contact-info2">
              <div className="footer-content5">
                <h3 className="footer-text3 thq-heading-3">{props.heading4}</h3>
              </div>
              <span className="footer-address thq-body-small">
                {props.address1}
              </span>
            </div>
          </div>
        </div>
      </div>   

  )
}

Footer.defaultProps = {
  link1: 'Start new chat',
  content1: 'Have questions or feedback? Feel free to reach out to us.',
  heading1: 'Contact Us',
  content2:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  heading4: 'Address',
  address1: '123 Meditation Street, Zen City, Tranquility',
  content4:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  heading3: 'Phone',
  phone1: '+1 (555) 123-4567',
  content3:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
  heading2: 'Address',
  email1: 'info@clearmind.com',
  rootClassName: '',
}

Footer.propTypes = {
  link1: PropTypes.string,
  content1: PropTypes.string,
  heading1: PropTypes.string,
  content2: PropTypes.string,
  heading4: PropTypes.string,
  address1: PropTypes.string,
  content4: PropTypes.string,
  heading3: PropTypes.string,
  phone1: PropTypes.string,
  content3: PropTypes.string,
  heading2: PropTypes.string,
  email1: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Footer
