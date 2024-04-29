'use client';

import { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";

// Define an interface representing the structure of a game object
interface Game {
  username: string;
  gamedesc: string;
  images: string[];
  tags: string[];
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]); // Specify the type as Game[]

  useEffect(() => {
    async function fetchGames() {
      try {
        const db = getFirestore();
        const gamesCollectionRef = collection(db, "games");
        const gamesQuery = query(gamesCollectionRef);
        const snapshot = await getDocs(gamesQuery);

        const gamesData: Game[] = []; // Specify the type as Game[]
        snapshot.forEach((doc) => {
          gamesData.push(doc.data() as Game);
        });

        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    fetchGames();
  }, []);

  return (
<div>
  <h1 className="greeting ml-10 flex justify-center">Other games played</h1>
  {games.map((game, index) => (
    <div className="game-section flex" key={index}>

      <div className="game-sec-img">  {game.images && game.images.length > 0 && (
        <img src={game.images[0]} alt={`First Image`} />
      )}</div>   
      <div className="game-section-desc ml-5">
      <Link href={`/games/${game.username}`}>

            <h1 className="game-name">{game.username}</h1>
</Link>
    
      <p className="game-story">{game.gamedesc}</p>


      {game.tags && game.tags.length > 0 && (
          <div className="tags">
            {game.tags.map((tag, tagIndex) => (
              <span key={tagIndex}   style={{ backgroundColor: getRandomColor() }} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
</div>

  );
}
