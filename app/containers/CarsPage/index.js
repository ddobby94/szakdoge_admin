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
      <CenteredSection >
        <Link to='new?new=car' >
          <div style={s.submitButton}>ÚJ AUTÓ HOZZÁADÁSA</div>
        </Link>
      </CenteredSection>
    );
  }

  render() {
    const { loading, error, cars, location } = this.props;
    console.log('cars,',cars)
    if (!loading) {
      return (
        <div>
          <Helmet
            title="Home Page"
            meta={[
              { name: 'description', content: 'A React.js Boilerplate application homepage' },
            ]}
          />
          <div>
            <div style={s.dataTableTitleContainer}>
              <h3>AZ AUTÓK ADATAI: </h3>
              <p>Az egyes sorokra kattintva lehet megnézni az autók részeletes adatait. </p>
            </div>
            {cars && <DataTable data={cars} mainHeaderName={'AUTÓK'} location={location} />}
            {!cars && <H2>NINCS AUTÓ A RENDSZERBEN!</H2>}
            {this.renderAddCarsButton()}
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
