import logo from '../../assets/logo_going_white.png';
import Burger from '../Burger';
import { Link } from 'react-router-dom';
import { useVisibility } from '../../utils/hooks';
import { useState } from 'react';

function Header() {
  const { toggleVisibility, burgerVisibility } = useVisibility();
  const [firstClicked, setFirstClicked] = useState(false);

  const handleBurgerClick = () => {
    toggleVisibility();
    setFirstClicked(true);
  };

  return (
    <header className="header">
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

          <div className="burgerMenu" onClick={() => handleBurgerClick()}>
            <div
              className={
                burgerVisibility ? 'barGroupAscend' : 'barGroupDescend'
              }
            >
              <div id="bar1" className="burgerBar"></div>
              <div id="bar2" className="burgerBar"></div>
              <div id="bar3" className="burgerBar"></div>
            </div>
          </div>
        </div>
        <h2 className="bottomHeader">
          Site web d'infographies sur le nucléaire
        </h2>
      </div>
      <Burger
        className1={burgerVisibility ? 'burgerUp' : 'burgerDown'}
        animated={firstClicked}
      />
    </header>
  );
}

export default Header;
