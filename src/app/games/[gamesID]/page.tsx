'use client';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Wrap, WrapItem } from '@chakra-ui/react'
interface GameData {
  username: string;
  gamedesc: string;
  images: string[]; // Array of image URLs
  // Add other properties as needed
}



function GameDetails({ params }:any) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const formattedGameID = params.gamesID.replace(/%20/g, ' ');

  useEffect(() => {
    async function fetchGameData() {
      try {
        const db = getFirestore();
        const gameDocRef = doc(db, 'games',formattedGameID);
        console.log(gameDocRef);
        // Assuming 'games' is your collection name
        const gameDocSnapshot = await getDoc(gameDocRef);

        if (gameDocSnapshot.exists()) {
          setGameData(gameDocSnapshot.data() as GameData);
        } else {
          console.log('Game not found');
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    }

    fetchGameData();
  }, [params.gamesID]); // Fetch data whenever the game ID changes

  return (
    <div>
      {gameData ? (
        <div className='flex gamedata-page'>
          <div className='w-1/2 ml-10 mr-8 disp-game'>
          <h1 className='game-username'>{gameData.username}</h1>
          <p className='game-description-full'>{gameData.gamedesc}</p>
          </div>
          <div className='image-gallery mt-10 mr-5'>
          <Wrap px="1rem" spacing={4} justify="center">
            {gameData.images.map((imageUrl, index) => (
              <WrapItem
              key={index}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}>
              <img height={600} width={400} key={index} src={imageUrl} alt={`Image ${index}`} />
              </WrapItem>
            ))}
            </Wrap>
          </div>
          {/* Render other game details based on gameData */}
        </div>
      ) : (
        <p className='flex justify-center'>pls go back and come again sorry</p>
      )}
    </div>
  );
}

export default GameDetails;
