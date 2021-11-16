import { useState, useEffect } from 'react';
import ApiContactRoutes from '../../services/ApiContactRoutes';
import MessageSent from '../../components/MessageSent';
import { emailValidation } from '../../services/emailValidation';

function Contact() {
  const [emailInputValue, updateEmailInput] = useState('');
  const [objectInputValue, updateObjectInput] = useState('');
  const [textInputValue, updateTextInput] = useState('');

  const [messageSent, setMessageSent] = useState(false);
  const popupMessageSent = messageSent ? <MessageSent /> : null;

  const handleEmailInput = (e) => {
    updateEmailInput(e.target.value);
  };
  const handleObjectInput = (e) => {
    updateObjectInput(e.target.value);
  };
  const handleTextInput = (e) => {
    updateTextInput(e.target.value);
  };

  const toggleConfirmation = () => {
    setMessageSent(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      emailValidation(emailInputValue) &&
      objectInputValue !== '' &&
      textInputValue !== ''
    ) {
      ApiContactRoutes.sendNewMessage(
        emailInputValue,
        objectInputValue,
        textInputValue
      ).then((response) => {
        if (response.status === 200) {
          console.log('reçu confirmation de message envoyé');
          toggleConfirmation();
          updateEmailInput('');
          updateObjectInput('');
          updateTextInput('');
        } else if (response.status === 500 || response.status === 400) {
          console.log(response.message);
        } else {
          console.log('erreur');
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessageSent(false);
    }, 3500);
  }, [messageSent]);

  return (
    <main className="container">
      <h2>Me contacter</h2>
      <form className="contactForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="fields">
          <div className="field">
            <label>Votre adresse e-mail :</label>
            <input
              type="email"
              name="email"
              placeholder="Ex : prenom.nom@mail.com"
              onChange={handleEmailInput}
              value={emailInputValue}
            />
          </div>
          <div className="field">
            <label>Objet de votre message :</label>
            <input
              type="text"
              placeholder="Ex : Question concernant..."
              onChange={handleObjectInput}
              value={objectInputValue}
            />
          </div>
          <div className="field">
            <label>Votre message :</label>
            <textarea
              name="message"
              id="message"
              cols="20"
              rows="20"
              spellCheck="true"
              maxLength="4000"
              onChange={handleTextInput}
              value={textInputValue}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="submitContactForm inputButton">
          Envoyer
        </button>
      </form>
      {popupMessageSent}
    </main>
  );
}

export default Contact;
