/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError, allWorkers } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadWorkersData } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

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

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.loadWorkers();
    console.log(this.props.workers);
    console.log(this.props,'ASDASD')
  }

  renderAllUsers() {
    const { workers } = this.props;

    return workers.map( val => {
      return(
        <Link to={'selectedWorker?id=' + val.id}>
          <div
            key={val.id}
            style={divLineStyle}
            onClick={() => { console.log(val.id, 'CLICKED')}}
          >
            <H2 style={rowStyle}>
              {val.name}
            </H2>
            <H2 style={rowStyle}>
              {val.position}
            </H2>
            <H2 style={rowStyle}>
              {val.email}
            </H2>
          </div>
        </Link>
      );
    })
  }

  renderTableHeader() {
    return(
      <div
        style={divLineStyle}
      >
        <H1 style={{}}>
          NÉV
        </H1>
        <H1 style={{}}>
          POZÍCIÓ
        </H1>
        <H1 style={{}}>
          EMAIL CÍM
        </H1>
      </div>
    );
  }

  renderAddWorkersButton() {
    return(
      <div
        style={newCarButtonContainerStyle}
      >
        <div style={addNewCarButton} onClick={() => this.addNewCar()}>
          <Link to='new?new=worker' >
            <H2> ÚJ ALKALMAZOTT HOZZÁADÁSA</H2>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { loading, error, repos, workers, location } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    console.log(error, 'error in render')
    if (!loading && workers) {
      console.log(this.props.workers, 'workers in render')
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
            LOADING
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
  workers: allWorkers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadWorkers: () => dispatch(loadWorkersData()),
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
