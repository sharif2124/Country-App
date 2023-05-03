import React, { useState, useEffect } from "react";
import Countries from "./componeents/Countries";
import "./App.css";
const url = "https://restcountries.com/v3.1/all";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFilterCountries] = useState(countries);
  const featchData = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setIsLoading(false);
      setFilterCountries(data);
      setIsError(null);
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  };
  useEffect(() => {
    featchData(url);
  }, []);

  const handelRemoveCountry = (name) => {
    const filter = filtercountries.filter(
      (country) => country.name.common !== name
    );
    setFilterCountries(filter);
  };
  return (
    <>
      <h1>Country App</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && (
        <Countries
          countries={filtercountries}
          onRemoveCountry={handelRemoveCountry}
        />
      )}
    </>
  );
};

export default App;
