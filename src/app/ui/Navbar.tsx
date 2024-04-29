import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import { useRouter } from 'next/navigation'
import Login from "../pages/login/page";
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {

};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default function TopBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user); // Set isLoggedIn based on whether user exists
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, [auth]);
  const router = useRouter()
  const handleClick = () => {
    console.log('Button clicked!');
 
    router.push('pages/addgame/', { scroll: false })
  };

  const handleClick2 = () => {
    console.log('Button clicked!');
 
    router.push('pages/login/', { scroll: false })
  };

  return (
    <Navbar className="dark" shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Sign Up
          </Link>
        </NavbarItem>
    
      </NavbarContent> */}
      <NavbarContent justify="end">
      {isLoggedIn ? (
            <p className="hidden sm:flex gap-4">Welcome, {user!.email}</p>
          ) : (
            <Login />
          )}
        {isLoggedIn &&( < NavbarItem>
          <Button onClick={handleClick}>
            Add Game
          </Button>
        </NavbarItem>) }
        
      </NavbarContent>
    </Navbar>
  );
}
