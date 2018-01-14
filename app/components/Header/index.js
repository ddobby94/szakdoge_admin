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
import s from '../../containers/Styles';
import { Link } from 'react-router';
const cookies = new Cookies();

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
    const location = window.location.href;
    const end = ((location.match(/\/\w+/g) || [])[1] || 'asd').match(/\w+/g)[0];
    console.log('location: ', location.match(/\/\w+/g), 'found :', end)

    return (
      <div style={s.headerContainer}>
        <NavBar style={s.container}>
          <h3 style={s.headerMenuText}>
            {`Cég: ${company}`}
          </h3>
          <div style={end === 'workers'? s.activeMenuTab : s.menuTab}>
            <Link to="/workers">
              <h3 style={ end === 'workers' ? s.activeMenuText : s.headerMenuText} > ALKALMAZOTTAK </h3>
            </Link>
          </div>
          <div style={end === 'cars'? s.activeMenuTab : s.menuTab}>
            <Link to="/cars">
              <h3 style={ end === 'cars' ? s.activeMenuText : s.headerMenuText} > AUTÓK </h3>
            </Link>
          </div>
          <div
            style={s.profileInfo}
            onClick={() => this.setState({ visibleDropDown: !this.state.visibleDropDown })}
            onMouseLeave={() => this.setState({ visibleDropDown: false })}
          >
          <div 
            style={s.profile} 
          >
            <h4 style={this.state.visibleDropDown? s.activeMenuText : s.name} ><b>{name}</b>{` (${role})`}</h4>
          {(this.state.visibleDropDown) && (
            <div
              style={s.dropDownStyle}
              // onMouseOver={() => this.setState({ visibleDropDown: true })}
              onMouseOut={() => this.setState({ focusedElement: null })}
            >
              <h3
                style={{ color: this.state.focusedElement === 0 ? '#37a1b8' : 'white' }}
                onMouseOver={() => this.setState({ focusedElement: 0 })}
                onClick={() => this.changePwd()}
              >
                Jelszó változtatás
              </h3>
              <div style={s.line}/>
              <h3
                style={{ color: this.state.focusedElement === 1 ? '#37a1b8' : 'white' }}
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
