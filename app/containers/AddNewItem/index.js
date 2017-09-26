import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postNewCar, postNewWorker } from './actions';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars,  allWorkers } from 'containers/App/selectors';
import { selectLoading, selectResponse, selectError } from './selectors';
import s from '../Styles';


class NewItemPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const isItCarsPage = props.location.query.new === 'car'
    let carsLength = props.cars ? props.cars.length : 3
    let workersLength = props.workers? props.workers.length : 4 // BIG FCKN TODO
    this.state = {
      progress: -1,
      loadedRoutes: props.location && [props.location.pathname],
      newCarPage: isItCarsPage,
      length: isItCarsPage? carsLength : workersLength,
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
      <div style={s.divLineStyleColumn}>
        <form onSubmit={this.carSubmit}>
            <H2>HENGERŰRTARTALOM (köbcenti)</H2>
            <input type="text" value={this.state.cylinder_capacity} style={s.inputStyle}
             onChange={(event) => this.setState({cylinder_capacity: event.target.value})} />
            <H2>AUTÓ SAJÁT TÖMEGE (kg)</H2>
            <input type="text" value={this.state.own_weight_kg} style={s.inputStyle}
            onChange={(event) => this.setState({own_weight_kg: event.target.value})} />
            <H2>MÁRKANÉV</H2>
            <input type="text" value={this.state.brand} style={s.inputStyle}
             onChange={(event) => this.setState({brand: event.target.value})} />
            <H2>TÍPUS</H2>
            <input type="text" value={this.state.type} style={s.inputStyle}
             onChange={(event) => this.setState({type: event.target.value})} />
            <H2>ÉVJÁRAT</H2>
            <input type="text" value={this.state.year} style={s.inputStyle}
             onChange={(event) => this.setState({year: event.target.value})} />
            <H2>TELJESÍTMÉNY (Lóerő)</H2>
            <input type="text" value={this.state.performance_hp} style={s.inputStyle}
             onChange={(event) => this.setState({performance_hp: event.target.value})} />
            <H2>isItDiesel</H2>
            <input type="text" value={this.state.is_it_diesel} style={s.inputStyle}
             onChange={(event) => this.setState({is_it_diesel: !!event.target.value})} />
             <H2>SZÍN</H2>
            <input type="text" value={this.state.color} style={s.inputStyle}
             onChange={(event) => this.setState({color: event.target.value})} />
            <H2>RENDSZÁM</H2>
            <div style={s.rowFlexSpaceAround}>
              <input type="text" value={this.state.licence_plate1} style={s.licenceInput}
                onChange={(event) => this.setLicencePlate(event.target.value, 'letters')} />
              <H2>-</H2>
              <input type="text" value={this.state.licence_plate2} style={s.licenceInput}
                onChange={(event) => this.setLicencePlate(event.target.value, 'numbers')} />
             </div>
            <div style={s.submitButton} onClick={this.carSubmit}> MENTÉS </div>
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
      window.alert('Kérjük töltsd ki a hengerűrtartalmat!');
      return ;
    }
    if (!own_weight_kg || isNaN(own_weight_kg)) {
      window.alert('Kérjük töltsd ki az autó saját tömegét!');
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
      <div style={s.divLineStyleColumn}>
        <form onSubmit={this.workerSubmit}>
            <H2>TELJES NÉV</H2>
            <input type="text" value={this.state.name} style={s.inputStyle}
             onChange={(event) => this.setState({name: event.target.value})} />
            <H2>SZÜLETÉSI DÁTUM</H2>
            <input type="text" value={this.state.dateOfBirth} style={s.inputStyle}
            onChange={(event) => this.setState({dateOfBirth: event.target.value})} />
            <H2>TELEFONSZÁM</H2>
            <input type="text" value={this.state.phoneNumber} style={s.inputStyle}
             onChange={(event) => this.setState({phoneNumber: event.target.value})} />
            <H2>POZÍCIÓ</H2>
            <input type="text" value={this.state.position} style={s.inputStyle}
             onChange={(event) => this.setState({position: event.target.value})} />
            <H2>EMAIL CÍM</H2>
            <input type="text" value={this.state.email} style={s.inputStyle}
             onChange={(event) => this.setState({email: event.target.value})} />
            <div style={s.submitButton} onClick={this.workerSubmit}> MENTÉS </div>
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
    const { response, loading, error } = this.props;
    if (response && response.ok && !loading) {
      window.alert(' Az adatokat sikeresen elmentettük! ');
    }
    if (response && (!response.ok || error)) {
      window.alert('Hiba történt!');
    }
    if (true) {
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
