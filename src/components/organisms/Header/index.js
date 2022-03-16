import React from 'react';
import { Link } from 'react-router-dom';
import AdidasLogo from "../../../assets/images/Adidas_Logo.png";
import { StyledLink,FlexStyle } from './style.js';
import './style.js';
const Header = () => {
  return (
    <>
      <FlexStyle>
        <nav>
            <Link to={'/'}>
              <figure>
                <img
                  src={AdidasLogo}
                  loading='lazy'
                  alt='Adidas Logo'
                />
              </figure>
            </Link>
            <h5>Football World Cup</h5>
            <ul>
              <li>
                <StyledLink
                  to={'/home'}
                  aria-label={'Navigation link for home'}
                >
                  Home
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  to={'/myteam'}
                  aria-label={'Navigation link for My Team'}
                >
                  MyTeam
                </StyledLink>
              </li>
            </ul>
        </nav>
      </FlexStyle>
    </>
  );
};

export default Header;
