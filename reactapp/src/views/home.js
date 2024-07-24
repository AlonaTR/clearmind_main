import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import FeatureCard from '../components/feature-card'
import GalleryCard from '../components/gallery-card'
import Question from '../components/question'
import Footer from '../components/footer'
import './home.css'
import NavBar from '../components/nav-bar'


const Home = (props) => {
  const history = useHistory(); 
  const [data, setData] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/data`); 
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGetStarted = () => {
    history.push('/allitems'); 
  };

  
  const meditation_url = '/onetype/meditation';
  const affirmation_url = '/onetype/affirmation';
  const breathing_url = '/onetype/breathing';
  const test_url = () => {
    history.push('/test'); 
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Clear Mind</title>
        <meta property="og:title" content="Clear Mind" />
      </Helmet>
      <div className="home-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="home-hero1">
          <div className="home-container1">
            <h1 className="home-hero-heading heading1">Clear Mind</h1>
            <span className="home-hero-sub-heading">
              Discover the Power of Meditation
            </span>
            <div className="home-btn-group">
              <button className="home-hero-button1 button" onClick={handleGetStarted} >Get Started</button>
              <button className="home-hero-button2 button">  
              <a href="#common-questions" className="home-hero-button2-link">Learn More →</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container2">
            <span className="home-text sectionTitle">
              <span>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Why You Need to Try Meditation
            </h2>
            <span className="home-details-sub-heading">
            Meditation offers a sanctuary of calm in our fast-paced world. By practicing meditation, you can reduce stress, enhance focus, and improve emotional health. It fosters self-awareness, enabling you to better understand your thoughts and feelings. Additionally, meditation can boost creativity and problem-solving skills. Taking just a few minutes each day to meditate can transform your mental well-being, making you more resilient and centered. Give it a try and experience the profound benefits for yourself.
            </span>
          </div>
          <img
            alt="main_img"
            src="https://images.unsplash.com/photo-1572088229035-555d02d90357?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMzQ0MzcwOXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
            className="home-details-image"
          />
        </div>
      </div>
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-features1">
            <div className="home-container3">
              <span className="home-text03 sectionTitle">
                <span>features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">
                Discover the Power of Meditation
              </h2>
              <span className="home-features-sub-heading">
                Unlock inner peace, clarity, and self-discovery through our
                website&apos;s features
              </span>
            </div>
            <div className="home-container4">
              <a href={meditation_url} className="feature-link">
                <FeatureCard
                  heading="Meditations"
                  subHeading="Get a unique and visually appealing website design tailored specifically for meditation, affirmations, and breathwork."
                  rootClassName="feature-card-root-class-name"
                />
              </a>
              <a href={affirmation_url} className="feature-link">
              <FeatureCard  
                heading="Affirmations"
                subHeading="Take our interactive test to discover the perfect meditation practice for your needs and preferences."
              />
              </a>
              <a href={breathing_url} className="feature-link">
              <FeatureCard
                heading="Breathing exercises"
                subHeading="Explore a curated collection of popular meditations that have helped thousands of people find peace and clarity."
              />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="home-banner1">
          <h1 className="home-banner-heading heading2">
            Explore the World of Meditation
          </h1>
          <span className="home-banner-sub-heading">
            Find the Perfect Meditation Practice for You
          </span>
          <button className="home-banner-button button" onClick={test_url}>Take the Test</button>
        </div>
      </div>
      <div className="home-gallery">
        <div className="home-gallery1">
          <h1 className="home-gallery-heading heading2">
            Explore Our Most Popular Meditations
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </h1>
          <span className="home-gallery-sub-heading">
            There are our most popular meditations:
          </span>
          <div className="home-gallery2">
            {data.slice(0, 6).map(item => (
              <Link to={`/item/${item.id}`} key={item.id}>
                <GalleryCard
                    title={item.name}
                    imageSrc={`https://img.youtube.com/vi/${item.video_id}/maxresdefault.jpg`}
                    subtitle={item.info}
                    rootClassName={`rootClassName1${item.id}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="home-faq" id="common-questions">
        <div className="home-faq-container">
          <div className="home-faq1">
            <div className="home-container5">
              <span className="home-text06 sectionTitle">
                <span>FAQ</span>
                <br></br>
              </span>
              <h2 className="home-text09 heading2">Common questions</h2>
              <span className="home-text10">
                <span>
                  Here are some of the most common questions that we get.
                </span>
              </span>
            </div>
            <div className="home-container6">
              <Question
                answer="Meditation is a practice where an individual uses a technique – such as mindfulness, breathing, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state."
                question="What is meditation?"
              ></Question>
              <Question
                answer="Meditation has numerous benefits including reducing stress, improving focus and concentration, promoting emotional well-being, enhancing self-awareness, and fostering a sense of inner peace and tranquility."
                question="How can meditation benefit me?"
              ></Question>
              <Question
                answer="Yes, meditation is suitable for people of all ages and backgrounds. It can be practiced by anyone who is willing to dedicate some time to quieting the mind and exploring their inner self."
                question="Is meditation suitable for everyone?"
              ></Question>
              <Question
                answer="The duration of meditation can vary depending on personal preference and availability. It is recommended to start with shorter sessions of 5-10 minutes and gradually increase the duration as you become more comfortable."
                question="How long should I meditate for?"
              ></Question>
              <Question
                answer="Absolutely! Meditation is a practice that can be learned by anyone, regardless of prior experience. There are various guided meditations available that can help beginners get started."
                question="Can I meditate even if I have never tried it before?"
              ></Question>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'></div>
       <Footer rootClassName="footer-root-class-name" ></Footer>
      
    </div>
  )
}

export default Home
