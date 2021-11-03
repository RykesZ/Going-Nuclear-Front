import { useState } from 'react';

function EmailConfirmation() {
  const [popupClassName, setPopupClassName] = useState('emailConfirmation');
  setTimeout(() => {
    setPopupClassName('emailConfirmation--disappearing');
  }, 2000);

  return <div className={popupClassName}>E-mail enregistré !</div>;
}

export default EmailConfirmation;
