import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import CarPhoto from './car-photo.jpg';
import messages from './messages';
import avatar from './avatar.svg';
import * as firebase from "firebase";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
  },
  dropDownStyle: {
    position: 'absolute',
    height: 120,
    width: 200,
    backgroundColor: 'rgb(158, 212, 236)',
    marginTop: 80,
    marginLeft: 50,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgb(158, 212, 236)',
  },
  line: {
    width: 200,
    backgroundColor: 'rgba(120,120,120,0.7)',
    height: 1,
    marginBottom: -5,
  },
}

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    visibleDropDown: false,
    focusedElement: null,
  }

  changePwd() {
    this.props.router.push('/changePassword');
  }

  logOut() {
    firebase.auth().signOut();
    cookies.remove('UID');
    this.props.router.push('/');
  }

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
          <div
            onClick={() => this.setState({ visibleDropDown: !this.state.visibleDropDown })}
            onMouseOver={() => this.setState({ visibleDropDown: true })}
            onMouseLeave={() => this.setState({ visibleDropDown: false })}

          >
          <div 
            style={s.profile} 
          >
            <p style={s.name} ><b>{name}</b>{` (${role})`}</p>
            <img src={avatar} style={s.avatar} alt="avatar logo" />
          {(this.state.visibleDropDown) && (
            <div
              style={s.dropDownStyle}
              // onMouseOver={() => this.setState({ visibleDropDown: true })}
              onMouseOut={() => this.setState({ focusedElement: null })}
            >
              <h3
                style={{ color: this.state.focusedElement === 0 ? 'rgba(100,100,100,0.9)' : 'black' }}
                onMouseOver={() => this.setState({ focusedElement: 0 })}
                onClick={() => this.changePwd()}
              >
                Jelszó változtatás
              </h3>
              <div style={s.line}/>
              <h3
                style={{ color: this.state.focusedElement === 1 ? 'rgba(100,100,100,0.9)' : 'black' }}
                onMouseOver={() => this.setState({ focusedElement: 1 })}
                onClick={() => this.logOut()}
              >
                Kijelentkezés
              </h3>
            </div>
          )}
          </div>
          </div>
        </NavBar>
      </div>
    );
  }
}

export default Header;
