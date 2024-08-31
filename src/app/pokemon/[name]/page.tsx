"use client";
import { useParams } from "next/navigation";
import React from "react";

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export default function PokemonName() {
  const params = useParams<{ name: string }>();
  const [pokemonDetail, setPokemonDetail] = React.useState<PokemonDetail | null>(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        const data = await res.json();
        setPokemonDetail(data as PokemonDetail);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [params.name]);

  if (!pokemonDetail) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{pokemonDetail.name}</h1>
      <img
        src={pokemonDetail.sprites.front_default}
        alt={pokemonDetail.name}
        style={styles.image}
      />
      <div style={styles.detailsContainer}>
        <h2 style={styles.subtitle}>Details</h2>
        <p style={styles.text}>
          <strong>Height:</strong> {pokemonDetail.height} decimetres
        </p>
        <p style={styles.text}>
          <strong>Weight:</strong> {pokemonDetail.weight} hectograms
        </p>
        <div>
          <h3 style={styles.subtitle}>Abilities</h3>
          <ul style={styles.list}>
            {pokemonDetail.abilities.map((a, index) => (
              <li key={index} style={styles.listItem}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={styles.subtitle}>Types</h3>
          <ul style={styles.list}>
            {pokemonDetail.types.map((t, index) => (
              <li key={index} style={styles.listItem}>{t.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
    textTransform: 'capitalize' as const,
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover' as const,
    marginBottom: '20px',
  },
  detailsContainer: {
    textAlign: 'left' as const,
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none' as const,
    paddingLeft: '0',
    marginBottom: '20px',
  },
  listItem: {
    fontSize: '1rem',
    color: '#444',
    padding: '5px 0',
  },
};
