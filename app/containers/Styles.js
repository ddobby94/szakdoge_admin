import Metrics from './Metrics';
import Colors from './Colors';

const styles = {
  // details page styles
  lineComponent: {
    display: 'flex',
    flexDirecton: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  basicDatasWrapper: {
    width: Metrics.windowWidth / 2.5,
  },
  basicDatasWrapperCars: {
    display: 'flex',
    flexDirecton: 'column',
    justifyContent: 'space-around',
  },
  clickAbleHeaderLine: {
    backgroundColor: Colors.medium,
    widht: '100%',
    height: '50px',
    paddingBottom: '60px',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  basicDatasContainer: {
    margin: Metrics.baseMargin,
  },
  newCarButtonContainerStyle: {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'flex-end',
  },
  divLineStyle: {
    borderBottomWidth: '10px',
    borderColor: 'black',
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'space-around',
  },
  divLineStyleColumn: {
    borderBottomWidth: '10px',
    borderColor: 'black',
    display: 'flex',
    flexDirecton: 'column',
    justifyContent: 'space-around',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.steel,
    backgroundColor: Colors.snow,
    width: Metrics.windowWidth / 2,
    fontSize: 25,
    alignSelf: 'center',
  },
  licenceInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.steel,
    backgroundColor: Colors.snow,
    fontSize: 25,
    width: Metrics.doubleSection,
    height: Metrics.doubleBaseMargin,
    marginTop: '20px',
  },
  rowFlexSpaceAround: {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    fontSize: 20,
    height: Metrics.section,
    width: Metrics.windowWidth / 3,
    marginTop: Metrics.doubleBaseMargin,
    paddingTop: Metrics.smallMargin,
    borderRadius: 5,
    alignSelf: 'center',
    alignText: 'center',
    backgroundColor: Colors.medium,
    color: Colors.snow,
  },
  submitButtonSmall: {
    fontSize: 20,
    height: Metrics.section,
    width: Metrics.windowWidth / 4,
    marginTop: Metrics.doubleBaseMargin,
    paddingTop: Metrics.smallMargin,
    borderRadius: 5,
    alignSelf: 'center',
    alignText: 'center',
    backgroundColor: Colors.medium,
    color: Colors.snow,
  },
  datePickerComponents: {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '20px',
  },
  errorMsg: {
    fontSize: 20,
    height: '70px',
    marginTop: '20px',
    paddingTop: '20px',
    borderRadius: 5,
    color: 'rgb(150, 10, 10)',
  },
  addNewItemStyle: {
    margin: 30,
  },


  // header
  avatar: {
    height: 40,
    alignSelf: 'flex-end',
  },
  headerContainer: {
    backgroundColor: Colors.coal,
  },
  menuTab: {
    fontWeight: 'bold',
    cursor: 'pointer',
    // backgroundColor: Colors.base,
    // height: Metrics.baseMargin * 3,
    width: 200,
    height: 60,
    alignItems: 'center',
  },
  name: {
    color: Colors.snow,
    marginTop: 20,
    // fontSize: 16,
    // marginRight: 20,
  },
  headerMenuText: {
    color: Colors.snow,
    
  },
  activeMenuText: {
    // position: 'absolute',
    marginTop: 20,
    color: Colors.medium,
  },
  profileInfo: {
    width: 300,
    height: 60,
    marginTop: 20,
  },
  activeMenuTab: {
    width: 250,
    height: 60,
    border: 'solid #37a1b8',
    borderWidth: '0px 0px 5px 0px',
    borderBottomWidth: Metrics.smallMargin / 2,
    borderColor: Colors.medium,
  },
  container: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    display: 'flex',
    height: Metrics.baseMargin,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dropDownStyle: {
    position: 'absolute',
    height: 120,
    width: 300,
    backgroundColor: Colors.coal,
    marginTop: Metrics.section * 1.5,
    marginLeft: Metrics.smallMargin,
    borderRadius: Metrics.smallMargin / 2,
    borderWidth: 5,
    borderColor: 'rgb(158, 212, 236)',
  },
  line: {
    width: 300,
    backgroundColor: 'rgba(120,120,120,0.7)',
    height: 1,
    marginBottom: -5,
  },

  dataTableTitleContainer: {
    margin: 20,
  },
};

export default styles;