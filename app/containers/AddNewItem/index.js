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

import { postNewCar, postNewWorker } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars,  allWorkers } from 'containers/App/selectors';
import { selectLoading, selectResponse, selectError } from './selectors';


const divLineStyle = {
  borderBottomWidth: "10px",
  borderColor: "black",
  display: "flex",
  flexDirecton: "column",
  justifyContent: "space-around",
}

const newCarButtonContainerStyle = {
  display: "flex",
  flexDirecton: "row",
  justifyContent: "flex-end",
}

const addNewCarButton = {
  width: 200,
  height: 100,
  marginRight: 100,
  borderColor: 'black',
  borderWidth: 5,
  borderRadius: 3,
}

const inputStyle = {
  borderColor: 'black',
  borderWidth: 5,
  borderRadius: 3,
  backgroundColor: 'pink',
  fontSize: 25,
}

const rowFlex = {
  display: "flex",
  flexDirecton: 'row',
  justifyContent: "space-around",
}

const licenceInput = {
  ...inputStyle,
  width: '60px',
  height: '40px',
  marginTop: '20px',
}

const submitButton = {
  fontSize: 20,
  height: '70px',
  marginTop: '20px',
  backgroundColor: 'blue'
}

class NewItemPage extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(props.location.query.new)
    const isItCarsPage = props.location.query.new === 'car'
    this.state = {
      progress: -1,
      loadedRoutes: props.location && [props.location.pathname],
      newCarPage: isItCarsPage,
      length: isItCarsPage? props.cars.length : props.workers.length,
    };
    this.carSubmit = this.carSubmit.bind(this);
    this.setLicencePlate = this.setLicencePlate.bind(this);
    this.workerSubmit = this.workerSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  renderCarsFrom(){
    return(
      <div style={divLineStyle}>
        <form style={{ backgroundColor: 'aqua'}} onSubmit={this.carSubmit}>
            <H2>HENGERŰRTARTALOM (köbcenti)</H2>
            <input type="text" value={this.state.cylinder_capacity} style={inputStyle}
             onChange={(event) => this.setState({cylinder_capacity: event.target.value})} />
            <H2>AUTÓ SAJÁT TÖMEGE (kg)</H2>
            <input type="text" value={this.state.own_weight_kg} style={inputStyle}
            onChange={(event) => this.setState({own_weight_kg: event.target.value})} />
            <H2>MÁRKANÉV</H2>
            <input type="text" value={this.state.brand} style={inputStyle}
             onChange={(event) => this.setState({brand: event.target.value})} />
            <H2>TÍPUS</H2>
            <input type="text" value={this.state.type} style={inputStyle}
             onChange={(event) => this.setState({type: event.target.value})} />
            <H2>ÉVJÁRAT</H2>
            <input type="text" value={this.state.year} style={inputStyle}
             onChange={(event) => this.setState({year: event.target.value})} />
            <H2>TELJESÍTMÉNY (Lóerő)</H2>
            <input type="text" value={this.state.performance_hp} style={inputStyle}
             onChange={(event) => this.setState({performance_hp: event.target.value})} />
            <H2>isItDiesel</H2>
            <input type="text" value={this.state.is_it_diesel} style={inputStyle}
             onChange={(event) => this.setState({is_it_diesel: !!event.target.value})} />
             <H2>SZÍN</H2>
            <input type="text" value={this.state.color} style={inputStyle}
             onChange={(event) => this.setState({color: event.target.value})} />
            <H2>RENDSZÁM</H2>
            <div style={rowFlex}>
              <input type="text" value={this.state.licence_plate1} style={licenceInput}
                onChange={(event) => this.setLicencePlate(event.target.value, 'letters')} />
              <H2>-</H2>
              <input type="text" value={this.state.licence_plate2} style={licenceInput}
                onChange={(event) => this.setLicencePlate(event.target.value, 'numbers')} />
             </div>
            <div style={submitButton} onClick={this.carSubmit}> CLICK ME! </div>
        </form>
      </div>
    );
  }
  
  setLicencePlate(value, numsOrLetters) {
    let currentState;
    if (numsOrLetters === 'letters') {
      currentState = this.state.licence_plate1;
      const newState = !Number(value[value.length - 1]) ? value.toUpperCase() : currentState? currentState.slice(0, currentState.length) : ''
      this.setState({
        licence_plate1: newState.length >= 3? newState.slice(0,3) : newState
        })
    } else {
      currentState = this.state.licence_plate2;
      const newState = Number(value[value.length - 1])? value : currentState? currentState.slice(0, currentState.length) : ''
      this.setState({
        licence_plate2: newState.length >= 3? newState.slice(0,3) : newState
      })
    }
  }


  carSubmit() {
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
    } = this.state;
    if (!cylinder_capacity || isNaN(cylinder_capacity)) {
      window.alert('Kérjük töltsd ki a max fogyasztást!');
      return ;
    }
    if (!own_weight_kg || isNaN(own_weight_kg)) {
      window.alert('Kérjük töltsd ki a min fogyasztást!');
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
        id: this.state.length,
    }
   this.props.postNewCar(this.state.length, data);
  }

  renderWorkerForm() {
    return(
      <div style={divLineStyle}>
        <form style={{ backgroundColor: 'aqua'}} onSubmit={this.workerSubmit}>
            <H2>TELJES NÉV</H2>
            <input type="text" value={this.state.name} style={inputStyle}
             onChange={(event) => this.setState({name: event.target.value})} />
            <H2>SZÜLETÉSI DÁTUM</H2>
            <input type="text" value={this.state.dateOfBirth} style={inputStyle}
            onChange={(event) => this.setState({dateOfBirth: event.target.value})} />
            <H2>TELEFONSZÁM</H2>
            <input type="text" value={this.state.phoneNumber} style={inputStyle}
             onChange={(event) => this.setState({phoneNumber: event.target.value})} />
            <H2>POZÍCIÓ</H2>
            <input type="text" value={this.state.position} style={inputStyle}
             onChange={(event) => this.setState({position: event.target.value})} />
            <H2>EMAILCÍM</H2>
            <input type="text" value={this.state.email} style={inputStyle}
             onChange={(event) => this.setState({email: event.target.value})} />
            <div style={submitButton} onClick={this.workerSubmit}> CLICK ME! </div>
        </form>
      </div>
    );
  }

  workerSubmit() {
    const {
      name,
      dateOfBirth,
      phoneNumber,
      position,
      email,
    } = this.state;
    if (!name || typeof name != 'string') {
      window.alert('Kérjük töltsd ki a telesn név mezőt!');
      return ;
    }
    if (!dateOfBirth) {
      window.alert('Kérjük töltsd ki születési dátumot!');
      return ;
    }
    if (!phoneNumber ) {
      window.alert('Kérjük töltsd ki a telefonszámot!');
      return ;
    }
    if (!position || typeof position != 'string') {
      window.alert('Kérjük töltsd ki pozíciót!');
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
      id: this.state.length,
    }
    this.props.postNewWorker(this.state.length, data)
  }

  render() {    
    console.log(this.props.newPage, 'new in render')
    const { response, loading, error } = this.props;
    console.log(response, 'respo');
    console.log(loading, 'loading')
    if (response && response.ok && !loading) {
      window.alert(' Az adatokat sikeresen elmentettük! ');
    }
    if (response && (!response.ok || error)) {
      window.alert('Hiba történt!');
    }
    if (true) {
      console.log(this.props.cars, 'workers in render')
      return (
        <div>
          <Helmet
            title="ADD NEW Page"
            meta={[
              { name: 'description', content: 'útnyílvántartó app' },
            ]}
          />
          <div>
            <CenteredSection>
              {this.state.newCarPage? (<H2>ÚJ AUTÓ HOZZÁADÁSA</H2>): (<H2>ÚJ ALKALMAZOTT HOZZÁADÁSA</H2>)}
              {this.state.newCarPage? this.renderCarsFrom(): this.renderWorkerForm() /*TODO*/} 
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

NewItemPage.propTypes = {
  loading: React.PropTypes.bool,
  cars: React.PropTypes.array,
  loadCars: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
    cars: allCars(),
    workers: allWorkers(),
    loading: selectLoading(),
    response: selectResponse(),
    error: selectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    postNewCar: (id, data) => dispatch(postNewCar(id, data)),
    postNewWorker: (id, data) => dispatch(postNewWorker(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemPage);
