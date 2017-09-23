import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadSelectedWorker } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars,  allWorkers } from 'containers/App/selectors';
import { selectLoading, selectWorkerDetails, selectError } from './selectors';


class SelectedWorker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      workerId: props.location.query.id,
      workerDetails: null,
    };
   
   // this.workerSubmit = this.workerSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSelectedWorker(this.state.workerId);
  }

  componentWillReceiveProps(newProps) {
    console.log('fuck2', newProps)
    this.setState({
      workerDetails: this.props.selectedWorkerDetails
    });
  }

  render() {
    const { selectedWorkerDetails, loading, error } = this.props;
    const { workerDetails } = this.state;
    console.log('fuck')
    if (!loading && selectedWorkerDetails) {
      console.log(this.props.cars, 'workers in render')
      return (
        <div>
          <Helmet
            title="Worker details"
            meta={[
              { name: 'description', content: 'Útnyílvántartó admin felület' },
            ]}
          />
          <div>
            <CenteredSection>
              <H2>
               {'NAME: ' + selectedWorkerDetails.name}
              </H2>
            </CenteredSection>
          </div>
        </div>
      );
    } else if(!loading && error) {
      return (
        <div>
        <Helmet
          title="CARS Page"
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
          title="Worker details"
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

SelectedWorker.propTypes = {
  loading: React.PropTypes.bool,
  selectedWorker: React.PropTypes.object,
  loadSelectedWorker: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
    error: selectError(),
    loading: selectLoading(),
    selectedWorkerDetails: selectWorkerDetails(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedWorker: (id) => dispatch(loadSelectedWorker(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWorker);
