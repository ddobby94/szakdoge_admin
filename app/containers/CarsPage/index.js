/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError, allCars } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import messages from './messages';
import { loadCars } from '../App/actions';

const divLineStyle = {
  "borderBottomWidth": "10px",
  "borderColor": "black",
  "display": "flex",
  "flexDirecton": "row",
  "justifyContent": "space-around",
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
  borderRadius: 7,
  backgroundColor: 'rgba(255,20,20,0.3)',
}

class CarsPage extends React.PureComponent { 

  componentDidMount() {
    this.props.loadCars();
    console.log(this.props.cars);
  }

  renderAllUsers() {
    const { cars } = this.props;
    console.log(cars, 'cars IN MAP')

    return cars.map( val => {
      return(
        <Link to={'selectedCar?id=' + val.id}>
          <div
            key={val.id}
            style={divLineStyle}
            onClick={() => { console.log(val.id, 'CLICKED')}}
          >
            <H2>
              {val.brand + ' ' + val.type}
            </H2>
            <H2>
              {val.licence_plate}
            </H2>
            <H2>
              {val.year}
            </H2>
          </div>
        </Link>
      );
    })
  }

  renderTableHeader() {
    return(
      <div
        style={divLineStyle}
      >
        <H1 >
          KOCSI
        </H1>
        <H1>
          RENDSZÁM
        </H1>
        <H1 >
          ÉVJÁRAT
        </H1>
      </div>
    );
  }

  renderAddCarsButton() {
    return(
      <div
        style={newCarButtonContainerStyle}
      >
        <div style={addNewCarButton} onClick={() => this.addNewCar()}>
          <Link to='new?new=car' >
            <H2> ÚJ AUTÓ HOZZÁADÁSA</H2>
          </Link>
        </div>
      </div>
    );
  }

  addNewCar() {
    console.log('u pressed me')
  }

  render() {
    const { loading, error, cars } = this.props;
    console.log(error, 'error in render')
    if (!loading && cars) {
      console.log(this.props.cars, 'workers in render')
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
              {this.renderAddCarsButton()}
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

CarsPage.propTypes = {
  loading: React.PropTypes.bool,
  cars: React.PropTypes.array,
  loadCars: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  cars: allCars(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadCars: () => dispatch(loadCars()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
