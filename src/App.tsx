import React from "react";
import "./App.css";
import CountriesList from "./components/CountriesList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "./components/CountryDetail";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CountriesList />} />
            <Route path=":code" element={<CountryDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
