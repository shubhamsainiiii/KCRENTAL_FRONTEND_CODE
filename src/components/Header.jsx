/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Header = () => {
    const [isOpen, setOpen] = useState(false);

    const menuItems = [
        { name: "HOME", path: "/" },
        { name: "ABOUT", path: "/about" },
        { name: "JEWELRY", path: "/jewelry" },
        { name: "OUR SERVICES", path: "/services" },
        { name: "CONTACT", path: "/contact" },
    ];

    const linkClass = ({ isActive }) =>
        `transition-all duration-300 ${isActive ? "text-[#e2b82e]" : "text-white"
        } hover:text-[#e2b82e]`;

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const mobileItemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <header className="bg-[#340B53] text-white px-6 py-5 flex items-center justify-between shadow-sm fixed w-full z-50 top-0">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="Tarkashi Jewellers Logo"
                    className="h-14 sm:h-13 w-auto object-contain mt-0.5"
                />
            </NavLink>


            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 font-medium text-md">
                {menuItems.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className={linkClass}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
                <Hamburger toggled={isOpen} toggle={setOpen} color="#e2b82e" />
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-16 left-0 w-full h-screen bg-[#340B53] text-[#e2b82e] py-8 px-6 md:hidden"
                    >
                        <motion.ul
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex flex-col gap-6 text-lg font-medium"
                        >
                            {menuItems.map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={mobileItemVariants}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className="block hover:text-pink-400 transition-all duration-300"
                                    >
                                        {item.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
};

export default Header;
