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
import { loadCars } from '../App/actions';
import { selectLoading, selectCarDetails, selectError, selectAllRoutes } from './selectors';
import { setData } from '../../utils/RoutesData'
import s from '../Styles';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;

const basicDataContainer ={
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      carId: props.location.query.id,
      selectedCarDetails: null,
      showBasicDatas: true,
      showPreviousRoutes: true,
      allRoutes: [],
      editDatas: false,
      startDate: moment(),
      endDate: moment(),
    };
    this.carSubmit = this.carSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSelectedCar(this.state.carId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedCarDetails) {
      this.setState({
        selectedCarDetails: {
          ...newProps.selectedCarDetails,
          licence_plate1: newProps.selectedCarDetails.licence_plate.split('-')[0],
          licence_plate2: newProps.selectedCarDetails.licence_plate.split('-')[1],
        },
        allRoutes: this.props.allRoutes,
      });
    }
  }

  getBasicDatas() {
    const { selectedCarDetails } = this.state;
    console.log(selectedCarDetails);
    console.log('.-.-.-.-.-.-.-.-.-.-.-.-.-.')
    return (
      <div style={basicDataContainer}>
        <div style={s.lineComponent}>
          <H2>MÁRKA:</H2>
          <input 
            type="text" style={this.getInputStyle()} 
            disabled={!this.state.editDatas}
            value={selectedCarDetails.brand}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, brand: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>TÍPUS:</H2>
          <input 
            type="text" style={this.getInputStyle()} 
            disabled={!this.state.editDatas}
            value={selectedCarDetails.type}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, type: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>HENGERŰRTARTALOM:</H2>
          <input 
            type="text" style={this.getInputStyle()} 
            disabled={!this.state.editDatas}
            value={selectedCarDetails.cylinder_capacity}
            onChange={(event) => this.setState({ selectedCarDetails: { ...selectedCarDetails, cylinder_capacity: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>ID:</H2>
          <input
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.id}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, id: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>SAJÁT TÖMEG (kg):</H2>
          <input 
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.own_weight_kg}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, own_weight_kg: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>ÉVJÁRAT:</H2>
          <input
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.year}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, year: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>ÜZEMANYAG TÍPUSA:</H2>
          <input 
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.is_it_diesel?  'DÍZEL' : 'BENZIN'}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, is_it_diesel: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>SZÍN:</H2>
          <input
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.color}
            onChange={(event) =>  this.setState({selectedCarDetails: { ...selectedCarDetails, color: event.target.value }})}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>TELJESÍTMÉNY (lóerő):</H2>
          <input
            type="text" style={this.getInputStyle()}
            disabled={!this.state.editDatas}
            value={selectedCarDetails.performance_hp}
            onChange={(event) =>  this.setState({ selectedCarDetails: { ...selectedCarDetails, performance_hp: event.target.value } })}
          />
        </div>
        <div style={s.lineComponent}>
          <H2>RENDSZÁM:</H2>
          <div style={s.rowFlexSpaceAround}>
            <input
              type="text" style={this.getInputStyle()}
              value={selectedCarDetails.licence_plate1}
              onChange={(event) => this.setLicencePlate(event.target.value, 'letters')} 
            />
            <H2>-</H2>
            <input
              type="text" style={this.getInputStyle()}
              value={selectedCarDetails.licence_plate2}
              onChange={(event) => this.setLicencePlate(event.target.value, 'numbers')}
            />
          </div>
        </div>
        <Button onClick={this.carSubmit} >
          {this.state.editDatas? 'MENTÉS': 'ADATOK SZERKESZTÉSE'}
        </Button>
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
   this.setState({ editDatas: false});
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

  getRoutesTable(){
    const { location, allRoutes } = this.props;
    console.log('ALL ROUTES', allRoutes)
    if (allRoutes) {
      const start = moment(this.state.startDate).unix() * 1000;
      const end = moment(this.state.endDate).unix() * 1000;
      let filteredRoutes = allRoutes;
      let startIsSmallerThanEnd = true;
      console.log(end, 'END......START ', start)
      if (start !== end && start < end) {
        console.log(filteredRoutes, 'BEFORE FILTERD')
        filteredRoutes = allRoutes.filter( v => {
          console.log(v)
          console.log(v.date)
          let d = new Date(v.date).getTime()
          console.log(d)
          return d < end && d > start
        })
        console.log(filteredRoutes, 'FILTERD')
      } else if (start < end) {
        startIsSmallerThanEnd = false;
      }
      const data = setData(filteredRoutes)

      return (
        <div>
          { !startIsSmallerThanEnd && <h2>Az END dátum nagyobb mint a START dátum!!</h2>}
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
        </div>
      );
    }
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
          <div>
            <CenteredSection>
              <div 
                style={s.clickAbleHeaderLine}
                onClick={() => {this.setState({showBasicDatas: !showBasicDatas})}}
              >
                <h4>Autó adatai</h4>
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
  loading: selectLoading(),
  selectedCarDetails: selectCarDetails(),
  allRoutes: selectAllRoutes(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedCar: (id) => dispatch(loadSelectedCar(id)),
    editCarDatas: (id, data) => dispatch(editCarDatas(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
