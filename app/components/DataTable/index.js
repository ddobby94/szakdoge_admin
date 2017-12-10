import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { browserHistory } from 'react-router';

class DataTable extends React.Component { 
  constructor(props) {
    super(props);
    const data =  props.data
    this.state = {
        mainHeaderName: props.mainHeaderName || 'TÁBLÁZAT',
        data: data,
        location: props.location.pathname,
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('---------------------------------------')
    console.log('TABLE GOT newProps:', newProps);
    console.log('---------------------------------------')
    if (newProps.data) {
      this.setState({ data: newProps.data })
    }
  }

  tableColumns() {
    let { mainHeaderName, location } = this.state;
    if (location[0] !== '/') {
      location = '/' + location;
    }
    let columns;
    if (location === '/workers') {
      columns = [
        {
          Header: 'Név',
          accessor: 'name',
        },
        {
          Header: 'Jog',
          accessor: 'role',
        },
        {
          Header: 'Email cím',
          accessor: 'email',
        },
        {
          Header: 'Telefon szám',
          accessor: 'phoneNumber',
        },
      ]
    } else if (location === '/cars') {  
      columns = [
        {
          Header: 'Márka',
          accessor: 'brand',
        },
        {
          Header: 'Típus',
          accessor: 'type',
        },
        {
          Header: 'Rendszám',
          accessor: 'licence_plate',
        },
        {
          Header: 'Évjárat',
          accessor: 'year',
          /*Cell: row => (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#dadada',
                borderRadius: '2px'
              }}
            >
              <input
                type='text'
                value={row.value}
              />
            </div>
          ) */
        },
      ]
    } else if (location === '/selectedCar' || location === '/selectedWorker') {
      columns = [
        {
          Header: 'Dátum',
          accessor: 'date',
        },
        {
          Header: 'Honnan',
          accessor: 'from',
        },
        {
          Header: 'Indulási név',
          accessor: 'from_name',
        },
        {
          Header: 'Hova',
          accessor: 'to',
        },
        {
          Header: 'Érkezési név',
          accessor: 'to_name',
        },
        {
          Header: 'Típus',
          accessor: 'type',
        },
      ]
    }
    return [{
      Header: mainHeaderName,
      columns,
    }];
  }

  getPath(index) {
    const { location } = this.state;
    let toUrl;
    switch (location) {
      case '/workers':
        toUrl = 'selectedWorker?id=' + index;
        break;
      case '/cars':
        toUrl = 'selectedCar?id=' + index;
        break;
      case '/selectedWorker':
       // toUrl = 'selectedWorker?id=' + index;
        break;
      case '/selectedWorker':
       // toUrl = 'selectedWorker?id=' + index;
        break;
      default: 
        break;
    }
    return toUrl;
  }

  getSubComponent(row) {
    if (!this.props.showDropDown) {
     return () => null;
    } else {
      return () => {(
        <div>
        FUCK
      </div>
      )}
    }
  }

  render() {
    console.log('This.props.data, ', this.props.data);
    return (
      <div>
        <ReactTable
          data={this.props.data}
          columns={this.tableColumns()}
          filterable
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log(rowInfo.index)
                const toUrl = this.getPath(rowInfo.index);
                if (toUrl) {
                  browserHistory.push(toUrl);
                } else {
                  handleOriginal()
                }
              }
            }
          }}
          SubComponent={this.getSubComponent()}
        />
      </div>
    );
  }
}

export default DataTable;


/*
const columns = [{
  Header: () => <span><i className='fa-tasks' /> Progress</span>,
  accessor: 'progress',
  Cell: row => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#dadada',
        borderRadius: '2px'
      }}
    >
      <div
        style={{
          width: `${row.value}%`,
          height: '100%',
          backgroundColor: row.value > 66 ? '#85cc00'
            : row.value > 33 ? '#ffbf00'
            : '#ff2e00',
          borderRadius: '2px',
          transition: 'all .2s ease-out'
        }}
      />
    </div>
  )
}]
*/
