/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import { FaGem } from "react-icons/fa";
import { MdVerified, MdPayments } from "react-icons/md";


const footerItems = [
    { icon: <FaGem size={34} />, text: "Premium Jewelry Collection" },
    { icon: <MdVerified size={34} />, text: "Authentic & Hygienic Pieces" },
    { icon: <MdPayments size={34} />, text: "Pay on Store Pickup" },
    { icon: <GiSewingMachine size={34} />, text: "Styling Support" },
];

const footerLinks = [
    { label: "About Us", path: "/about" },
    { label: "Our Services", path: "/services" },
    { label: "Contact Us", path: "/contact" },
];

const Footer = () => {
    return (
        <footer className="bg-[#340B53] text-[#D4AF37] pt-16 font-primary border-t border-[#C9A24D]">

            {/* FEATURES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center px-6 md:px-20 mb-10">
                {footerItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-3 rounded-full border border-gold-500 hover:bg-[#E6C87A] hover:text-black  transition-all duration-500"
                        >
                            {item.icon}
                        </motion.div>
                        <p className="text-md font-medium opacity-80">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* INSTAGRAM BUTTON */}
            <div className="text-center py-5">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://www.instagram.com/tarkashi_jewellers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gold-500 text-gold-500 px-6 py-3 rounded-full hover:bg-gold-500  text-md transition-all duration-500"
                >
                    <FaInstagram size={20} />
                    Follow us on Instagram
                </motion.a>
            </div>

            <div className="border-t border-gold-500 opacity-30"></div>

            {/* LINKS */}
            <div className="pt-10">
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 text-md font-semibold">
                    {footerLinks.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="relative group"
                        >
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `transition-all duration-300 ${isActive ? "text-gold-600" : "text-gold-500"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>

                            {/* underline animation */}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="text-gold text-center py-2 text-sm">
                © {new Date().getFullYear()} Tarkashi Jewellers — All Rights Reserved
            </div>

        </footer>
    );
};

export default Footer;
