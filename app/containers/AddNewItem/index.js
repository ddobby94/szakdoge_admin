import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postNewCar, postNewWorker } from './actions';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars,  allWorkers, getOwnCompanyData, makeSelectLoading } from '../App/selectors';
import { selectLoading, selectResponse, selectError } from './selectors';
import s from '../Styles';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { getUser } from '../App/selectors';
import * as firebase from "firebase";
import { getConsumptionNorm } from '../../utils/RoutesData';

class NewItemPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const isItCarsPage = props.location.query.new === 'car'
    this.state = {
      progress: -1,
      loadedRoutes: props.location && [props.location.pathname],
      newCarPage: isItCarsPage,
      role: 'user',
      company: '',
      alertShown: false,
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
            <H2>MÁRKANÉV</H2>
            <input type="text" value={this.state.brand} style={s.inputStyle}
             onChange={(event) => this.setState({brand: event.target.value})} />
            <H2>TÍPUS</H2>
            <input type="text" value={this.state.type} style={s.inputStyle}
             onChange={(event) => this.setState({type: event.target.value})} />
            <H2>HENGERŰRTARTALOM (köbcenti)</H2>
            <input type="text" value={this.state.cylinder_capacity} style={s.inputStyle}
             onChange={(event) => this.setState({cylinder_capacity: event.target.value})} />
            <H2>AUTÓ SAJÁT TÖMEGE (kg)</H2>
            <input type="text" value={this.state.own_weight_kg} style={s.inputStyle}
            onChange={(event) => this.setState({own_weight_kg: event.target.value})} />
            <H2>ÉVJÁRAT</H2>
            <input type="text" value={this.state.year} style={s.inputStyle}
             onChange={(event) => this.setState({year: event.target.value})} />
            <H2>TELJESÍTMÉNY (Lóerő)</H2>
            <input type="text" value={this.state.performance_hp} style={s.inputStyle}
             onChange={(event) => this.setState({performance_hp: event.target.value})} />
            <H2>Üzemanagy Típúsa</H2>
            <Select options={[
                { value: 'diesel', label: 'Dízel' },
                { value: 'petrol', label: 'Benzin' },
                // { value: 'hybrid', label: 'Hibrid' },
                // { value: 'electric', label: 'Elektromos' },
              ]} 
              onChange={val => this.setState({ fuelType: val })}
              value={this.state.fuelType} placeholder="Select an option"
            />
            {/* Az autógázzal közlekedőknél a normát a fenti táblázat, valamint cseppfolyós propán-bután gázüzem (LPG) esetén 1,2 (liter/liter) értékű, földgáz (CNG, LNG) üzem esetén pedig 0,8 (Nm3/liter) értékű módosító tényező szorzataként kell megállapítani. Abban az esetben, ha egy jármű üzemanyag-fogyasztási normája nem állapítható meg - például egy hibrid vagy elektromos gépjármű esetében - a 60/1992. (IV. 1.) Korm. rendelet 2. § (1) bekezdésében foglaltak alapján, akkor az említett § (2) bekezdése a következő szabályt írja elő: 
"(2) Az 1. mellékletben fel nem tüntetett típusú, valamint az 1/A. melléklet alapján meg nem határozható alapnormájú, illetőleg a rendeletben meghatározottaktól eltérő fajtájú üzemanyaggal üzemelő gépjárművek esetében az alapnorma értékét a gyártó vagy
a) a gyártó adatai, vagy
b) az üzemanyag-fogyasztás mérése
alapján műszaki szakértő állapíthatja meg." */}
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
        fuelType,
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

    this.setState({ alertShown: false });
    const { companyData } = this.props;
    let carId = 0;
    if (companyData.cars) {
      carId = companyData.cars[companyData.cars.length - 1].id + 1;
    }
    const consuption_norm = getConsumptionNorm(cylinder_capacity, fuelType. value);
    const data = {
        cylinder_capacity,
        own_weight_kg,
        brand,
        type,
        year,
        performance_hp,
        consuptionNorm,
        fuelType: fuelType.value,
        color,
        licence_plate: licence_plate1 + '-' + licence_plate2,
        id: carId,
    }
    this.props.postNewCar(this.props.user.company, carId, data);
}

  renderWorkerForm() {
    const { role, company } = this.props.user;
    const roleBasedOptions = {
      admin: [{ value: 'user', label: 'User' }],
      superAdmin: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ],
      owner: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'superAdmin', label: 'Szuper admin' },
      ],
    }
    if ( role !== 'owner') {
      this.setState({ company })
    }
    return(
      <div style={s.divLineStyleColumn}>
        <form onSubmit={this.workerSubmit}>
            <H2>JOGOSULTSÁG</H2>
            <Select options={roleBasedOptions[role]} 
              onChange={val => this.setState({ role: val })}
              value={this.state.role} placeholder="Select an option"
            />
            <H2>TELJES NÉV</H2>
            <input type="text" value={this.state.name} style={s.inputStyle}
             onChange={(event) => this.setState({name: event.target.value})} />
             <H2>CÉG</H2>
            {role === 'owner' ? <input type="text" value={this.state.company} style={s.inputStyle}
             onChange={(event) => this.setState({company: event.target.value})} />
             : <h3>{company}</h3>
            }
            <H2>TELEFONSZÁM</H2>
            <input type="text" value={this.state.phoneNumber} style={s.inputStyle}
             onChange={(event) => this.setState({phoneNumber: event.target.value})} />
            <H2>EMAIL CÍM</H2>
            <input type="text" value={this.state.email} style={s.inputStyle}
             onChange={(event) => this.setState({email: event.target.value})} />
             <H2>JELSZÓ</H2>
            <input type="text" value={this.state.password} style={s.inputStyle}
             onChange={(event) => this.setState({password: event.target.value})} />
            <div style={s.submitButton} onClick={this.workerSubmit}> MENTÉS </div>
        </form>
      </div>
    );
  }

  workerSubmit() {
    const { user } = this.props;
    const {
      name,
      company,
      phoneNumber,
      password,
      email,
      role,
    } = this.state;
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
    if (!company || typeof company != 'string') {
      window.alert('Kérjük töltsd ki a cég nevét!');
      return ;
    }
    if (!password || typeof password != 'string') {
      window.alert('Kérjük töltsd ki az jelszót!');
      return ;
    }
    this.setState({ alertShown: false });
    let data = {
      uid: user.uid,
      phoneNumber,
      company,
      name,
      role: role.value,
      email,
    }
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password)
    .then( e => {
      data.targetUid = e.uid;
      this.props.postNewWorker(data)
    })
    .catch( e => alert(e.message));
  }

  render() {    
    const { response, loading, error } = this.props;
    if (response && response.ok && !loading && !this.state.alertShown) {
      this.setState({ alertShown: true });
      window.alert(' Az adatokat sikeresen elmentettük! ');
    }
    if (response && (!response.ok || error)  && !this.state.alertShown) {
      this.setState({ alertShown: true });
      window.alert('Hiba történt!');
    }
    if (!loading) {
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
    loading: makeSelectLoading(),
    response: selectResponse(),
    error: selectError(),
    user: getUser(),
    companyData: getOwnCompanyData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    postNewCar: (company, id, data) => dispatch(postNewCar(company, id, data)),
    postNewWorker: (data) => dispatch(postNewWorker(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemPage);
