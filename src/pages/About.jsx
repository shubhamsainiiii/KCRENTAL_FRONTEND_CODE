/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHistory, FaBullseye, FaHeart, FaArrowRight } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import aboutImgDesktop from "../assets/images/slider1.jpg";
import aboutImgMobile from "../assets/images/slidermobile2.jpg";
import buy from "../assets/images/buy.jpg";
/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.9, ease: "easeOut" },
    },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] text-gray-800 overflow-x-hidden">
            {/* ===== HERO ===== */}
            <section className="relative h-svh md:h-screen mt-16 flex items-center justify-center bg-pink-900 overflow-hidden">
                {/* Desktop Image */}
                <img
                    src={aboutImgDesktop}
                    alt="About Background Desktop"
                    className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-80"
                />
                {/* Mobile Image */}
                <img
                    src={aboutImgMobile}
                    alt="About Background Mobile"
                    className="absolute inset-0 w-full h-full object-cover block md:hidden opacity-80"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        About Us
                    </h1>
                    <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Redefining luxury jewelry with accessibility and elegance.
                    </p>
                </motion.div>
            </section>

            {/* ===== OUR STORY ===== */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        className="flex flex-col justify-center h-full py-8"
                    >
                        {/* TOP CONTENT */}
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#e2b82e]">
                                Our Story
                            </h2>

                            <div className="w-20 h-1 bg-[#e2b82e]" />

                            <p className="text-lg text-[#e2b82e] leading-relaxed">
                                Tarkashi Jewellers started with a simple idea —
                                <span className="font-semibold">
                                    {" "}why buy expensive jewelry that you only wear once?
                                </span>
                            </p>

                            <p className="text-lg text-[#e2b82e] leading-relaxed">
                                We believed that everyone deserves to look extraordinary on their
                                special moments without spending a fortune. What began as a small,
                                thoughtfully curated collection soon transformed into a trusted
                                destination for fine jewelry.
                            </p>

                            <p className="text-lg text-[#e2b82e] leading-relaxed">
                                From a humble beginning to a collection of{" "}
                                <span className="font-semibold">exquisite jewelry pieces</span>,
                                we proudly serve thousands of fashion-forward customers across
                                weddings, engagements, festivals, sangeet nights, receptions,
                                and grand celebrations.
                            </p>
                            <p className="text-lg text-[#e2b82e] leading-relaxed">
                                We focus on quality and detailing — ensuring every jewelry piece
                                feels as luxurious as it looks. With personalized styling support
                                and curated collections, we make luxury accessible,
                                affordable, and unforgettable.
                            </p>

                            <p className="text-lg text-[#e2b82e] leading-relaxed">
                                At Tarkashi Jewellers, we don’t just craft jewelry —
                                <span className="font-semibold">
                                    {" "}we help you create memories, confidence, and timeless moments.
                                </span>
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        className="relative h-148 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <LazyLoadImage
                            effect="blur"
                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                            src={buy}
                            alt="Our Story"
                            className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </section>
            {/* ===== VISIT OUR STORE BUTTON ===== */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/contact")}
                    className="
      flex items-center gap-4
      px-14 py-3
      rounded-full
      border border-[#e2b82e]
      text-[#e2b82e]
      font-semibold text-xl
      hover:bg-[#e2b82e]
      hover:text-black
      transition-all duration-500 cursor-pointer
    "
                >
                    Visit Our Store
                    <FaArrowRight className="text-2xl" />
                </motion.button>
            </motion.div>


            {/* ===== MISSION / VALUES ===== */}
            <section className="py-20 px-6">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: <FaHistory className="text-4xl text-[#e2b82e]" />,
                            title: "Our Journey",
                            desc: "From a boutique to a trusted jewelry destination."
                        },
                        {
                            icon: <FaBullseye className="text-4xl text-[#e2b82e]" />,
                            title: "Our Mission",
                            desc: "Affordable luxury for every special occasion."
                        },
                        {
                            icon: <FaHeart className="text-4xl text-[#e2b82e]" />,
                            title: "Our Values",
                            desc: "Quality, hygiene & customer happiness."
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            whileHover={{ y: -8 }}
                            className="bg-[#340B53] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="mb-6 text-[#e2b82e]">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-4 text-[#e2b82e]">{item.title}</h3>
                            <p className="text-[#e2b82e]">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-20 bg-[#340B53] ">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { number: "6000+", label: "Jewelry Pieces" },
                        { number: "5000+", label: "Happy Clients" },
                        { number: "10+", label: "Years Experience" },
                        { number: "4.9", label: "Star Rating" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-[#e2b82e] mb-2">
                                {stat.number}
                            </h3>
                            <p className="text-[#e2b82e] font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 px-6 text-center">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#e2b82e]">
                        Join Our Growing Family
                    </h2>
                    <p className="text-lg text-[#e2b82e] mb-10">
                        Buy or explore — elegance crafted by Tarkashi Jewellers.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/jewelry")}
                            className="px-8 py-3  text-[#e2b82e] rounded-full font-semibold hover:bg-yellow-500/90 transition-all duration-500  border border-yellow-400 cursor-pointer hover:text-black"
                        >
                            Explore Jewelry
                        </button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default About;
