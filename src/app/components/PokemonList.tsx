"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./PokemonList.module.css";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <ul className={styles.pokemonList}>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className={styles.pokemonItem}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <div>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.korean_name}
                />
                <p>{pokemon.korean_name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
