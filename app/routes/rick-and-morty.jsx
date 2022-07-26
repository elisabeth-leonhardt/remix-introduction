import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import React from "react";

const ENDPOINT = "https://rickandmortyapi.com/api/character";

export const loader = async ({ request }) => {
  return null;
};

function RickAndMorty() {
  const data = useLoaderData();

  return (
    <div>
      <h1 className='text-2xl text-center'>
        Rick and Morty Page 1 fetched with REST
      </h1>
      <section className='grid grid-cols-5 gap-8 m-12'>
        {data?.results?.map((character) => (
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
    </div>
  );
}

export default RickAndMorty;
