import React, { useState } from 'react';
import Profile from './assets/profile.jpeg';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LoginModal from './LoginModal';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleLogout = () => {
      console.log("Logging out...");
      navigate('/'); 
    };
    const isHeroPage = location.pathname === '/';
    const isCoursesPage = location.pathname === '/profile';
    
    return (
        <>
            <div className='navbar-container w-full fixed top-0 left-0 bg-primary-blue lg:h-[60px] md:h-[80px] h-[65px] px-[65px] flex items-center justify-between z-[999]'>
                <div className="logo flex items-center space-x-8">

                    <h1 className="xl:text-[24px] text-[22px] text-white font-medium ">CoursesMate</h1>
                </div>

                {isHeroPage && (
                <div className='absolute right-12 cursor-pointer md:hidden text-white' onClick={() => setToggleMenu(!toggleMenu)}>
                    {toggleMenu ? (<IoMdClose className='h-7 w-7'/>) : <RxHamburgerMenu className='h-7 w-7'/>}
                </div>
                )}

                {isHeroPage && (
                <ul className={`flex flex-col md:flex-row items-center justify-center md:py-0 py-12 md:pl-10 absolute md:static bg-white md:bg-primary-blue md:z-auto z-[-1] left-0 w-full xl:space-x-6 xl:text-[16px] text-[18px] md:space-x-3 space-y-4 md:space-y-0 font-medium md:w-auto transition-all duration-500 ease-in shadow-lg md:shadow-none ${toggleMenu ? 'top-0 z-10 ' : 'top-[-490px]'}`}>
                    <li className="text-primary-blue text-opacity-95 cursor-pointer md:hover:border-b-accent md:hover:border-b-[3px] px-2">About Us</li>
                    <li className="text-primary-blue text-opacity-95 cursor-pointer md:hover:border-b-accent md:hover:border-b-[3px] px-2">Explore</li>
                    <button
                        className="bg-secondary-blue rounded-[10px] xl:rounded-[10px] flex items-center justify-center px-8 w-[150px] h-[40px] shadow-md hover:shadow-lg hover:shadow-secondary-blue transition duration-300"
                        onClick={openModal}
                        >
                        <p className="text-white text-[14px] xl:text-[16px] text-center">
                            Sign Up
                        </p>
                    </button>
                </ul>
                )}

        {isCoursesPage && (
          <div className="relative flex items-center space-x-4 cursor-pointer" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
            <p className="text-white">Your Name</p>
            <img 
              src={Profile} 
              alt="Profile"
              className="rounded-full h-10 w-10"
            />
          </div>
        )}

        {isProfileDropdownOpen && (
          <div className="absolute right-12 top-16 bg-white shadow-md rounded-md w-[150px] p-2">
            <button 
              className="w-full text-left text-sm text-gray-700 hover:bg-gray-200 px-4 py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
            
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default Navbar;