import { Link } from 'react-router-dom';

function Burger() {
  return (
    <div className="burger">
      <Link to="/">Accueil</Link>
      <Link to="/about">À Propos</Link>
      <Link to="/search">Rechercher</Link>
      <Link to="/support">Me soutenir</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Burger;
