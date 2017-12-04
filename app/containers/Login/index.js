import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataTable from 'components/DataTable'
import Button from 'components/Button'
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import s from '../Styles';
import * as firebase from "firebase";
import { setUserToken, getUserData } from '../App/actions';
import { getToken, getUser, error } from '../App/selectors';
import API from '../../Api'
const realApi = API.create()

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;

const basicDataContainer = {
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

const roles = {
  admin: true,
  superAdmin: true,
  owner: true,
}

class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pass: 'superSecret123',
      email: 'dobisz_david@windowslive.com',
      signInError: '',
      clickAble: true,
    };
  }

  componentWillReceiveProps({ user }) {
    console.log('user', user);
    if (user && roles[user.role]) {
      this.props.router.push('/workers');
    }
  }

  signIn() {
    const { email, pass, clickAble } = this.state;
    if (!clickAble) {
      return
    }
    this.setState({ clickAble: false });
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass)
    .then( e => {
      this.props.getUserData(e.uid)
      this.setState({ signInError: '', clickAble: true });
    })
    .catch(e => this.setState({ signInError: e.message, clickAble: true }));
  }

  register() {
    const { email, pass } = this.state;
    console.log('email: ',email, pass)
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass).then( e => this.postSthToDB(e)).catch(e => console.log('error', e));
    console.log('response: ', promise)
  }

  logout() {
    console.log('HEYY', this.props.user);
    firebase.auth().signOut();
  }

  pwdReset() {
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();
    
    user.updatePassword(newPassword).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    const { signInError } = this.state;
    return (
      <div>
        <Helmet
          title="LOGIN"
          meta={[
            { name: 'description', content: 'Útnyílvántartó admin felület' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>EMAIL</H2>
            <input 
              type="text" value={this.state.email} style={s.inputStyle}
              onChange={(e) => this.setState({ email: e.target.value })} 
            />
            <H2>JELSZÓ</H2>
            <input 
              type="password" value={this.state.pass} style={s.inputStyle}
              onChange={(e) => this.setState({ pass: e.target.value })} 
            />
            <div style={s.submitButton} onClick={() => this.signIn()}> BEJELENTKEZÉS </div>
            <h3 style={s.errorMsg}>{signInError}</h3>
          </CenteredSection>
        </div>
      </div>
    );
  }
}

SelectedCar.propTypes = {
  loading: React.PropTypes.bool,
  selectedCar: React.PropTypes.object,
  loadSelectedCar: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
  token: getToken(),
  user: getUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setUserToken: (token) => dispatch(setUserToken(token)),
    getUserData: (uid) => dispatch(getUserData(uid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
