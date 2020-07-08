import React, { useState, useEffect } from 'react';
import Appbar from './Components/Appbar';
import Card from './Components/Card';
import { Country } from './Components/Country';
import { Chart } from './Components/Chart';
import {LoadingIndicator} from './LoadingIndicator'


function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {

    async function getData() {

      if (country === "global") {
        const url = 'https://api.thevirustracker.com/free-api?global=stats';
        const response = await fetch(url);
        const { results } = await response.json();
        delete results[0].source;
        delete results[0].total_unresolved;

        setData(results[0]);
      }

      else if (country !== '') {
        const url = `https://api.thevirustracker.com/free-api?countryTotal=${country}`;
        const response = await fetch(url);
        const { countrydata } = await response.json();
        delete countrydata[0].info;
        delete countrydata[0].total_unresolved;
        //console.log(countrydata[0])
        setData(countrydata[0]);
      }

    }

    getData();

  }, [country]);

  const handleCountryChange = async (country) => {

    setCountry(country);
    //console.log(country)
  }


  return (
    <>
      <Appbar />
      <LoadingIndicator/>
      <Country handleCountryChange={handleCountryChange} />
      <Card data={data} country={country} />
      <Chart data={data} country={country} />
    </>
  );
}

export default App;
