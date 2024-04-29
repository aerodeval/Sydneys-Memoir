'use client';

import Image from "next/image";
import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
// useRouter
import { useRouter } from 'next/navigation'
import Link from "next/link";
import FirstPost from "./pages/posts/page";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import TopBar from "./ui/Navbar";
import { CarouselDemo } from "./ui/Carousel";

import { initializeApp } from "firebase/app";
import Games from "./games/page";
 

const firebaseConfig = {

};
const app = initializeApp(firebaseConfig);
export default function Home() {
  const router = useRouter()



  
  return (
<div className="bg-svg-background">
  <div className="main-content">

      <TopBar/>
      <h1 className="greeting flex justify-center text-center">Welcome to <br></br> Sydneys Memoir</h1>
            {/* <Suspense fallback= { <div><p>Loading weather...</p></div>}>
              <LazyPages></LazyPages>
            </Suspense>
<h1>hello</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan, velit non dictum molestie, velit mauris gravida ligula, eu tincidunt magna ligula eget libero. Ut at massa ultrices, pulvinar libero eget, scelerisque sem. Proin at tincidunt odio. Duis lobortis ultricies arcu, non finibus ligula tincidunt nec. Phasellus quis ipsum tincidunt, lobortis elit non, ultricies elit. Sed euismod auctor
</p>

<button onClick={handleClick} className="bg-black"> <p> Details</p></button> */}
<div  className=" flex justify-center">

<CarouselDemo></CarouselDemo>
</div>

<div >

  {/* <div className="h-20 bg-black text-white flex">
    <div className=" pr-60"></div>
    <div>
    <h1>Resident evil 7</h1>
    <p> Just a game</p>
    </div>

  </div> */}
<Games></Games>

</div>
</div>
</div>
  );
}
