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

import { postNewCar } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { allCars } from 'containers/App/selectors';

const divLineStyle = {
  "borderBottomWidth": "10px",
  "borderColor": "black",
  "display": "flex",
  "flexDirecton": "column",
  "justifyContent": "space-around",
}

const newCarButtonContainerStyle = {
  "display": "flex",
  "flexDirecton": "row",
  "justifyContent": "flex-end",
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

class NewItemPage extends React.PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      progress: -1,
      loadedRoutes: props.location && [props.location.pathname],
    };
    this.carSubmit = this.carSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  renderCarsFrom(){
    return(
      <div style={divLineStyle}>
        <form style={{ backgroundColor: 'aqua'}} onSubmit={this.carSubmit}>
            <H2>FOGYASZTÁS MAX</H2>
            <input type="text" value={this.state.avarage_consuming_max} style={inputStyle}
             onChange={(event) => this.setState({avarage_consuming_max: event.target.value})} />
            <H2>FOGYASZTÁS MIN</H2>
            <input type="text" value={this.state.avarage_consuming_min} style={inputStyle}
            onChange={(event) => this.setState({avarage_consuming_min: event.target.value})} />
            <H2>MÁRKANÉV</H2>
            <input type="text"value={this.state.brand} style={inputStyle}
             onChange={(event) => this.setState({brand: event.target.value})} />
            <H2>TÍPUS</H2>
            <input type="text"value={this.state.type} style={inputStyle}
             onChange={(event) => this.setState({type: event.target.value})} />
            <H2>ÉVJÁRAT</H2>
            <input type="text"value={this.state.year} style={inputStyle}
             onChange={(event) => this.setState({year: event.target.value})} />
            <H2>MOTORMÉRET</H2>
            <input type="text"value={this.state.engine_size} style={inputStyle}
             onChange={(event) => this.setState({engine_size: event.target.value})} />
            <H2>isItDiesel</H2>
            <input type="text"value={this.state.isItDiesel} style={inputStyle}
             onChange={(event) => this.setState({isItDiesel: !!event.target.value})} />
            <H2>RENDSZÁM</H2>
            <input type="text"value={this.state.licence_plate} style={inputStyle}
             onChange={(event) => this.setState({licence_plate: event.target.value})} />
            <div style={{fontSize: 20, width: 300, height: 300, marginTop: 50}} onClick={this.carSubmit}> CLICK ME! </div>
        </form>
      </div>
    );
  }


  carSubmit() {
    const { 
        avarage_consuming_max,
        avarage_consuming_min,
        brand,
        type,
        year,
        engine_size,
        isItDiesel,
        licence_plate,
    } = this.state;
    const data = { 
        avarage_consuming_max,
        avarage_consuming_min,
        brand,
        type,
        year,
        engine_size,
        isItDiesel,
        licence_plate,
        id: this.props.cars.length,
    }
    console.log(this.state.avarage_consuming_max)
   this.props.postNewCar(this.props.cars.length, data);
  }

  renderWorkerForm() {

  }

  addNewCar() {
    console.log('u pressed me')
  }

  render() {    
    console.log(this.props.newPage, 'new in render')
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
              {this.props.newPage === 'car'? this.renderCarsFrom(): this.renderCarsFrom() /*TODO*/} 
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
});

export function mapDispatchToProps(dispatch) {
  return {
    postNewCar: (id, data) => dispatch(postNewCar(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemPage);
