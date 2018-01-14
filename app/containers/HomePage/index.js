/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import HeaderLink from 'components/Header/HeaderLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, getOwnCompanyData, getWorkers, getUser } from '../App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'
import CenteredSection from './CenteredSection';
import s from '../Styles';
// import { Link } from 'react-router';

const divLineStyle = {
  borderBottomWidth: "10px",
  borderColor: "black",
  display: "flex",
  flexDirecton: "row",
  justifyContent: "space-around",
}

const newCarButtonContainerStyle = {
  display: "flex",
  flexDirecton: "row",
  justifyContent: "flex-end",
  margin: 20,
}

const addNewCarButton = {
  width: 250,
  height: 100,
  marginRight: 100,
  borderColor: 'black',
  borderWidth: 5,
  borderRadius: 7,
  backgroundColor: 'rgba(255,20,20,0.3)',
}

const rowStyle = {
  color: 'black',
  textDecoration: 'none',
}

export class HomePage extends React.PureComponent {

  renderAddWorkersButton() {
    return(
      <CenteredSection style={{ alignItems: 'center' }}>
        <Link to='new?new=worker' >
          <div style={s.submitButton}>ÚJ ALKALMAZOTT HOZZÁADÁSA</div>
        </Link>
      </CenteredSection>
    );
  }

  render() {
    const { loading, error, companyData, location, user } = this.props;
    console.log('homepage loading: ', loading, 'home page comp data: ', companyData)
    console.log('******', user, '********')
    if (!loading && user.role === 'owner') {
      return (
        <div>
          <Helmet
            title="Home Page"
            meta={[
              { name: 'description', content: 'A React.js Boilerplate application homepage' },
            ]}
          />
          <div>
            {this.renderAddWorkersButton()}
          </div>
        </div>
      );
    }
    if ( !loading && companyData) {
      const { workers } = companyData;
      console.log(workers,'workers', companyData, 'companyData')
      return (
        <div>
          <Helmet
            title="Home Page"
            meta={[
              { name: 'description', content: 'A React.js Boilerplate application homepage' },
            ]}
          />
          <div>
            <div style={s.dataTableTitleContainer}>
              <h3>AZ ALKALMAZOTTAK ADATAI: </h3>
              <p>Az egyes sorokra kattintva lehet megnézni az alkalmazottak részeletes adatait. </p>
            </div>
            <DataTable data={workers} mainHeaderName={'ALKALMAZOTTAK'} location={location} />
            {this.renderAddWorkersButton()}
          </div>
        </div>
      );
    } else if(!loading && error) {
      return (
        <div>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Útnyílvántartó admin felület' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              {error}
            </H2>
          </CenteredSection>
        </div>
      </div>
      );
    }
    return (
      <div>
      <Helmet
        title="Home Page"
        meta={[
          { name: 'description', content: 'Útnyílvántartó admin felület' },
        ]}
      />
      <div>
        <CenteredSection>
          <H2>
            LOADING...
          </H2>
        </CenteredSection>
      </div>
    </div>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  username: React.PropTypes.string,
};

const mapStateToProps = (state) => createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  companyData: getOwnCompanyData(),
  workers: getWorkers(),
  user: getUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // loadWorkers: () => dispatch(loadWorkersData()),
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
