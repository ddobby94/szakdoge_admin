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
import { makeSelectLoading, makeSelectError, getOwnCompanyData, getWorkers } from '../App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'
import CenteredSection from './CenteredSection';

const s = {
  newCarButtonContainerStyle: {
    display: "flex",
    flexDirecton: "row",
    justifyContent: "flex-end",
  },
  newWorkerButton: {
    margin: 20,
  },
  divLineStyle: {
    borderBottomWidth: "10px",
    borderColor: "black",
    display: "flex",
    flexDirecton: "row",
    justifyContent: "space-around",
  },
  rowStyle: {
    color: 'black',
    textDecoration: 'none',
  },
};

export class HomePage extends React.PureComponent {

  renderAllUsers() {
    const { workers } = this.props;
    return workers.map( val => {
      return(
        <Link to={'selectedWorker?id=' + val.workerId}>
          <div
            key={val.workerId}
            style={s.divLineStyle}
          >
            <H2 style={s.rowStyle}>
              {val.name}
            </H2>
            <H2 style={s.rowStyle}>
              {val.position}
            </H2>
            <H2 style={s.rowStyle}>
              {val.email}
            </H2>
          </div>
        </Link>
      );
    })
  }


  renderAddWorkersButton() {
    return(
      <div style={s.newCarButtonContainerStyle}>
        <HeaderLink to='new?new=worker' style={s.newWorkerButton}>
          <p id='newWorker'> ÚJ ALKALMAZOTT HOZZÁADÁSA</p>
        </HeaderLink>
      </div>
    );
  }

  render() {
    const { loading, error, companyData, location } = this.props;
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
            {this.renderAddWorkersButton()}
            <DataTable data={workers} mainHeaderName={'ALKALMAZOTTAK'} location={location} />
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
});

export function mapDispatchToProps(dispatch) {
  return {
    // loadWorkers: () => dispatch(loadWorkersData()),
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
