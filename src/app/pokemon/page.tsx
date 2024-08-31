"use client";
import Link from "next/link";
import React from "react";

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

export default function Page() {
  const [pokemonDetails, setPokemonDetails] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data: PokemonList = await res.json();

        const promises = data.results.map((p: Pokemon) =>
          fetch(p.url).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setPokemonDetails(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokémon List</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {pokemonDetails.map((pokemon) => (
            <div key={pokemon.name} style={styles.card}>
              <Link href={`/pokemon/${pokemon.name}`}>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={styles.image}
                />
                <p style={styles.pokemonName}>{pokemon.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    paddingBottom: '20px',
  },
  card: {
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
    cursor: 'pointer' as const,
    transition: 'transform 0.2s',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover' as const,
    marginBottom: '10px',
  },
  pokemonName: {
    fontSize: '1.25rem',
    color: '#333',
    textTransform: 'capitalize' as const,
  },
  loadingText: {
    fontSize: '1.25rem',
    color: '#888',
  },
};
