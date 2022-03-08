import React, {useRef, useState} from "react";
import Select from "react-select";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_CONTINENTS = gql`
  query {
    continents {
      name
      code
    }
  }
`;

interface IFilterProps {
    handleFilter: (value: any) => void,
    filterValue: {value: string, label: string}
}

const Filter: React.FC<IFilterProps> = ({handleFilter, filterValue}) => {
  const { loading, error, data } = useQuery(GET_CONTINENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const defaultObject = [{value: "all", label: "All countries"}]

  const continents = defaultObject.concat(data.continents.map((continent: { name: string, code: string }) => {
    return {value: continent.code, label: continent.name};
  }));

  const test = { label: "Antarctica",
  value: "AN"}

  return <Select onChange={handleFilter} value={filterValue} options={continents} />;
};

export default Filter;
