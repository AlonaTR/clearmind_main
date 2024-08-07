import React from 'react';
import PropTypes from 'prop-types';
import './image-text.css';

const ImageText = (props) => {
  return (
    <div className={`image-text-feature-card ${props.rootClassName}`}>
      <div className="image-text-container">
        <img
          alt={props.imageAlt1}
          src={props.imageSrc1}
          className="image-text-image"
        />
      </div>
      <h3 className="image-text-text heading3">{props.heading}</h3>
    </div>
  );
};

ImageText.defaultProps = {
  imageSrc1:
    'https://images.unsplash.com/photo-1703136686959-d6e53e9fab46?ixid=M3w5MTMyMXwwfDF8YWxsfDJ8fHx8fHwyfHwxNzAzNTI3MzA1fA&ixlib=rb-4.0.3&h=300',
  imageSrc:
    'https://images.unsplash.com/photo-1530886416038-801980e64d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEzfHxjbGVhciUyMG1pbmR8ZW58MHx8fHwxNzAzNDQ3Mzk1fDA&ixlib=rb-4.0.3&q=80&w=1500',
  heading: 'Lorem ipsum',
  imageAlt1: 'image',
  subHeading:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.',
  rootClassName: '',
  imageAlt: 'image',
};

ImageText.propTypes = {
  imageSrc1: PropTypes.string,
  imageSrc: PropTypes.string,
  heading: PropTypes.string,
  imageAlt1: PropTypes.string,
  subHeading: PropTypes.string,
  rootClassName: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default ImageText;
