import React, { useState, useEffect } from 'react';
import faqImage from './FAQ.png'; // Adjust path based on your folder structure
import './FAQ.css'; // Create custom CSS for styling

const FAQComponent = () => {
  const [questions, setQuestions] = useState([
    { question: 'How do I rent a bike?', answer: 'Download our app, select a bike, choose your rental duration, complete payment, tap "Reserve Now," and wait for your reservation number. Then, visit our location to pick up your bike.', isOpen: false },
    { question: 'Can I cancel or modify my reservation?', answer: 'Our cancellation policy states that once a reservation is made, it cannot be canceled or refunded. This ensures bike availability and operational efficiency for all users. Please double-check your plans before confirming your booking to avoid any inconvenience.', isOpen: false },
    { question: 'Is there a minimum rental duration?', answer: 'The minimum rental duration may vary depending on the bike and location. Most rentals are available hourly, but some may have daily minimums.', isOpen: false },
    { question: 'What happens if I return the bike late?', answer: 'If you return the bike past the agreed time, additional charges may apply. Be sure to check the terms for late returns to avoid extra fees.', isOpen: false },
    { question: 'What should I do if the bike breaks down during my rental?', answer: 'In the event of a breakdown, contact customer support immediately. They will guide you on the next steps, which may include sending a replacement bike or issuing a refund.', isOpen: false },
    { question: 'What types of bikes are available for rent?', answer: 'We offer a variety of bikes, including city bikes, mountain bikes, and kids bikes. Check our listings for the latest availability and details on each type.', isOpen: false },
    { question: 'Are there age restrictions for renting a bike?', answer: 'Most rentals require riders to be at least 18 years old. However, some bikes allow minors to rent bikes with parental consent.', isOpen: false },
  ]);

  const [cooldownAlert, setCooldownAlert] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false); // Error state
  const [showAlert, setShowAlert] = useState(false); // Success alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // Success alert message
  const [errorMessage, setErrorMessage] = useState(''); // Error alert message
  const cooldownPeriod = 5 * 60 * 1000;

  const toggleQuestion = (index) => {
    setQuestions(questions.map((q, i) => (
      i === index ? { ...q, isOpen: !q.isOpen } : { ...q, isOpen: false }
    )));
  };

  useEffect(() => {
    // Check if there was a previous submission time saved in localStorage
    const savedTimestamp = localStorage.getItem('lastSubmitted');
    if (savedTimestamp) {
      setLastSubmitted(new Date(parseInt(savedTimestamp, 10)));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError(false);
    setShowAlert(false); // Hide any previous alert
    setCooldownAlert(''); // Reset cooldown alert

    const now = new Date();
    if (lastSubmitted && now - lastSubmitted < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - (now - lastSubmitted)) / 60000);
        setError(true);
        setErrorMessage(`Please wait ${remainingTime} minute${remainingTime > 1 ? 's' : ''} before submitting another question.`);
        setTimeout(() => setError(false), 2000);
        return;
    }

    // Check if the question is entered
    if (!newQuestion.trim()) {
        setError(true);
        setErrorMessage('Please enter your question.'); // Error message for question
        setTimeout(() => setError(false), 2000);
        return;
    }

    // Check if the email is entered
    if (!email.trim()) {
        setError(true);
        setErrorMessage('Please enter your email.'); // Error message for email
        setTimeout(() => setError(false), 2000);
        return;
    }

    // Proceed if both question and email are provided
    setLoading(true);
    setError(false); // Reset error state on each new submission attempt
    try {
        const response = await fetch('https://rbms-backend-g216.onrender.com/send-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: newQuestion, email }),
        });

        if (response.ok) {
            // Reset form fields
            setNewQuestion('');
            setEmail('');
            const submissionTime = new Date();
            setLastSubmitted(submissionTime);
            localStorage.setItem('lastSubmitted', submissionTime.getTime().toString());
            setSuccess(true);

            // Set success message and show alert
            setAlertMessage('Your question has been submitted successfully!');
            setShowAlert(true);

            // Hide alert after 4 seconds and reset success state
            setTimeout(() => {
                setShowAlert(false);
                setSuccess(false);
            }, 4000);
        } else {
            setError(true);
            setErrorMessage('There was an error submitting your question. Please try again.');
            setTimeout(() => setError(false), 2000);
        }
    } catch (error) {
        setError(true);
        setErrorMessage('Error sending your question: ' + error.message);
        setTimeout(() => setError(false), 2000);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="faq-container">
      <div className="faq-left">
        <h2>FREQUENTLY ASKED QUESTIONS / FEEDBACK</h2>
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="faq-item">
              <div className="faq-header" onClick={() => toggleQuestion(index)}>
                <span>{q.question}</span>
                <span className="faq-toggle">{q.isOpen ? 'x' : '+'}</span>
              </div>
              {q.isOpen && <p className="faq-answer">{q.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
      <div className="faq-right">
        <img src={faqImage} alt="Any Questions?" className="faq-image" />
        <h3>Any Questions or Suggestions?</h3>
        <p>
          For any questions or concerns about our website, please contact us at our official email address. We will respond to your email as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="faq-input"
          />
          <input
            type="text"
            placeholder="Ask your questions/suggestions here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="faq-input-question"
          />

          <button type="submit" className="faq-submit" disabled={loading || success || error}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : success ? (
              <span className="checkmark">✔</span>
            ) : error ? (
              <span className="error-x">✖</span>
            ) : (
              'SEND'
            )}
          </button>
          {loading && <div className="loading-animation"></div>}
        </form>
        
         {/* Cooldown Alert Notification */}
         {cooldownAlert && (
          <div className="alert-cooldown">
            {cooldownAlert}
          </div>
        )}

        {/* Success Alert Notification */}
        {showAlert && (
          <div className="alert-success">
            {alertMessage}
          </div>
        )}

        {/* Error Alert Notification */}
        {error && (
          <div className="alert-error">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQComponent;
