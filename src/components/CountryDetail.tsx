import * as React from "react";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

const GET_COUNTRY_DETAIL = gql`
  query ($code: ID!) {
    country(code: $code) {
      name
      code
      emoji
      languages {
        name
      }
    }
  }
`;

interface Country {
    country: {
        code: string;
        name: string;
        emoji: string;
        languages: Language[];
    } 
}
interface Language {
    name: string
}

interface ICountryDetailProps {}

const CountryDetail: React.FC<ICountryDetailProps> = (props) => {
  const { code } = useParams();
  const { loading, error, data } = useQuery<Country>(GET_COUNTRY_DETAIL, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <p>Country Detail</p>
      <p>{data?.country.code}</p>
      <p>{data?.country.name}</p>
      <i>{data?.country.emoji}</i>
      {data?.country.languages.map((language: { name: string }) => (
        <div key={language.name}>
          <p>{language.name}</p>
        </div>
      ))}
    </>
  );
};

export default CountryDetail;
