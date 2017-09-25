import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadSelectedWorker } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars,  allWorkers } from 'containers/App/selectors';
import { selectLoading, selectWorkerDetails, selectError, selectAllRoutes } from './selectors';
import { setData } from '../../utils/RoutesData'
import s from '../Styles';
const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;

const basicDataContainer ={
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

const lineComponent = s.lineComponent;

class SelectedWorker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      workerId: props.location.query.id,
      workerDetails: null,
      showBasicDatas: true,
      showPreviousRoutes: true,
      allRoutes: [],
    };
   
   // this.workerSubmit = this.workerSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSelectedWorker(this.state.workerId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      workerDetails: this.props.selectedWorkerDetails
    });
  }

  getBasicDatas() {
    const { selectedWorkerDetails: workerDetails } = this.props;

    return (
      <div style={basicDataContainer}>
        <div style={lineComponent}>
          <H2>NÉV:</H2>
          <h3>{workerDetails.name}</h3>
        </div>
        <div style={lineComponent}>
          <H2>ID:</H2>
          <h3>{workerDetails.id}</h3>
        </div>
        <div style={lineComponent}>
          <H2>TELEFONSZÁM:</H2>
          <h3>{workerDetails.phoneNumber}</h3>
        </div>
        <div style={lineComponent}>
          <H2>POZÍCIÓ:</H2>
          <h3>{workerDetails.position}</h3>
        </div>
        <div style={lineComponent}>
          <H2>SZÜLETÉSI IDŐ:</H2>
          <h3>{workerDetails.dateOfBirth}</h3>
        </div>
      </div>
    );
  }

  getRoutesTable(){
    const { location, allRoutes } = this.props;
    
    if (allRoutes) {
      const data = setData(allRoutes)
      return (
        <DataTable data={data} mainHeaderName={'KORÁBBI UTAZÁSOK'} location={location} showDropDown={false} />
      );
    }
  }

  render() {
    const { selectedWorkerDetails, loading, error } = this.props;
    const { workerDetails, showBasicDatas, showPreviousRoutes } = this.state;
    if (!loading && selectedWorkerDetails) {
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
              <div 
                style={s.clickAbleHeaderLine}
                onClick={() => {this.setState({showBasicDatas: !showBasicDatas})}}
              >
               <h4>ALKALMAZOTT adatai</h4>
               <h4>{showBasicDatas? 'HIDE ME' : 'SHOW ME' }</h4>
              </div>
              {showBasicDatas && this.getBasicDatas()}
              <div 
                style={s.clickAbleHeaderLine}
                onClick={() => {this.setState({showPreviousRoutes: !showPreviousRoutes})}}
              >
                <h4>Korábbi utazások</h4>
                <h4>{showPreviousRoutes? 'HIDE ME' : 'SHOW ME' }</h4>
              </div>
              {showPreviousRoutes && this.getRoutesTable()}
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
    allRoutes: selectAllRoutes(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedWorker: (id) => dispatch(loadSelectedWorker(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWorker);
