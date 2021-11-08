import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_going_white.png';
import EmailConfirmation from '../EmailConfirmation';
import ApiNewsletterRoutes from '../../services/newsletterSubscription';

function Footer() {
  const [emailInputValue, updateEmailInput] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const popupEmailConfirmed = emailConfirmed ? <EmailConfirmation /> : null;

  const handleEmailInput = (e) => {
    updateEmailInput(e.target.value);
  };

  const toggleConfirmation = () => {
    setEmailConfirmed(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValidation()) {
      ApiNewsletterRoutes.postNewSubscriber(emailInputValue)
        .then((response) => {
          if (response.status === 201) {
            toggleConfirmation();
            updateEmailInput('');
          } else if (response.status === 500 || response.status === 400) {
            console.log(response.message);
          } else {
            console.log('erreur');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("L'adresse email rentrée n'est pas valide");
    }
  };

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailInputValue || regex.test(emailInputValue) === false) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setEmailConfirmed(false);
    }, 3500);
  }, [emailConfirmed]);

  return (
    <footer className="footer">
      <div className="layoutContainer_Footer">
        <div className="shortLinks">
          <Link to="/about">
            <h4>À propos</h4>
          </Link>
          <Link to="/contact">
            <h4>Contact</h4>
          </Link>
          <Link to="/support">
            <h4>Me soutenir</h4>
          </Link>
        </div>
        <div className="subscription">
          <p>
            Pour ne jamais rater la sortie des nouveaux articles, abonnez-vous !
          </p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="emailInput"
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={handleEmailInput}
              value={emailInputValue}
            />
            <input
              className="newsletterButton inputButton"
              type="submit"
              value="Je m'abonne !"
            />
          </form>
          {popupEmailConfirmed}
        </div>
        <div className="trademark">
          <img src={logo} alt="Logo" className="logo" />
          <p>Trademark</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
