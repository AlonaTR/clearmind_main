import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ImageText from '../components/image-text'
import './one-type.css'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'
import GalleryCard11 from '../components/gallery-card'

const getDisplayName = (typename) => {
  switch (typename) {
    case 'meditation':
      return 'Meditations';
    case 'affirmation':
      return 'Affirmations';
    case 'breathing':
      return 'Breathing Exercises';
    default:
      return typename;
  }
};

const OneType = ({ match }) => {
  const { typename } = match.params;
  const [data, setData] = useState([]);
  const history = useHistory(); 
  const displayName = getDisplayName(typename);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${typename}`); // Use path to our API
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="one-type-container">
      <Helmet>
        <title>{typename} - Clear Mind</title>
        <meta property="og:title" content="OneType - Loyal Cooked Shark" />
      </Helmet>
      <div className="one-type-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="one-type-hero1">
          <div className="one-type-container1">
            <h1 className="one-type-hero-heading heading1">Clear Mind</h1>
            <span className="one-type-hero-sub-heading">
              Discover the Power of Meditation
            </span>
          </div>
        </div>
      </div>
      <div className="one-type-details">
        <div className="one-type-details1">
          <div className="one-type-meditations">
            <h2 className="one-type-details-heading heading2">
              <span className="one-type-text">{displayName}</span>
              <br />
            </h2>
            <div className="one-type-container2">
              {data.map(item => (
                <Link to={`/item/${item.id}`} key={item.id}>
                  <GalleryCard11
                  title={item.name}
                  imageSrc={item.image}
                  subtitle={item.info}
                  rootClassName={`rootClassName1${item.id}`}
                  ></GalleryCard11>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id='footer'></div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default OneType;
