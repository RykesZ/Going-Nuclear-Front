import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApiNewsletterRoutes from '../../services/ApiNewsletterRoutes';
import { emailValidation } from '../../services/emailValidation';

function Unsubscribe() {
  let { email } = useParams();
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const toggleDeletionConfirmation = () => {
    setDeletionConfirmed(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValidation(email)) {
      ApiNewsletterRoutes.deleteSubscriber(email)
        .then((response) => {
          if (response.status === 200) {
            toggleDeletionConfirmation();
          } else if (response.status === 500 || response.status === 400) {
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("L'adresse email rentrée n'est pas valide");
    }
  };

  useEffect(() => {
    if (deletionConfirmed === true) {
      console.log('must redirect');
      setTimeout(() => {
        console.log('redirect now');
        window.location.href = 'http://localhost:3000';
      }, 5000);
    }
  }, [deletionConfirmed]);

  return (
    <div className="unsubscribeForm">
      {deletionConfirmed ? (
        <div>
          <h3>Désabonnement à la newsletter confirmé !</h3>
          <p>Vous allez être redirigé</p>
        </div>
      ) : (
        <div>
          <h2>Se désabonner de la newsletter Going Nuclear ?</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              defaultValue={email}
              readOnly
              className="emailInput"
            />
            <input
              type="submit"
              value="Confirmer"
              className="newsletterButton inputButton"
            />
            <Link to="/">
              <input
                type="button"
                value="Annuler"
                className="cancelButton inputButton"
              />
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default Unsubscribe;
