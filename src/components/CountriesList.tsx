import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const GET_COUNTRIES_LIST = gql`
  {
    countries {
      code
      name
    }
  }
`;

const GET_LIST_COUNTRIES_FROM_CONTINENT = gql`
  query ($code: ID!) {
    continent(code: $code) {
      name
      countries {
        name
        code
      }
    }
  }
`;

interface ICountriesListProps {}

const CountriesList: React.FC<ICountriesListProps> = (props) => {
  const [value, setValue] = useState("");
  const {
    loading: countriesLoading,
    error: countriesError,
    data: countriesData,
  } = useQuery(GET_COUNTRIES_LIST);

  const {
    loading: filterLoading,
    error: filterError,
    data: filterData,
  } = useQuery(GET_LIST_COUNTRIES_FROM_CONTINENT, {
    variables: { code: value },
  });

  const [countriesList, setCountriesList] = useState(countriesData);

  useEffect(() => {
    if (countriesData) {
      setCountriesList(countriesData);
    }
  }, [countriesData]);

  useEffect(() => {
    if (!value) return;
    if (filterData) {
      setCountriesList(filterData.continent);
    }
  }, [filterData]);

  if (countriesLoading || filterLoading) return <p>Loading...</p>;
  if (countriesError || filterError) return <p>Error...</p>;

  const handleFilter = (e: any) => {
    setValue(e.value);
  };

  return (
    <>
      <p>CountriesList</p>
      <Filter handleFilter={handleFilter} />
      {countriesList &&
        countriesList.countries.map(
          (country: { name: string; code: string }) => (
            <Link to={`/${country.code}`} key={country.name}>
              <p>{country.name}</p>
              <p>{country.code}</p>
            </Link>
          )
        )}
    </>
  );
};

export default CountriesList;
