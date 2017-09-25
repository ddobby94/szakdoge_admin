import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataTable from 'components/DataTable'

import { loadSelectedCar } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { selectLoading, selectCarDetails, selectError } from './selectors';

const contentWidthPercentage = 60;
const contentMarginLeft = window.innerWidth * contentWidthPercentage / 300;
console.log(contentMarginLeft, 'FUCK', window, 'WINDOW')

const basicDataContainer ={
  width: contentWidthPercentage + '%',
  marginLeft: contentMarginLeft + 'px',
};

const lineComponent = {
  display: "flex",
  flexDirecton: "row",
  justifyContent: "space-between",
};

class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      carId: props.location.query.id,
      carDetails: null,
      showBasicDatas: true,
      showPreviousRoutes: true,
    };
   
   // this.carSubmit = this.carSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSelectedCar(this.state.carId);
  }

  componentWillReceiveProps(newProps) {
    console.log('fuck2', newProps)
    this.setState({
      carDetails: this.props.selectedCarDetails
    });
  }

  getBasicDatas() {
    const { selectedCarDetails } = this.props;

    return (
      <div style={basicDataContainer}>
        <div style={lineComponent}>
          <H2>AUTÓ:</H2>
          <h3>{selectedCarDetails.brand + ' ' + selectedCarDetails.type}</h3>
        </div>
        <div style={lineComponent}>
          <H2>ID:</H2>
          <h3>{selectedCarDetails.id}</h3>
        </div>
        <div style={lineComponent}>
          <H2>SAJÁT TÖMEG (kg):</H2>
          <h3>{selectedCarDetails.own_weight_kg}</h3>
        </div>
        <div style={lineComponent}>
          <H2>ÉVJÁRAT:</H2>
          <h3>{selectedCarDetails.year}</h3>
        </div>
        <div style={lineComponent}>
          <H2>ÜZEMANYAG TÍPUSA:</H2>
          <h3>{selectedCarDetails.is_it_diesel? 'DÍZEL' : 'BENZIN'}</h3>
        </div>
        <div style={lineComponent}>
          <H2>SZÍN:</H2>
          <h3>{selectedCarDetails.color}</h3>
        </div>
        <div style={lineComponent}>
          <H2>TELJESÍTMÉNY (lóerő):</H2>
          <h3>{selectedCarDetails.performance_hp}</h3>
        </div>
        <div style={lineComponent}>
          <H2>RENDSZÁM:</H2>
          <h3>{selectedCarDetails.licence_plate}</h3>
        </div>
      </div>
    );
  }

  getRoutesTable(){
    const { selectedCarDetails, location } = this.props;
    return (<div>TÁBLA!!</div>)
    return (
      <DataTable data={selectedCarDetails.previous_routes} mainHeaderName={'KORÁBBI UTAZÁSOK'} location={location} />
    );
  }

  render() {
    const { selectedCarDetails, loading, error } = this.props;
    const { carDetails, showBasicDatas, showPreviousRoutes } = this.state;
    console.log('fuck')
    if (!loading && selectedCarDetails) {
      console.log(this.props.cars, 'cars in render')
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
                style={{ backgroundColor: 'gray', widht: '100%', height: '30px' }}
                onClick={() => {this.setState({showBasicDatas: !showBasicDatas})}}
              >
              <h4>Autó adatai</h4>
              </div>
              {showBasicDatas && this.getBasicDatas()}
              <div 
                style={{ backgroundColor: 'gray', widht: '100%', height: '30px' }}
                onClick={() => {this.setState({showPreviousRoutes: !showPreviousRoutes})}}
              >
              <h4>Korábbi utazások</h4>
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
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSelectedCar: (id) => dispatch(loadSelectedCar(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
