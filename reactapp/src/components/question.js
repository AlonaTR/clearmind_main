// question.js
import React from 'react'
import PropTypes from 'prop-types'
import './question.css'

const Question = ({ question, answer }) => {
  return (
    <div className="question-container">
      <span className="question-text heading4">{question}</span>
      <span className="question-text1">{answer}</span>
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Question
