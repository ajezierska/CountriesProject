import * as React from "react";
import { gql } from "apollo-boost";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Header from "./Header";
import { Country } from "../models/countries.model";

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

const CountryDetail: React.FC = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery<Country>(GET_COUNTRY_DETAIL, {
    variables: { code },
  });

  return (
    <>
      <Header title="Country Details" />
      <div className="container mx-auto max-w-2xl">
        {loading && <p className="pl-2 text-slate-500 mb-3">Loading...</p>}
        {error && <p className="pl-2 text-slate-500 mb-3">Error...</p>}
        {!loading && !error && (
          <>
            <div className="flex flex-row">
              <p className="mr-2 text-xl text-cyan-600">{data?.country.name}</p>
              <i className="ml-3">{data?.country.emoji}</i>
            </div>
            <p>
              <span className="text-slate-500 text-sm">code: </span>
              {data?.country.code}
            </p>
            <div className="flex flex-row mb-3">
              <span className="text-slate-500 text-sm mr-2">languages: </span>
              {data?.country.languages.map((language: { name: string }) => (
                <div key={language.name} className="mr-2">
                  {language.name},
                </div>
              ))}
            </div>
          </>
        )}
        <Link
          to="/"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          BACK
        </Link>
      </div>
    </>
  );
};

export default CountryDetail;
