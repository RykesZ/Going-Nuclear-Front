import { useState } from 'react';

function MessageSent() {
  const [popupClassName, setPopupClassName] = useState('messageSent');
  setTimeout(() => {
    setPopupClassName('messageSent--disappearing');
  }, 2000);

  return <div className={popupClassName}>Message envoyé ! Merci !</div>;
}

export default MessageSent;
