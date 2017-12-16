import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { getToken, getUser } from '../App/selectors';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;


export function App(props) {
  const { user } = props;
  // console.log('USER')
  // console.log('USER')
  console.log('USER')
  console.log(user)
  console.log('USER')
  // console.log('USER')
  // console.log('USER')
  if (props.router) {
    const currentLoc = props.router.getCurrentLocation();
    if (!user && props.router && currentLoc.pathname !== '/') {
      props.router.push('/');
    } else if (user === 'user') {
      props.router.push('/');
    }
  }
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      {user && <Header user={user} />}
      {React.Children.toArray(props.children)}
      {user && <Footer />}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = (state) => createStructuredSelector({
  // token: getToken(),
  user: getUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));
