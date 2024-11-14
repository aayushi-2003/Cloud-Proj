import heroImg from './assets/coursesimg.svg';
import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Navbar from './Navbar';

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
    <div>
        <Navbar/>
        <div className="bg-primary-blue h-[100vh] w-full z-[-10] px-[10px] md:px-[100px] xl:px-[150px] flex items-center justify-center">

        <div className='hero-content flex items-center justify-between absolute space-x-4 lg:space-x-[50px] xl:space-x-[135px]'>
            <div className='w-[280px] md:w-[350px] xl:w-[650px] flex flex-col justify-center space-y-[28px] md:space-y-[24px] xl:space-y-[26px]'>
                <h1 className='text-[26px] md:text-[30px] xl:text-[60px] text-white font-bold tracking-wide leading-snug text-center md:text-left'> Manage Your <span className='bg-gradient-to-r from-tertiary-blue to-accent bg-clip-text text-transparent'>Courses</span> Effortlessly</h1>
                <p className='text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] text-white text-opacity-85 text-center md:text-justify'>Manage your course load in one place! Join our community of 1000+ users on a transformative journey.</p>
                <div className='flex space-x-8'>
                    <button className='bg-secondary-blue bg-opacity-40 rounded-[10px] xl:rounded-[10px] flex items-center justify-center px-4 py-3 md:px-6 md:py-3 w-auto h-auto shadow-md hover:shadow-lg hover:shadow-black/40 transition duration-300'>
                        <p className='text-white text-[14px] md:text-[16px] lg:text-[14px] xl:text-[20px] '>How it works?</p>
                    </button>
                    <button
                        className="bg-tertiary-blue rounded-[10px] xl:rounded-[10px] flex items-center justify-center px-4 py-3 md:px-6 md:py-3 w-auto h-auto shadow-md hover:shadow-lg hover:shadow-secondary-blue transition duration-300"
                        onClick={openModal}
                        >
                        <p className="text-primary-blue text-[14px] md:text-[16px] lg:text-[14px] xl:text-[20px] text-center font-semibold">
                            Get Started
                        </p>
                    </button>
                </div>
            </div>
            <div className='image-box hidden md:block'>
                <img src={heroImg} alt="image" className='h-[250px] xl:h-[350px] w-auto rounded-xl ' />
            </div>

        </div>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    </div>
  )
}

export default Hero