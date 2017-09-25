import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { browserHistory } from 'react-router';

const consoleLogEverything = (props) => {
  console.log('props.headernames : ', props.headerNames)
  console.log('columnNumbers: ', props.columnNumbers )
  console.log('data: ', props.data )
}

class DataTable extends React.Component { 
  constructor(props) {
    super(props);
    let numberOfColumns =  props.columnNumbers || Object.keys(props.data[0]).length;
    let headerNames = props.headerNames || [];
    if (headerNames.length > numberOfColumns) {
      consoleLogEverything(props);
      headerNames = headerNames.slice(0, numberOfColumns)
    } else if (headerNames.length < numberOfColumns) {
      consoleLogEverything(props);
      while (headerNames.length !== numberOfColumns) {
        let time = setTimeout(function(){}, 10);
        headerNames.push('N/A');
      }
    }
    console.log(props.data,' DATAAA')
    this.state = {
        numberOfColumns,
        headerNames,
        mainHeaderName: props.mainHeaderName || 'TÁBLÁZAT',
        data: props.data,
        location: props.location.pathname,
    };
  }
 
  makeData() {
    return [
      {
        firstName: "judge",
        lastName: "babies",
        age: 16
      }
    ];
  }

  tableColumns() {
    const { mainHeaderName, headerNames, location } = this.state;
    console.log(location);

    let columns;
    if (location === '/') {
      columns = [
        {
          Header: 'Név',
          accessor: 'name',
        },
        {
          Header: 'Pozíció',
          accessor: 'position',
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
                onChange={()=> {console.log('somthing' ,row)}}
              />
            </div>
          ) */
        },
      ]
    } else if (location === '/selectedCar') {
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
          Header: 'Hova',
          accessor: 'to',
        },
        {
          Header: 'Évjárat',
          accessor: 'year',
        },
      ]
    } else if (location === '/selectedWorker') {

    }

    console.log('COLUMNS : ', columns)
    return [{
      Header: mainHeaderName,
      columns,
    }];
  }

  getPath(index) {
    const { location } = this.state;
    let toUrl;
    switch (location) {
      case '/':
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

  render() {
    return (
      <div>
        <ReactTable
          data={this.state.data}
          columns={this.tableColumns()}
          filterable
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                const toUrl = this.getPath(rowInfo.index);
                console.log(rowInfo)
                if (toUrl) {
                  browserHistory.push(toUrl);
                } else {
                  handleOriginal()
                }
              }
            }
          }}
          SubComponent={(row) => {
            console.log(row,'_------___--_____--____---____---____----___----___')
            let fuck = 'engine size: ' + this.state.data[row.index].engine_size
            console.log(fuck)
           /* return (
              <div>
                {fuck}
              </div>
            ) */
          }}
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