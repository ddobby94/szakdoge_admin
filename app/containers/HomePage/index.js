/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError, allWorkers } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadWorkersData } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

const divLineStyle = {
  "borderBottomWidth": "10px",
  "borderColor": "black",
  "display": "flex",
  "flexDirecton": "row",
  "justifyContent": "space-around",
}

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  componentDidMount() {
    this.props.loadWorkers();
    console.log(this.props.workers);
  }
/*
    border-bottom-width: 10px !important;
    border-color: black !important;
*/
  renderAllUsers() {
    const { workers } = this.props;
    console.log(workers, 'IN MAP')

    return workers.map( val => {
      return(
        <div
          key={val.id}
          style={divLineStyle}
          onClick={() => { console.log(val.id, 'CLICKED')}}
         >
          <H2 style={{}}>
            {val.name}
          </H2>
          <H2 style={{}}>
            {val.position}
          </H2>
          <H2 style={{}}>
            {val.email}
          </H2>
        </div>
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

  render() {
    const { loading, error, repos, workers } = this.props;
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
            <CenteredSection>
              {this.renderTableHeader()}
              {this.renderAllUsers()}
            </CenteredSection>
           
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
