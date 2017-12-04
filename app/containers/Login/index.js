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
import { getToken, getUser } from '../App/selectors';
import API from '../../Api'
const realApi = API.create()

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;

const basicDataContainer = {
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pass: 'asdasd',
      email: 'teszt@teszt.hu',
    };
  }

  signIn() {
    const { email, pass } = this.state;
    console.log('email: ',email,'.......', pass)
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass).then( e => this.sigInSuccess(e)).catch(e => console.log('error', e));
    console.log('response: ', promise)
  }

  sigInSuccess(e) {
    // const user = firebase.auth().currentUser;
    // const token = user.getIdToken(true).then( token => console.log('REFRESH:', token))
    // console.log(e);
    console.log('uid', e.uid);
    // console.log('USER', token);
    // console.log('USER', user.company);
    this.props.getUserData(e.uid);
  }

  postSthToDB(e) {
    console.log('post sth', e.uid)
    console.log('DATA: ', data)
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
    console.log(this.props.token)
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
            {/* <div style={s.submitButton} onClick={() => this.register()}> SIGN UP </div>
            <div style={s.submitButton} onClick={() => this.logout()}> LOGOUT </div> */}
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
