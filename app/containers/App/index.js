import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { 
  setUserToken,
  getUserData,
  getCompanyData,
  setLocationHelper,
} from './actions';
import { 
  getToken,
  getUser,
  makeSelectLoading,
  getWorkers,
  getCars,
  getError,
  getSavedLocation,
} from '../App/selectors';
import { createStructuredSelector } from 'reselect';
import Cookies from 'universal-cookie';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

const cookies = new Cookies();
const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const checkCookies = ({
  router, getUserData, getCompanyData, workers, user, error, loading, savedLocation, setLocationHelper,
  }) => {
  const UID = cookies.get('UID');
  const currentLoc = router.getCurrentLocation();
  if (!UID && currentLoc.pathname !== '/') {
    router.push('/');
  } else if (UID && !workers && !user && !error && !loading && !savedLocation) {
    // setLocationHelper(currentLoc);
    // router.push('/');
    getUserData(UID);
    getCompanyData(UID);
  }
  console.log('heyyyyyyyy11', savedLocation)
  // if (workers && user && savedLocation) {
  //   console.log('heyyyyyyyy', savedLocation)
  //   router.push(savedLocation);
  //   setLocationHelper(null);
  // }
}

export function App(props) {
  const { user, loading, router } = props;
  const currentLoc = props.router.getCurrentLocation();
  checkCookies(props);
  const UID = cookies.get('UID');
  // if (loading) {
  //   return (
  //     <AppWrapper>
  //       <Helmet
  //         titleTemplate="%s - React.js Boilerplate"
  //         defaultTitle="React.js Boilerplate"
  //         meta={[
  //           { name: 'description', content: 'A React.js Boilerplate application' },
  //         ]}
  //       />
  //       <h1>LOADING</h1>
  //     </AppWrapper>
  //   );
  // }
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      {(user && UID) && <Header user={user} router={router} />}
      {React.Children.toArray(props.children)}
      {(user && UID) && <Footer />}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = (state) => createStructuredSelector({
  token: getToken(),
  user: getUser(),
  loading: makeSelectLoading(),
  error: getError(),
  workers: getWorkers(), 
  cars: getCars(),
  savedLocation: getSavedLocation(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUserData: (uid) => dispatch(getUserData(uid)),
    getCompanyData: (uid) => dispatch(getCompanyData(uid)),
    setLocationHelper: (loc) => dispatch(setLocationHelper(loc)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));
