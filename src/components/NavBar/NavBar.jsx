import { useState } from 'react';
import {  Link, useLocation } from 'react-router-dom';
import TokenVerificationCard from './TokenVerificationCard';
import ButtonTheme from './ButtonTheme';
import ProfileButton from './ProfileButton';
import LogoutButton from './LogoutButton';
import useAuth from '../../hooks/useAuth';
import MovilNavBar from './MovilNavBar';
import SearchBar from '../SearchBar';


const NavBar = ({setIsCardVisible}) => {
  const {auth } = useAuth()

 /*  const {pathname} = useLocation() */


  const isLoggedIn = auth?.success;

  return (
    <div className="fixed md:top-0 md:bottom-auto bottom-0 mx-auto z-30 w-full dark:bg-opacity-45 bg-opacity-45 backdrop-blur-sm rounded flex  border-b dark:border-b-0  justify-between flex-row items-center">
      <nav 
        className="hidden md:flex  justify-end flex-row items-center px-3 py-3 h-[60px] dark:bg-neutral-800 bg-gray-200 w-full rounded dark:bg-opacity-45 bg-opacity-45 dark:bg-opacity-0 bg-opacity-0 backdrop-blur-sm "
      >
       
        <div className="flex justify-between items-center gap-3 flex-row  ">
        {!isLoggedIn && (
           <div className='flex gap-5 items-center flex-row '>
              <Link 
              className="hover:text-primary" to="/login">Login</Link>
              <Link 
              className="hover:text-primary" to="/signup">Sign Up</Link>
            </div>
          )}
        {isLoggedIn && (
            <div className='flex gap-5 items-center flex-row '>
              <SearchBar />
              <ProfileButton  />
              <LogoutButton   />
            </div>
          )}
          <ButtonTheme />
        </div>
      </nav>
      <MovilNavBar />
      <TokenVerificationCard setIsCardVisible={setIsCardVisible} />
    </div>
  );
};

export default NavBar;