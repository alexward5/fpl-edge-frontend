import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";

const apiUrl =
    window.location.hostname === "localhost"
        ? "http://localhost:4000/graphql"
        : "https://api.versostat.com/graphql";

const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
    connectToDevTools: import.meta.env.DEV,
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ApolloProvider>
    </StrictMode>,
);
