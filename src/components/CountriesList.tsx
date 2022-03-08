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
  const [filter, setfilter] = useState<{ value: string; label: string }>({
    value: "all",
    label: "Filter by continents...",
  });
  const [search, setSearch] = useState<string>("");
  const [countriesList, setCountriesList] = useState([]);
  const inputEl = React.useRef<HTMLInputElement | null>(null);

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
    variables: { code: filter.value },
  });


  useEffect(() => {
    if (filter.value === "all" && countriesData) {
      setCountriesList(countriesData.countries);
    } else if (filterData && filterData.continent) {
      setCountriesList(filterData.continent.countries);
    }
  }, [filterData, countriesData, filter, search]);

  useEffect(() => {
    if (search) {
      const newfilterData =
        !filterData || filterData.continent === null
          ? []
          : filterData.continent.countries;
      const countries =
        filter.value === "all" ? countriesData.countries : newfilterData;
      const newCountriesList = countries.filter((country: any) => {
        return Object.values(country.name)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setCountriesList(newCountriesList);
    }
  }, [search, filter, filterData, countriesData]);

  if (countriesLoading || filterLoading) return <p>Loading...</p>;
  if (countriesError || filterError) return <p>Error...</p>;

  const handleFilter = (e: any) => {
    setfilter(e);
  };

  const handleSearchTerm = () => {
    setSearch((inputEl.current as HTMLInputElement).value);
  };

  return (
    <>
      <p>CountriesList</p>
      <Filter handleFilter={handleFilter} filterValue={filter} />
      <input
        ref={inputEl}
        type="text"
        placeholder="Search Contacts"
        value={search}
        onChange={handleSearchTerm}
      />
      {countriesList &&
        countriesList.map((country: { name: string; code: string }) => (
          <Link to={`/${country.code}`} key={country.name}>
            <p>{country.name}</p>
            <p>{country.code}</p>
          </Link>
        ))}
    </>
  );
};

export default CountriesList;
