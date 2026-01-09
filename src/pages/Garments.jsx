/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import API from "../Admin/AdminApi";
import { getImageUrl } from "../utils/helper";

import bannerDesktop from "../assets/images/slider2.jpg";
import bannerMobile from "../assets/images/slidermobile1.jpg";

/* CATEGORIES */
const categories = [
    "ALL GARMENTS",
    "LEHENGAS",
    "SAREES",
    "GOWNS",
    "ANARKALIS & SUITS",
    "TOP-BOTTOM",
    "SHARARAS",
    "OTHERS",
];

const Garments = () => {
    const [activeCategory, setActiveCategory] = useState("ALL GARMENTS");
    const [garments, setGarments] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    /* ===== FETCH GARMENTS ===== */
    useEffect(() => {
        const fetchGarments = async () => {
            try {
                const res = await API.get("/garment/all");
                setGarments(res.data);
            } catch (error) {
                console.error("Error fetching garments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGarments();
    }, []);

    /* ===== CATEGORY FILTER ===== */
    const filteredGarments =
        activeCategory === "ALL GARMENTS"
            ? garments
            : garments.filter((item) => item.category === activeCategory);

    return (
        <section className="min-h-screen text-gray-800 bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] pb-12">

            {/* ===== BANNER ===== */}
            <section className="relative w-full h-screen mt-16 overflow-hidden">
                <img
                    src={bannerDesktop}
                    alt="Garments Banner"
                    className="hidden md:block w-full h-full object-cover"
                />
                <img
                    src={bannerMobile}
                    alt="Garments Banner Mobile"
                    className="block md:hidden w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6 }}
                        className="text-white text-3xl md:text-5xl font-bold mb-4"
                    >
                        Our Garments Collection
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6 }}
                        className="text-white/90 max-w-2xl text-sm md:text-lg"
                    >
                        Explore premium outfits curated for every occasion
                    </motion.p>
                </div>
            </section>

            {/* ===== CATEGORY FILTER ===== */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 mt-10 py-6">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-500 cursor-pointer
                        ${activeCategory === cat
                                ? "bg-yellow-400/80 text-black border-[#e2b82e]"
                                : "text-[#e2b82e] border-[#e2b82e] hover:bg-black/10 hover:border-gray-500"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ===== LOADING ===== */}
            {loading && (
                <p className="text-center text-[#e2b82e]">Loading garments...</p>
            )}

            {/* ===== GARMENTS GRID ===== */}
            {!loading && filteredGarments.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredGarments.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            onClick={() => navigate(`/garments/${item._id}`)}
                            className="bg-[#340B53] rounded-2xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer"
                        >
                            {/* IMAGE */}
                            <div className="h-48 rounded-xl mb-4 overflow-hidden">
                                <LazyLoadImage
                                    effect="blur"
                                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                                    src={getImageUrl(item.images?.[0]?.url)}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="font-semibold text-lg mb-1 text-[#e2b82e]">
                                {item.name}
                            </h3>

                            <p className="text-sm text-[#e2b82e] mb-2">
                                {item.category}
                            </p>

                            {/* ✅ NEW SCHEMA PRICE */}
                            <p className="font-semibold text-[#e2b82e]">
                                Rent ₹{item.price?.rentPerDay}/day
                            </p>
                            <p className="font-semibold text-[#e2b82e]">
                                Buy ₹{item.price?.buy}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ===== EMPTY STATE ===== */}
            {!loading && filteredGarments.length === 0 && (
                <p className="text-center font-bold text-[#e2b82e] mt-20">
                    No garments found in this category.
                </p>
            )}
        </section>
    );
};

export default Garments;
