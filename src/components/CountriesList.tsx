import * as React from 'react';
import {gql} from 'apollo-boost';
import { useQuery} from "@apollo/react-hooks"
import { Link } from 'react-router-dom';

const GET_COUNTRIES_LIST = gql`
{
  countries {
    code
    name
  }
}`

interface ICountriesListProps {
}

const CountriesList: React.FC<ICountriesListProps> = (props) => {
  const {loading, error, data} = useQuery(GET_COUNTRIES_LIST)
  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  
  return (
    <>
      <p>CountriesList</p>
      {data.countries.map((country: {name: string, code: string})  => (
        <Link to={`/${country.code}`} key={country.name}>
          <p>{country.name}</p>
          <p>{country.code}</p>
        </Link>
      ))}
    </>
  );
};

export default CountriesList;
