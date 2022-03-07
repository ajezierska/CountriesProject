import React, {useRef} from "react";
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
    handleFilter: (value: any) => void
}

const Filter: React.FC<IFilterProps> = ({handleFilter}) => {
  const { loading, error, data } = useQuery(GET_CONTINENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const continents = data.continents.map((continent: { name: string, code: string }) => {
    return {value: continent.code, label: continent.name};
  });

  return <Select onChange={handleFilter} options={continents} />;
};

export default Filter;
