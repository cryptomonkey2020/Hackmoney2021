import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

// const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

let subgraphUri
if(process.env.REACT_APP_NETWORK==='kovan') {
  subgraphUri = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan"
} else {
  subgraphUri = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2"
}

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      <App subgraphUri={subgraphUri} />
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
