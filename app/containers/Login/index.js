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
import { setUserToken, getUserData, getCompanyData } from '../App/actions';
import { getToken, getUser, error, getOwnCompanyData } from '../App/selectors';
import API from '../../Api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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
      // pass: 'superSecret123',
      // email: 'dobisz_david@windowslive.com',
      pass: 'Secret1234',
      email: 'mail@mail.com',
      signInError: '',
      clickAble: true,
    };
  }

  componentWillReceiveProps({ user, companyData }) {
    
    if (user && roles[user.role]) {
      cookies.set('UID', user.uid);
      this.props.getCompanyData(user.uid);
      this.props.router.push('/workers');
    } else if(user && user.role === 'user') {
      this.setState({ signInError: 'Nincs jogosultsága belépni az adminisztrációs felületre!' })
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
        <CenteredSection>
          <H1>ÚTNYÍLVÁNTARTÓ ALKALAMAZÁS ADMINISZTRÁCIÓS FELÜLET</H1>
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
  companyData: getOwnCompanyData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setUserToken: (token) => dispatch(setUserToken(token)),
    getUserData: (uid) => dispatch(getUserData(uid)),
    getCompanyData: (uid) => dispatch(getCompanyData(uid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
