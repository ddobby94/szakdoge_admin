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
import { selectLoading, selectCarDetails, selectError, selectAllRoutes } from './selectors';
import { setData } from '../../utils/RoutesData'
import s from '../Styles';
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
      carDetails: null,
      showBasicDatas: true,
      showPreviousRoutes: true,
      allRoutes: [],
    };
   
   // this.carSubmit = this.carSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSelectedCar(this.state.carId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      carDetails: this.props.selectedCarDetails,
      allRoutes: this.props.allRoutes,
    });
  }

  getBasicDatas() {
    const { selectedCarDetails } = this.props;

    return (
      <div style={basicDataContainer}>
        <div style={s.lineComponent}>
          <H2>AUTÓ:</H2>
          <h3>{selectedCarDetails.brand + ' ' + selectedCarDetails.type}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>ID:</H2>
          <h3>{selectedCarDetails.id}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>SAJÁT TÖMEG (kg):</H2>
          <h3>{selectedCarDetails.own_weight_kg}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>ÉVJÁRAT:</H2>
          <h3>{selectedCarDetails.year}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>ÜZEMANYAG TÍPUSA:</H2>
          <h3>{selectedCarDetails.is_it_diesel? 'DÍZEL' : 'BENZIN'}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>SZÍN:</H2>
          <h3>{selectedCarDetails.color}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>TELJESÍTMÉNY (lóerő):</H2>
          <h3>{selectedCarDetails.performance_hp}</h3>
        </div>
        <div style={s.lineComponent}>
          <H2>RENDSZÁM:</H2>
          <h3>{selectedCarDetails.licence_plate}</h3>
        </div>
      </div>
    );
  }

  getRoutesTable(){
    const { location, allRoutes } = this.props;
    if (allRoutes) {
      const data = setData(allRoutes)
      console.log(data)
      return (
        <DataTable data={data} mainHeaderName={'KORÁBBI UTAZÁSOK'} location={location} showDropDown={false} />
      );
    }
  }

  render() {
    const { selectedCarDetails, loading, error } = this.props;
    const { carDetails, showBasicDatas, showPreviousRoutes, allRoutes } = this.state;
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCar);
