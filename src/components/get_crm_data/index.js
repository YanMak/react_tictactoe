export const getERPdataForCharts10062021 = async() => {
  const urlERP = "http://89.223.93.142:3001/lists";

  let response = await fetch(urlERP);
  let incomingData = [];

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
      incomingData = await response.json();
      //alert(JSON.stringify(incomingData));
      return incomingData;
      //alert(incomingData);
      //let prep = await getERPdataForCharts(incomingData);
      //document.getElementById("expressQueryData1").innerHTML = JSON.stringify(prep);
      //document.getElementById("expressQueryData1").innerHTML = JSON.stringify(incomingData[1]);
      //document.getElementById("expressQueryData2").innerHTML = '*************************************';
      //document.getElementById("expressQueryData3").innerHTML = JSON.stringify(incomingData[0].series[0].data);
      
  } else {
      alert("Ошибка HTTP: " + response.status);
  }
} 


const UsersList = ({ list }) => {
  
  return (
  <ul>
    { list.map(name => (<li>{name}</li>)) }
  </ul>
  );
} 

export default getERPdataForCharts10062021;
