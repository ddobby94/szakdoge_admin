import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import CarPhoto from './car-photo.jpg';
import messages from './messages';
import avatar from './avatar.svg';

const s = {
  avatar: {
    height: 40,
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    marginRight: 20,
  }
}

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { company, name, role } = this.props.user;
    return (
      <div>
        {/*<Img src={CarPhoto} alt="react-boilerplate - Logo" />*/}
        <NavBar style={s.container}>
          <div>
            {company}
          </div>
          <HeaderLink to="/workers">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/cars">
            <FormattedMessage {...messages.cars} />
          </HeaderLink>
          <div style={s.profile}>
            <p style={s.name} ><b>{name}</b>{` (${role})`}</p>
            <img src={avatar} style={s.avatar} alt="avatar logo" />
          </div>
        </NavBar>
      </div>
    );
  }
}

export default Header;
