"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./PokemonDetail.module.css";

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

const PokemonDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pokemons/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  return (
    <div className={styles.pokemonDetail}>
      <h1>{pokemon.korean_name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
      <div className={styles.infoRow}>
        <div>키: {pokemon.height / 10} m</div>
        <div>몸무게: {pokemon.weight / 10} kg</div>
      </div>
      <div className={styles.detailSection}>
        <h2>타입</h2>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.type.name}>
              <span className={`${styles.tag} ${styles.type}`}>
                {type.type.korean_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.detailSection}>
        <h2>특성</h2>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>
              <span className={`${styles.tag} ${styles.ability}`}>
                {ability.ability.korean_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.detailSection}>
        <h2>기술</h2>
        <ul>
          {pokemon.moves.map((move) => (
            <li key={move.move.name}>
              <span className={`${styles.tag} ${styles.move}`}>
                {move.move.korean_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
