import React from "react";
import { useQuery, gql } from "@apollo/client";

function Body() {
  const { loading, data } = useQuery(
    gql`
      query GetPlayerList {
        players {
          id
          first_name
          second_name
        }
      }
    `,
    { variables: { ids: [] } }
  );

  console.log(`LOADING: ${loading}`);
  console.log("DATA", data);
  return <div>IM A BODY</div>;
}

export default Body;
