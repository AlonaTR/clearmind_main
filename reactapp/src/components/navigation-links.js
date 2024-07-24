import React from 'react'

import PropTypes from 'prop-types'

import './navigation-links.css'

const NavigationLinks = (props) => {
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <a href="/home" className="navigation-links-text">{props.text}</a>
        <a href="/allitems" className="navigation-links-text1">{props.text1}</a>
        <a href="/test" className="navigation-links-text2">{props.text2}</a>
        <a href="home#common-questions" className="navigation-links-text3">{props.text3}</a>
        <a href="#footer" className="navigation-links-text4">{props.text4}</a>
    </nav>
  )
}

NavigationLinks.defaultProps = {
  text: 'Home',
  text3: 'Questions',
  text2: 'Test',
  rootClassName: '',
  text1: 'Find more',
  text4: 'Contact',
}

NavigationLinks.propTypes = {
  text: PropTypes.string,
  text3: PropTypes.string,
  text2: PropTypes.string,
  rootClassName: PropTypes.string,
  text1: PropTypes.string,
  text4: PropTypes.string,
}

export default NavigationLinks
