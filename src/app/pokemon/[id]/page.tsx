import React from "react";
import dynamic from "next/dynamic";

const PokemonDetail = dynamic(() => import("../../components/PokemonDetail"), {
  ssr: false,
});

const PokemonDetailPage: React.FC = () => {
  return (
    <div>
      <PokemonDetail />
    </div>
  );
};

export default PokemonDetailPage;
