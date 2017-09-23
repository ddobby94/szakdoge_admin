import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadSelectedCar } from './actions';
import H1 from 'components/H1';
import H2 from 'components/H2';
import CenteredSection from '../HomePage/CenteredSection';
import { loadCars } from '../App/actions';
import { selectLoading, selectCarDetails, selectError } from './selectors';


class SelectedCar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleBasicDatas: true,
      visibleRoutes: true,
      carId: props.location.query.id,
      carDetails: null,
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

  render() {
    const { selectedCarDetails, loading, error } = this.props;
    const { carDetails } = this.state;
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
              <H2>
               {'Car: ' + selectedCarDetails.brand + ' ' + selectedCarDetails.type }
              </H2>
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
