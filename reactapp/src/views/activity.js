import React, { useState, useEffect } from 'react'
import { useHistory, Link  } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import './activity.css'
import ActivityCalendar from 'react-activity-calendar'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'




const Activity = (props) => {
  const [activityDataCalendar, setActivityDataCalendar] = useState([]);  
  const [activityDataMeditation, setActivityDataMeditation] = useState([]);
  const [activityDataAffirmation, setActivityDataAffirmation] = useState([]);
  const [activityDataBreathing, setActivityDataBreathing] = useState([]);
  const user = localStorage.getItem('user');
  

  useEffect(() => {
    let isMounted = true; 
  
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get('/api/user-activity-calendar',{
          user: user
        }); 
        console.log('Response data:', response.data);
        setActivityDataCalendar(response.data);
        console.log(activityDataCalendar)
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    const fetchCountMeditation = async () => {
      try {
        const response = await axios.get('/api/user-activity-meditation',{
            user: user
          }); 
        console.log('Response data:', response.data);
        setActivityDataMeditation(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    const fetchCountAffirmation = async () => {
      try {
        const response = await axios.get('/api/user-activity-affirmation',{
            user: user
          }); 
        console.log('Response data:', response.data);
        setActivityDataAffirmation(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    const fetchCountBreathing = async () => {
      try {
        const response = await axios.get('/api/user-activity-breathing',{
            user: user
          }); 
        console.log('Response data:', response.data);
        setActivityDataBreathing(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };
  
    fetchCalendarData();
    fetchCountMeditation();
    fetchCountAffirmation();
    fetchCountBreathing();
  
    return () => {
      isMounted = false; 
    };
  }, []);



  return (
    <div className="myactivity-container">
      <Helmet>
        <title>Myactivity - ClearMind</title>
        <meta property="og:title" content="Myactivity - ClearMind" />
      </Helmet>
      <div className="myactivity-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="myactivity-hero1">
          <div className="myactivity-container1">
            <h1 className="myactivity-hero-heading heading1">Clear Mind</h1>
            <span className="myactivity-hero-sub-heading">
              Discover the Power of Meditation
            </span>
          </div>
        </div>
      </div>
      <div className="myactivity-details">
        <div className="myactivity-stats">
          <div className="myactivity-stat">
            <svg viewBox="0 0 1152 1024" className="myactivity-icon">
              <path d="M768 770.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              <path d="M327.196 795.328c55.31-36.15 124.080-63.636 199.788-80.414-15.054-17.784-28.708-37.622-40.492-59.020-30.414-55.234-46.492-116.058-46.492-175.894 0-86.042 0-167.31 30.6-233.762 29.706-64.504 83.128-104.496 159.222-119.488-16.914-76.48-61.94-126.75-181.822-126.75-192 0-192 128.942-192 288 0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h279.006c14.518-12.91 30.596-25.172 48.19-36.672z"></path>
            </svg>
            <span className="myactivity-text">Meditation</span>
            <h1 className="myactivity-text1">
              <span>{activityDataMeditation?.[0]?.count}</span>
            </h1>
          </div>
          <div className="myactivity-stat1">
            <svg viewBox="0 0 1024 1024" className="myactivity-icon3">
              <path d="M152 792l76-78 60 60-76 78zM470 958v-126h84v126h-84zM512 234q106 0 181 75t75 181-75 181-181 75-181-75-75-181 75-181 181-75zM854 448h128v86h-128v-86zM736 774l60-58 76 76-60 60zM872 190l-76 76-60-60 76-76zM554 24v126h-84v-126h84zM170 448v86h-128v-86h128zM288 206l-60 60-76-76 60-60z"></path>
            </svg>
            <span className="myactivity-text3">Affirmation</span>
            <h1 className="myactivity-text4">
              <span>{activityDataAffirmation?.[0]?.count}</span>
            </h1>
          </div>
          <div className="myactivity-stat2">
            <svg viewBox="0 0 1024 1024" className="myactivity-icon5">
              <path d="M439.424 225.92c8.32-8.363 19.157-12.544 30.123-12.587s21.845 4.096 30.208 12.416 12.544 19.157 12.587 30.123-4.096 21.845-12.416 30.208c-8.192 8.277-18.859 12.459-29.739 12.587h-384.853c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667h385.835c32.341-0.384 64.683-12.971 89.301-37.76 24.917-25.045 37.333-57.941 37.205-90.624s-12.715-65.493-37.76-90.411-57.899-37.291-90.581-37.205-65.493 12.715-90.411 37.76c-16.64 16.725-16.555 43.733 0.171 60.331s43.733 16.512 60.331-0.171zM506.923 858.24c24.917 25.045 57.685 37.675 90.411 37.76s65.579-12.331 90.624-37.205 37.675-57.685 37.76-90.411-12.331-65.579-37.205-90.624c-24.619-24.789-56.96-37.376-89.301-37.76h-513.877c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667h512.853c10.88 0.128 21.547 4.309 29.781 12.587 8.32 8.363 12.459 19.243 12.416 30.208s-4.224 21.803-12.587 30.123-19.243 12.459-30.208 12.416-21.803-4.224-30.123-12.587c-16.597-16.725-43.648-16.811-60.331-0.171s-16.811 43.648-0.171 60.331zM786.603 360.021c12.544-12.501 28.843-18.688 45.269-18.688s32.725 6.272 45.227 18.816 18.688 28.843 18.688 45.269-6.272 32.725-18.816 45.227c-12.459 12.459-28.715 18.645-45.099 18.688l-746.539-0c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667h746.752c38.016-0.085 76.117-14.592 105.216-43.605 29.184-29.099 43.819-67.371 43.861-105.557s-14.507-76.459-43.605-105.643-67.413-43.819-105.557-43.861-76.459 14.507-105.643 43.605c-16.683 16.64-16.725 43.648-0.085 60.331s43.648 16.725 60.331 0.085z"></path>
            </svg>
            <span className="myactivity-text6">Breathing Exercises</span>
            <h1 className="myactivity-text7">
              <span>{activityDataBreathing?.[0]?.count}</span>
            </h1>
          </div>
        </div>
        
      </div>
          <ActivityCalendar 
            data={activityDataCalendar} 
            showWeekdayLabels = {true}
            blockSize={14}
            blockRadius={7}
            blockMargin={5}
            fontSize={16}
            theme={{
              light: ['#f0f0f0', '#bbeeff', '#99ccff', '#77aaff', '#5588ff'],
            }}
          />
        <div id='footer'></div>
        <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Activity
