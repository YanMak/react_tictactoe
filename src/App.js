//import logo from './logo.svg';
import './App.css';
import UsersList from './components/users_list';

//crm api
import getERPdataForCharts10062021 from './components/get_crm_data';

//learning rureactjsorg (
import ShoppingList from './components/rureactjsorg_shopping_list';
import Game from './components/rureactjsorg_ticktacktoe';
// )

import { useState } from 'react';
// charts (
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const axios = require('axios');
// ) charts

let options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

const GetChartData = async (options) => {
  const response = await axios.get('http://89.223.93.142:3001/lists');
  //alert(response.data);//setState({ totalReactPackages: response.data.total })
  //const options = [];
  //alert(JSON.stringify(options.series[0].data));
  for (let i = 0 ; i<response.data.length; i++){
    options.series[0].data.push(i);      
  }
  alert('options.series[0].data: ' + options.series[0].data);
  //return options;
};

const App = () => {
  //const users = [];
  const [users, setUsers] = useState(['nadya', 'sveta']);
  const [name, setName] = useState('');
  const onClick = () => {
    //users.push('ghgfh');
    setUsers([
      ...users, 
      name
    ]);
    setName('');
  };

  //chart data
  let data = getERPdataForCharts10062021();//error: unexpected reserved word await. i.e. i cant use await here
  const [chartData, setChartData] = useState(data);
  //alert(chartData);
  //options = GetChartData();
  alert('options bfo GetChartData ' + options);
  GetChartData(options);
  alert('options aft GetChartData ' + options);
  //getERPdataForCharts10062021();
  alert(options);
  //alert(options.series[0].data);

  return (
  <div className="App">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      <button onClick={onClick}>add name</button>
      <input value={ name } onChange={ (e) => setName(e.target.value) } />
      
      <UsersList list={ users } />
      
      {/* learning rureactjsorg ( */}
      <ShoppingList name = {'hello world'} list ={ users }/>
      <Game />
      {/* learning rureactjsorg ) */}
  </div>
  );
} 

export default App;
