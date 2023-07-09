import React, { useState } from 'react';
import NewInterviewForm from './NewInterviewForm';
import { FaPlus } from 'react-icons/fa';
import logo from '../InterviewBuddy-Logo2.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeaderComponent = ({ isMenuOpen }) => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleShowForm = () => {
        setShowForm(!showForm);
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured
        navigate('/login');
    };

    return (
        <>
            <div className="w-12 md:w-14 lg:w-18 xl:w-24 h-auto absolute top-0 left-0 mt-5 ml-4 md:ml-8 lg:ml-12 xl:ml-16">
                <img src={logo} alt="Interview Buddy Logo" className="w-full h-auto" />
            </div>
            <header className="container flex px-4 md:px-8 lg:px-12 xl:px-16 mt-5">
                <div className="mx-auto">
                    {!isMenuOpen && (
                        <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => setShowForm(!showForm)} 
                            className="flex items-center bg-gradient rounded-full p-4 shadow-2xl"
                        >
                            <FaPlus style={{ color: '#34BB9A' }} className="mr-2" />
                            <span className="brand-font-bold text-white text-lg">New Interview</span>
                        </motion.button>
                    )}
                    <NewInterviewForm showForm={showForm} onClose={handleShowForm} />
                </div>
            </header>
        </>
    );
}

export default HeaderComponent;