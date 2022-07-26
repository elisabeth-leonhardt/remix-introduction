import { useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { client } from "../lib/graphql-client";

const GetCharacters = gql`
  {
    characters(page: 2) {
      results {
        name
        id
        image
        status
        location {
          name
        }
      }
    }
  }
`;

export const loader = async () => {
  return null;
};

export default function GraphqlTest() {
  const data = useLoaderData();
  return (
    <>
      <h1 className='text-2xl text-center'>
        Rick and Morty Page 2 fetched with Graphql
      </h1>
      <section className='grid grid-cols-5 gap-8 m-12'>
        {data?.characters?.results.map((character) => (
          <div
            key={character.id}
            className='shadow-lg rounded-lg overflow-hidden pb-4 text-center'
          >
            <img src={character.image} alt={character.name} />
            <p className='pt-4'>Name: {character.name}</p>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </section>
    </>
  );
}
