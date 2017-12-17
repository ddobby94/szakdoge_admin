import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/Button'
import { loadSelectedWorker, editSelectedWorker } from './actions';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'
import CenteredSection from '../HomePage/CenteredSection';
import { selectLoading, selectWorkerDetails, selectError, selectAllRoutes } from './selectors';
import { setData } from '../../utils/RoutesData'
import s from '../Styles';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { makeSelectLoading, makeSelectError, getOwnCompanyData, getWorkers } from '../App/selectors';
import { generateXLSX } from '../../utils/excelHelper';

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
    const d = new Date();
    const workerId = props.location.query.id;
    let workerDetails = null;
    if (props.workers) {
      workerDetails = props.workers[workerId];
    }
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      workerId,
      workerDetails,
      showBasicDatas: true,
      showPreviousRoutes: true,
      allRoutes: [],
      editDatas: false,
      startDate: moment(d),
      endDate: moment(d),
    };
   
    this.workerSubmit = this.workerSubmit.bind(this);
  }

  componentWillReceiveProps({ workers }) {
    if (!this.state.workerDetails) {
      let workerDetails = workers[this.state.workerId];
      this.setState({ workerDetails });
    }
  }

  getBasicDatas() {
    const { workerDetails } = this.state;
    return (
      <div style={basicDataContainer}>
        <div style={lineComponent}>
          <H2>NÉV:</H2>
          <input 
            type="text" style={this.getInputStyle()} 
            disabled={!this.state.editDatas}
            value={workerDetails.name}
            onChange={(event) =>  this.setState({workerDetails: { ...workerDetails, name: event.target.value }})}
          />
        </div>
        <div style={lineComponent}>
          <H2>TELEFONSZÁM:</H2>
          <input 
            type="text" style={this.getInputStyle()} 
            disabled={!this.state.editDatas}
            value={workerDetails.phoneNumber}
            onChange={(event) =>  this.setState({workerDetails: { ...workerDetails, phoneNumber: event.target.value }})}
          />
        </div>
        <Button onClick={this.workerSubmit} >
          {this.state.editDatas? 'MENTÉS': 'ADATOK SZERKESZTÉSE'}
        </Button>
      </div>
    );
  }

  workerSubmit() {
    if (!this.state.editDatas) {
      this.setState({ editDatas: true });
      return
    }
    const {
      name,
      dateOfBirth,
      phoneNumber,
      position,
      email,
      routes_id,      
    } = this.state.workerDetails;
    if (!name || typeof name != 'string') {
      window.alert('Kérjük töltsd ki a telesn név mezőt!');
      return ;
    }
    if (!phoneNumber ) {
      window.alert('Kérjük töltsd ki a telefonszámot!');
      return ;
    }
    if (!email || typeof email != 'string') {
      window.alert('Kérjük töltsd ki az email címet!');
      return ;
    }
    const data = {
      email,
      phoneNumber,
      position,
      dateOfBirth,
      name,
      routes_id,      
    };
    this.props.editSelectedWorker(this.state.workerId, data);
    this.setState({ editDatas: false });
  }

  getRoutesTable() {
    const { location } = this.props;
    const allRoutes = this.state.workerDetails.routes;
    if (allRoutes) {
      const start = moment(this.state.startDate).unix() * 1000;
      const end = moment(this.state.endDate).unix() * 1000;
      let filteredRoutes = allRoutes;
      let startIsSmallerThanEnd = true;
      if (start !== end && start < end) {
        filteredRoutes = allRoutes.filter( v => {
          let d = new Date(v.date).getTime()
          return end >= d && d >= start
        })
      } else if (start > end) {
        startIsSmallerThanEnd = false;
      }
      const data = setData(filteredRoutes);
      if (!data[0]) {
        return (
          <div>
             { !startIsSmallerThanEnd && <h2>Az END dátum nagyobb mint a START dátum!!</h2>}
            <div style={s.datePickerComponents}>
              <h4>START</h4>
              <h4>END</h4>
            </div>
            <div style={s.datePickerComponents}>
              <DatePicker
                selected={this.state.startDate}
                onChange={(date) => this.setState({ startDate: date})}
              />
              <DatePicker
                selected={this.state.endDate}
                onChange={(date) => this.setState({ endDate: date})}
              />
            </div>
            <div>
              <h2>Nincs korábbi út a kiválasztott időszakban!</h2>
            </div>
          </div>
        );
      }
      return (
        <div>
          { !startIsSmallerThanEnd && <h2>Az END dátum nagyobb mint a START dátum!!</h2>}
          <div style={s.datePickerComponents}>
            <h4>START DATE</h4>
            <h4>END DATE</h4>
          </div>
          <div style={s.datePickerComponents}>
            <DatePicker
              selected={this.state.startDate}
              dateFormat="YYYY.MM.DD"
              onChange={(date) => this.setState({ startDate: date })}
            />
            <DatePicker
              selected={this.state.endDate}
              dateFormat="YYYY.MM.DD"
              onChange={(date) => this.setState({ endDate: date })}
            />
          </div>
          <DataTable 
            data={data}
            mainHeaderName={'KORÁBBI UTAZÁSOK'}
            location={location}
            showDropDown={false}
            sortByDates={true}
          />
          {data && startIsSmallerThanEnd && (
            <Button 
              onClick={() => this.saveDataTable(data)}
              style={{ margin: 20 }}
            >
              ADATOK KIEXPORTÁLÁSA EXCELBE
            </Button>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h2>Nincs korábbi út!</h2>
        </div>
      );
    }
  }

  saveDataTable(filteredRoutes) {
    const start = moment(this.state.startDate).format("YYYY.M.DD.");
    const end = moment(this.state.endDate).format("YYYY.M.DD.");
    const { workerDetails } = this.state;
    generateXLSX(workerDetails, filteredRoutes, start, end, 'user');
  }

  getInputStyle() {
    if (this.state.editDatas) {
      return {
        borderWidth: '2px',
        height: '50px',
        marginTop: '15px',
        fontWeight: 'normal',
      };
    }
    return {
      borderWidth: 0,
      height: '50px',
      marginTop: '15px',
      fontWeight: 'bold',
    };
  }

  render() {
    const { selectedWorkerDetails, loading, error, workers } = this.props;
    const { workerDetails, showBasicDatas, showPreviousRoutes } = this.state;

    if (!loading && workerDetails) {
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
                <h4> </h4>
                <h4>ALKALMAZOTT ADATAI</h4>
                <h4>{showBasicDatas? 'HIDE ME' : 'SHOW ME' }</h4>
              </div>
              {showBasicDatas && this.getBasicDatas()}
              <div 
                style={s.clickAbleHeaderLine}
                onClick={() => {this.setState({showPreviousRoutes: !showPreviousRoutes})}}
              >
                <h4> </h4>
                <h4>KORÁBBI UTAZÁSOK</h4>
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
    loading: makeSelectLoading(),
    selectedWorkerDetails: selectWorkerDetails(),
    allRoutes: selectAllRoutes(),
    workers: getWorkers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedWorker: (id) => dispatch(loadSelectedWorker(id)),
    editSelectedWorker: (id, data) => dispatch(editSelectedWorker(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWorker);
