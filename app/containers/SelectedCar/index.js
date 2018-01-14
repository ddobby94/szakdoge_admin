import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataTable from 'components/DataTable'
import Button from 'components/Button'
import { loadSelectedCar, editCarDatas } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { selectLoading, selectCarDetails, selectError, selectAllRoutes } from './selectors';
import { setData } from '../../utils/RoutesData'
import s from '../Styles';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { makeSelectLoading, makeSelectError, getOwnCompanyData, getCars } from '../App/selectors';
import { generateXLSX } from '../../utils/excelHelper';
const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;

const basicDataContainer ={
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    const carId = props.location.query.id;
    let carDetails = null;
    let licence_plate = 'AAA-000';
    if (props.cars) {
      carDetails = props.cars[carId];
      licence_plate =  carDetails.licence_plate;
    }
    const d = new Date();
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      carId,
      selectedCarDetails: {
        ...carDetails,
        licence_plate,
        licence_plate1: licence_plate.split('-')[0],
        licence_plate2: licence_plate.split('-')[1],
      },
      showBasicDatas: true,
      showPreviousRoutes: true,
      allRoutes: [],
      editDatas: false,
      startDate: moment(d),
      endDate: moment(d),
    };
    this.carSubmit = this.carSubmit.bind(this);
  }

  componentWillReceiveProps({ cars }) {
    if (!this.state.selectedCarDetails.type) {
      let selectedCarDetails = cars[this.state.carId];
      this.setState({ 
        selectedCarDetails: {
          ...selectedCarDetails,
          licence_plate: selectCarDetails.licence_plate,
          licence_plate1: selectedCarDetails.licence_plate.split('-')[0],
          licence_plate2: selectedCarDetails.licence_plate.split('-')[1],
        },
      });
    }
  }

  getBasicDatas() {
    const { selectedCarDetails } = this.state;
    return (
      <div style={s.basicDatasWrapperCars}>
        <div style={s.flexColumn}>
          <div style={s.lineComponent}>
            <h4>MÁRKA:</h4>
            <input 
              type="text" style={this.getInputStyle()} 
              disabled={!this.state.editDatas}
              value={selectedCarDetails.brand}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, brand: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>TÍPUS:</h4>
            <input 
              type="text" style={this.getInputStyle()} 
              disabled={!this.state.editDatas}
              value={selectedCarDetails.type}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, type: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>HENGERŰRTARTALOM:</h4>
            <input 
              type="text" style={this.getInputStyle()} 
              disabled={!this.state.editDatas}
              value={selectedCarDetails.cylinder_capacity}
              onChange={(event) => this.setState({ selectedCarDetails: { ...selectedCarDetails, cylinder_capacity: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>SAJÁT TÖMEG (kg):</h4>
            <input 
              type="text" style={this.getInputStyle()}
              disabled={!this.state.editDatas}
              value={selectedCarDetails.own_weight_kg}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, own_weight_kg: event.target.value }})}
            />
          </div>
        </div>
        <div style={s.flexColumn}>
          <div style={s.lineComponent}>
            <h4>ÉVJÁRAT:</h4>
            <input
              type="text" style={this.getInputStyle()}
              disabled={!this.state.editDatas}
              value={selectedCarDetails.year}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, year: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>ÜZEMANYAG TÍPUSA:</h4>
            <input 
              type="text" style={this.getInputStyle()}
              disabled={!this.state.editDatas}
              value={selectedCarDetails.is_it_diesel?  'DÍZEL' : 'BENZIN'}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, is_it_diesel: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>SZÍN:</h4>
            <input
              type="text" style={this.getInputStyle()}
              disabled={!this.state.editDatas}
              value={selectedCarDetails.color}
              onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, color: event.target.value }})}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>TELJESÍTMÉNY (lóerő):</h4>
            <input
              type="text" style={this.getInputStyle()}
              disabled={!this.state.editDatas}
              value={selectedCarDetails.performance_hp}
              onChange={(event) =>  this.setState({ selectedCarDetails: { ...selectedCarDetails, performance_hp: event.target.value } })}
            />
          </div>
          <div style={s.lineComponent}>
            <h4>RENDSZÁM:</h4>
            <div style={s.rowFlexSpaceAround}>
              <input
                type="text" style={this.getInputStyle()}
                value={selectedCarDetails.licence_plate1}
                onChange={(event) => this.setLicencePlate(event.target.value, 'letters')} 
              />
              <h4>-</h4>
              <input
                type="text" style={this.getInputStyle()}
                value={selectedCarDetails.licence_plate2}
                onChange={(event) => this.setLicencePlate(event.target.value, 'numbers')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  setLicencePlate(value, numsOrLetters) {
    let currentState;
    const { selectedCarDetails } = this.state;
    if (numsOrLetters === 'letters') {
      currentState = this.state.licence_plate1;
      const newState = !Number(value[value.length - 1]) ? value.toUpperCase() : currentState? currentState.slice(0, currentState.length) : ''
      this.setState({
        selectedCarDetails: { 
          ...selectedCarDetails,
          licence_plate1: newState.length >= 3? newState.slice(0,3) : newState
        }
      })
    } else {
      currentState = this.state.licence_plate2;
      const newState = Number(value[value.length - 1])? value : currentState? currentState.slice(0, currentState.length) : ''
      this.setState({
        selectedCarDetails: { 
          ...selectedCarDetails,
          licence_plate2: newState.length >= 3? newState.slice(0,3) : newState,
        }
      })
    }
  }


  carSubmit() {
    if (!this.state.editDatas) {
      this.setState({ editDatas: true});
      return
    }
    const { 
        cylinder_capacity,
        own_weight_kg,
        brand,
        type,
        year,
        performance_hp,
        is_it_diesel,
        licence_plate1,
        licence_plate2,
        color,
        routes_id,
    } = this.state.selectedCarDetails;
    if (!cylinder_capacity || isNaN(cylinder_capacity)) {
      window.alert('Kérjük töltsd ki a hengerűrtartalmat!');
      return ;
    }
    if (!own_weight_kg || isNaN(own_weight_kg)) {
      window.alert('Kérjük töltsd ki a saját tömeget!');
      return ;
    }
    if (!brand || typeof brand != 'string') {
      window.alert('Kérjük töltsd ki az autó márkanevét !');
      return ;
    }
    if (!brand || typeof brand != 'string') {
      window.alert('Kérjük töltsd ki az autó márkanevét !');
      return ;
    }
    if (!color || typeof color != 'string') {
      window.alert('Kérjük töltsd ki az autó színét !');
      return ;
    }
    if (!year || isNaN(year) || year < 1950 || year > new Date().getFullYear()) {
      window.alert('Kérjük töltsd ki az autó típusát !');
      return ;
    }
    if (!performance_hp  || isNaN(performance_hp)) {
      window.alert('Kérjük töltsd ki az autó motorméretét !');
      return ;
    }
    if (!licence_plate1 || typeof licence_plate1 != 'string' || licence_plate1.length !== 3) {
      window.alert('Kérjük töltsd ki az autó rendszámát !');
      return ;
    }
    if (!licence_plate2 || isNaN(licence_plate2) || licence_plate2.toString().length !== 3) {
      window.alert('Kérjük töltsd ki az autó rendszámát !');
      return ;
    }

    const data = {
        cylinder_capacity,
        own_weight_kg,
        brand,
        type,
        year,
        performance_hp,
        is_it_diesel,
        color,
        licence_plate: licence_plate1 + '-' + licence_plate2,
        routes_id,
    }
   this.props.editCarDatas(this.state.carId, data);
   this.setState({ editDatas: false });
  }

  getInputStyle() {
    if (this.state.editDatas) {
      return {
        ...s.inputStyle,
        width: 300,
      };
    }
    return {
      borderWidth: 0,
      height: '50px',
      marginTop: '10px',
      fontWeight: 'bold',
    };
  }

  getRoutesTable(){
    const { location } = this.props;
    let allRoutes = [];
    const routeObj = this.state.selectedCarDetails.routes;
    for (let keys in routeObj) {
      console.log(routeObj[keys])
      allRoutes.push(routeObj[keys]);
    }
    if (allRoutes) {
      const start = moment(this.state.startDate).unix() * 1000;
      const end = moment(this.state.endDate).unix() * 1000;
      
      let filteredRoutes = allRoutes;
      let startIsSmallerThanEnd = true;
      if (start !== end && start < end) {
        filteredRoutes = allRoutes.filter( v => {
          console.log('V', v)
          let d = new Date(v.date).getTime()
          console.log('V.date :', d)          
          return end >= d && d >= start
        })
      } else if (start > end) {
        startIsSmallerThanEnd = false;
      }
      console.log(start, '<--start, end-->', end);
      
      const data = setData(filteredRoutes);
      if (!data[0]) {
        return (
          <div>
             { !startIsSmallerThanEnd && <h2>Az END dátum nagyobb mint a START dátum!!</h2>}
            <div style={s.datePickerComponents}>
              <h4>KEZDETI DÁTUM</h4>
              <h4>VÉG DÁTUM</h4>
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
            <h4>KEZDETI DÁTUM</h4>
            <h4>VÉG DÁTUM</h4>
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
          <DataTable 
            data={data}
            mainHeaderName={'KORÁBBI UTAZÁSOK'}
            location={location}
            showDropDown={false}
            sortByDates={true}
          />
           {data && startIsSmallerThanEnd && (
            <CenteredSection>
              <div 
                style={s.submitButton} 
                onClick={() => this.saveDataTable(data)}
              > 
                ADATOK KIEXPORTÁLÁSA EXCELBE 
              </div>
            </CenteredSection>
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
    const { selectedCarDetails } = this.state;
    generateXLSX(selectedCarDetails, filteredRoutes, start, end, 'car');
  }


  render() {
    const { loading, error } = this.props;
    const { selectedCarDetails, showBasicDatas, showPreviousRoutes, allRoutes, editBasicDatas } = this.state;
    if (!loading && selectedCarDetails) {
      return (
        <div>
          <Helmet
            title="Car details"
            meta={[
              { name: 'description', content: 'Útnyílvántartó admin felület' },
            ]}
          />
           <div style={s.basicDatasContainer}>
              <h3>AUTÓ ADATAI</h3>
              {showBasicDatas && this.getBasicDatas()}
              <CenteredSection>
                <div 
                  style={s.submitButtonSmall} 
                  onClick={this.carSubmit}
                > 
                  {this.state.editDatas? 'MENTÉS': 'ADATOK SZERKESZTÉSE'}
                </div>
              </CenteredSection>
              <h3>KORÁBBI UTAZÁSOK</h3>              
              {showPreviousRoutes && this.getRoutesTable()}
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
          title="Car details"
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

SelectedCar.propTypes = {
  loading: React.PropTypes.bool,
  selectedCar: React.PropTypes.object,
  loadSelectedCar: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
  error: selectError(),
  loading: makeSelectLoading(),
  selectedCarDetails: selectCarDetails(),
  allRoutes: selectAllRoutes(),
  cars: getCars(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedCar: (id) => dispatch(loadSelectedCar(id)),
    editCarDatas: (id, data) => dispatch(editCarDatas(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
