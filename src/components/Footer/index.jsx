import { useState, useEffect } from 'react'
import logo from '../../assets/logo_going_white.png'

function Footer() {
  const [emailInputValue, updateEmailInput] = useState('')

  const handleEmailInput = (e) => {
    updateEmailInput(e.target.value)
  }

  useEffect(() => {
    console.log(emailInputValue)
  }, [emailInputValue])

  return (
    <div className="footer">
      <div className="shortLinks">
        <h4>À propos</h4>
        <h4>Contact</h4>
        <h4>Me soutenir</h4>
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
  )
}

export default Footer
