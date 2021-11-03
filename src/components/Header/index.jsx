import logo from '../../assets/logo_going_white.png';
import burgerMenu from '../../assets/burger_menu.png';
import Burger from '../Burger';
import { Link } from 'react-router-dom';
import { useVisibility } from '../../utils/hooks';

function Header() {
  const { toggleVisibility, burgerVisibility } = useVisibility();
  return (
    <div className="header">
      <div className="layoutContainer_Header">
        <div className="topHeader">
          <Link to="/">
            <h1 className="siteTitle">
              GOING
              <br />
              nuclear
            </h1>
          </Link>
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <img
            src={burgerMenu}
            alt="Menu"
            id="burgerMenu"
            onClick={() => toggleVisibility()}
          />
        </div>
        <h2 className="bottomHeader">
          Site web d'infographies sur le nucléaire
        </h2>
        {burgerVisibility ? <Burger /> : null}
      </div>
    </div>
  );
}

export default Header;
