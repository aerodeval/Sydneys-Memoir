import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { image } from "@nextui-org/react";

export function CarouselDemo() {
  const carouselDesc = [
    { index:1,
      title: "Resident Evil 2",
      details: "A normal game",
      image:"https://firebasestorage.googleapis.com/v0/b/game-memoir.appspot.com/o/Death%20Stranding%2Fds1.jpg?alt=media&token=d0b76090-eb61-4807-88ab-86ad6deb5c4a"
,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor."
    },
    { index:2,
      title: "Resident Evil 32",
      details: "A normal game",
      image:"https://firebasestorage.googleapis.com/v0/b/game-memoir.appspot.com/o/Death%20Stranding%2Fds1.jpg?alt=media&token=d0b76090-eb61-4807-88ab-86ad6deb5c4a"
      ,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor."
    },
    { index:3,
      title: "Resident Evil 24",
      details: "A normal game",
      image:"https://firebasestorage.googleapis.com/v0/b/game-memoir.appspot.com/o/Death%20Stranding%2Fds1.jpg?alt=media&token=d0b76090-eb61-4807-88ab-86ad6deb5c4a"
      ,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor."
    },
    { index:4,
      title: "Resident Evil 25",
      details: "A normal game",
      image:"https://firebasestorage.googleapis.com/v0/b/game-memoir.appspot.com/o/Death%20Stranding%2Fds1.jpg?alt=media&token=d0b76090-eb61-4807-88ab-86ad6deb5c4a"
      ,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor."
    },
    { index:5,
      title: "Resident Evil 26",
      details: "A normal game",
      image:"https://firebasestorage.googleapis.com/v0/b/game-memoir.appspot.com/o/Death%20Stranding%2Fds1.jpg?alt=media&token=d0b76090-eb61-4807-88ab-86ad6deb5c4a"
      ,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor."
    }
    // Add more carousel items if needed
  ];

  return (
    <Carousel className=" crousel w-full max-w-xl ">
      <CarouselContent >
        {Array.from({ length: 5 }).map(( _,index) => (
          
          <CarouselItem key={index}>
           <div className="glass carousel-shadow backdrop-blur-lg bg-background/70">
<img className="c-img" src={carouselDesc[index].image}></img>
           <div className="p-10">
              <span className="text-4xl font-semibold">{carouselDesc[index].title}</span>
              <p className="text-2xl font-semibold">{carouselDesc[index].details }</p>
              <p className="text-1xl font-semibold">{carouselDesc[index].description }</p>
              </div>
</div>
          
          </CarouselItem>

          
        ))}

        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
