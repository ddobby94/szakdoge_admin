import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import CarPhoto from './car-photo.jpg';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {/*<Img src={CarPhoto} alt="react-boilerplate - Logo" />*/}
        <NavBar>
          <HeaderLink to="/workers">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/cars">
            <FormattedMessage {...messages.cars} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
