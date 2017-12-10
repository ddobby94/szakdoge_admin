import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HeaderLink from 'components/Header/HeaderLink';
import { makeSelectLoading, makeSelectError, allCars } from '../App/selectors';
import H2 from 'components/H2';
import DataTable from 'components/DataTable'
import CenteredSection from './CenteredSection';
// import { loadCars } from '../App/actions';
import s from '../Styles'

class CarsPage extends React.PureComponent { 

  componentDidMount() {
    // this.props.loadCars();
  }

  renderAddCarsButton() {
    return(
      <div style={s.newCarButtonContainerStyle}>
        <HeaderLink to='new?new=car' >
          <p id='newWorker'> ÚJ AUTÓ HOZZÁADÁSA</p>
        </HeaderLink>
      </div>
    );
  }

  render() {
    const { loading, error, cars, location } = this.props;
    console.log('cars,',cars)
    if (!loading && cars) {
      return (
        <div>
          <Helmet
            title="Home Page"
            meta={[
              { name: 'description', content: 'A React.js Boilerplate application homepage' },
            ]}
          />
          <div>
            {this.renderAddCarsButton()}
            <DataTable data={cars} mainHeaderName={'AUTÓK'} location={location} />
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
            LOADING...
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
  // loadCars: React.PropTypes.func,
};

const mapStateToProps = (state) => createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  cars: allCars(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // loadCars: () => dispatch(loadCars()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
