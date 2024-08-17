import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import NavBar from '../components/nav-bar'
import TestQuestion from '../components/test-question'
import './test.css'
import Footer from '../components/footer'
import GalleryCard11 from '../components/gallery-card'



const Test = (props) => {
  const history = useHistory(); 
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false); // New state variable to control score display
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const [recommendations, setRecommendations] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);


  useEffect(() => {
    // Fetch test questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/test-questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching test questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answerPoints) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerPoints,
    });
    setIsAnswerSelected(true); // Updated to true when an answer is selected
  };
  


  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      // Calculate the total score only if it's the last question
      const score = Object.values(selectedAnswers).reduce((acc, points) => acc + points, 0);
      setShowScore(true); 
  
      try {
        const response = await axios.get(`/api/recommendations/${score}`);
        setRecommendations(response.data); 
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    } else {
      setIsAnswerSelected(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (showScore) {
      setShowScore(false); // Hide the score
      setCurrentQuestionIndex(questions.length - 1);
      setIsAnswerSelected(selectedAnswers[questions[questions.length - 1].id] != null); // Set answer state of the last question
    } else if (currentQuestionIndex > 0) {
      setIsAnswerSelected(selectedAnswers[questions[currentQuestionIndex - 1]?.id] != null); // Check if an answer exists for the previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-container">
      <Helmet>
        <title>Test - Clear Mind</title>
        <meta property="og:title" content="Test - Clear Mind" />
      </Helmet>
      <div className="test-hero">
        <NavBar rootClassName="nav-bar-root-class-name"></NavBar>
        <div className="test-hero1">
          <div className="test-container1">
            <h1 className="test-hero-heading heading1">Clear Mind</h1>
            <span className="test-hero-sub-heading">
              Discover the Power of Meditation
            </span>
          </div>
        </div>
      </div>
      <div className="test-faq">
        <div className="test-faq-container">
          <div className="test-faq1">
            <div className="test-heading">
              <h2 className="test-text heading2">Test</h2>
              <span className="test-text01">
                <span>
                  It test can help you find out what you need at this moment.
                  You need to answer a few questions 
                </span>
                <br></br>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
            </div>
            <div className="test-test">
              {!showScore && currentQuestion && (
                <TestQuestion
                  question={currentQuestion.question_text}
                  answers={[
                    { text: currentQuestion.answer_choice_1, points: currentQuestion.answer_choice_1_points },
                    { text: currentQuestion.answer_choice_2, points: currentQuestion.answer_choice_2_points },
                    { text: currentQuestion.answer_choice_3, points: currentQuestion.answer_choice_3_points },
                    { text: currentQuestion.answer_choice_4, points: currentQuestion.answer_choice_4_points },
                  ]}
                  selectedAnswer={selectedAnswers[currentQuestion.id]}
                  onAnswerSelect={(points) => handleAnswerSelect(currentQuestion.id, points)}
                />
              )}
              {showScore && (
                <div className="test-score-container">
                  <h3>Recommended for You:</h3>
                  {recommendations.length > 0 && (
                    <div className="test-recommendations">
                      {recommendations.map((item) => (
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
                  )}
                </div>
              )}

              <div className="test-buttons">
                {currentQuestionIndex > 0 || showScore ? ( // Show the "Back" button if not on the first question or if showing the score
                  <button className="test-back-button button" onClick={handlePreviousQuestion}>
                    &lt;-- Back
                  </button>
                ) : null}

                {!showScore && (
                  <button className="test-next-button button" onClick={handleNextQuestion} disabled={!isAnswerSelected}>
                    {isLastQuestion ? 'Result' : 'Next >'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'></div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Test
