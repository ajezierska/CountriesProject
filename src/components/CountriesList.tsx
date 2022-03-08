import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Header from "./Header";

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

const CountriesList: React.FC = () => {
  const [filter, setfilter] = useState<{ value: string; label: string }>({
    value: "all",
    label: "Filter by continents...",
  });
  const [search, setSearch] = useState<string>("");
  const [countriesList, setCountriesList] = useState<[]>([]);
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

  const handleFilter = (e: any) => {
    setfilter(e);
  };

  const handleSearchTerm = () => {
    setSearch((inputEl.current as HTMLInputElement).value);
  };

  return (
    <>
      <Header title="Countries List" />
      <div className="container mx-auto max-w-2xl">
        <div className="flex flex-row justify-between mb-2">
          <Filter handleFilter={handleFilter} filterValue={filter} />
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Countries..."
            value={search}
            onChange={handleSearchTerm}
            className="ml-2 w-7/12 border-2 border-slate-300 border-solid rounded px-3 text-black focus:outline-none focus:border-sky-600 placeholder:text-black"
          />
        </div>
        {countriesError ||
          (filterError && <p className="pl-2 text-slate-500">Error...</p>)}
        {countriesList && countriesList.length ? (
          countriesList.map((country: { name: string; code: string }) => (
            <Link
              to={`/${country.code}`}
              key={country.name}
              className="flex flex-row"
            >
              <p className="mr-3 text-cyan-600">{country.name}</p>
              <p>{country.code}</p>
            </Link>
          ))
        ) : (
          <p className="pl-2 text-slate-500">
            {countriesLoading || filterLoading ? "Loading..." : "no results..."}
          </p>
        )}
      </div>
    </>
  );
};

export default CountriesList;
