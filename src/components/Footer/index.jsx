import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_going_white.png';

function Footer() {
  const [emailInputValue, updateEmailInput] = useState('');

  const handleEmailInput = (e) => {
    updateEmailInput(e.target.value);
  };

  useEffect(() => {
    console.log(emailInputValue);
  }, [emailInputValue]);

  return (
    <div className="footer">
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
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={handleEmailInput}
          value={emailInputValue}
        ></input>
        <button>Je m'abonne !</button>
      </div>
      <div className="trademark">
        <img src={logo} alt="Logo" className="logo" />
        <p>Trademark</p>
      </div>
    </div>
  );
}

export default Footer;
