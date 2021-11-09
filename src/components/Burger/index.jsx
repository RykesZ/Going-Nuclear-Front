import { Link } from 'react-router-dom';
import { useVisibility } from '../../utils/hooks';

function Burger() {
  const { toggleVisibility } = useVisibility();
  return (
    <nav className="burger">
      <Link to="/" onClick={() => toggleVisibility()}>
        Accueil
      </Link>
      <Link to="/about" onClick={() => toggleVisibility()}>
        À Propos
      </Link>
      {/* <Link to="/search" onClick={() => toggleVisibility()}>
        Rechercher
      </Link>
      <Link to="/support" onClick={() => toggleVisibility()}>
        Me soutenir
      </Link> */}
      <Link to="/contact" onClick={() => toggleVisibility()}>
        Contact
      </Link>
    </nav>
  );
}

export default Burger;
