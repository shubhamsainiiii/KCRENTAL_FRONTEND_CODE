/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTshirt, FaCut, FaGem, FaUserTie, FaArrowRight } from "react-icons/fa";

import bannerDesktop from "../assets/images/slider2.jpg";
import bannerMobile from "../assets/images/slidermobile1.jpg";

/* ================= SERVICES DATA ================= */
const services = [
    {
        id: 1,
        title: "Exquisite Jewelry",
        desc: "Complete your look with our stunning collection of necklaces, earrings, and bangles.",
        icon: <FaGem size={40} className="text-[#340B53]" />,
        link: "/jewelry"
    },
    {
        id: 1,
        title: "Exquisite Jewelry",
        desc: "Complete your look with our stunning collection of necklaces, earrings, and bangles.",
        icon: <FaGem size={40} className="text-[#340B53]" />,
        link: "/jewelry"
    }
];

/* ================= ANIMATION VARIANTS ================= */
const containerVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const OurServices = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen text-gray-800 bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] pb-12">

            {/* ===== HERO BANNER ===== */}
            <section className="relative w-full h-screen mt-10 overflow-hidden">
                <img
                    src={bannerDesktop}
                    alt="Our Services"
                    className="hidden md:block w-full h-full object-cover"
                />
                <img
                    src={bannerMobile}
                    alt="Our Services Mobile"
                    className="block md:hidden w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.9, ease: "easeOut" }}
                        className="text-white text-4xl md:text-6xl font-bold mb-4"
                    >
                        Our Services
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.9, ease: "easeOut" }}
                        className="text-white/90 text-lg md:text-xl max-w-2xl"
                    >
                        Discover premium jewelry for weddings and special occasions.
                    </motion.p>
                </div>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.9 }}
                        className="text-3xl md:text-4xl font-bold text-[#e2b82e] mb-4"
                    >
                        What We Offer
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: false }}
                        className="h-1 bg-[#e2b82e] mx-auto"
                    />
                </div>

                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariant}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -12 }}
                            className="bg-[#340B53] rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-[#e2b82e] transition-all duration-300 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 5, scale: 1.15 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-pink-50 p-4 rounded-full mb-6 group-hover:bg-pink-100"
                            >
                                {service.icon}
                            </motion.div>

                            <h3 className="text-2xl font-bold mb-4 text-[#e2b82e]">
                                {service.title}
                            </h3>

                            <p className="text-[#e2b82e] mb-8 leading-relaxed">
                                {service.desc}
                            </p>

                            <motion.button
                                whileHover={{ gap: 14 }}
                                onClick={() => navigate(service.link)}
                                className="mt-auto flex items-center gap-2 text-[#e2b82e] font-semibold transition-all duration-300 cursor-pointer"
                            >
                                Learn More <FaArrowRight />
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="bg-[#340B53] text-[#e2b82e] py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        Ready to Elevate Your Look?
                    </h2>

                    <p className="text-[#e2b82e] text-lg mb-10">
                        Visit our boutique or contact us today to find your perfect jewelry.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/contact")}
                        className="px-10 py-4 bg-white/10 border border-[#e2b82e] text-[#e2b82e] rounded-full font-bold text-lg hover:bg-[#e2b82e] transition-all duration-300 cursor-pointer hover:text-black"
                    >
                        Contact Us Now
                    </motion.button>
                </motion.div>
            </section>

        </section>
    );
};

export default OurServices;
