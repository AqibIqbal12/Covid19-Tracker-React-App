import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getName } from 'country-list';
import Style from './Chart.module.css';


export const Chart = ({ data, country }) => {

  const url = 'https://api.thevirustracker.com/free-api?global=stats';
  const [globaldata, setGlobalData] = useState({});

  useEffect(() => {

    async function getGlobalData() {
      const response = await fetch(url);
      const { results } = await response.json();
      delete results[0].source;
      delete results[0].total_unresolved;
      //console.log(results[0])
      setGlobalData(results[0]);

    }

    getGlobalData();

  }, [])

  let chartData = {};


  if (Object.keys(data).length === 0) {

    chartData = {
      labels: Object.keys(globaldata),
      datasets: [{
        data: Object.values(globaldata),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0000FF', '#800080', '#808080', '#FFA500', '#000000'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0000FF', '#800080', '#808080', '#FFA500', '#000000']
      }]
    }

    return (
      <>
        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Graphical Representation Of Corona Virus Victims In The World</h2>
        <div className={Style.container}>
          <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

      </>
    );
  }
  else {
    chartData = {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0000FF', '#800080', '#808080', '#FFA500', '#000000'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0000FF', '#800080', '#808080', '#FFA500', '#000000']
      }]
    }

    return (
      <>
        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>
          {country === "global" ? "Graphical Representation Of Corona Virus Victims In The World" : "Graphical Representation Of Corona Virus Victims In " + getName(country)}
        </h2>
        <div className={Style.container}>
          <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

      </>
    );
  }
}

  //displayName: 'BarExample',

