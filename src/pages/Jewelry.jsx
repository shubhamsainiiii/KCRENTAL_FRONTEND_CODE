import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import API from "../Admin/AdminApi";
import { getImageUrl } from "../utils/helper";

import bannerDesktop from "../assets/images/slider1.jpg";
import bannerMobile from "../assets/images/slidermobile1.jpg";

/* CATEGORIES */
const categories = [
    "ALL JEWELRY",
    "NECKLACE SETS",
    "EARRINGS",
    "BANGLES",
    "RINGS",
    "HAIR ACCESSORIES",
    "ANKLETS",
    "OTHERS"
];

const Jewelry = () => {
    const [activeCategory, setActiveCategory] = useState("ALL JEWELRY");
    const [jewelry, setJewelry] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    /* ===== FETCH JEWELRY FROM BACKEND ===== */
    useEffect(() => {
        const fetchJewelry = async () => {
            try {
                const res = await API.get("/jewelry/all");
                setJewelry(res.data);
            } catch (error) {
                console.error("Error fetching jewelry", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJewelry();
    }, []);

    /* ===== CATEGORY FILTER ===== */
    const filteredJewelry =
        activeCategory === "ALL JEWELRY"
            ? jewelry
            : jewelry.filter((item) => item.category === activeCategory);

    return (
        <section className="min-h-screen text-gray-800 bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F]  pb-12">

            {/* ===== BANNER ===== */}
            {/* ===== BANNER ===== */}
            <section className="relative w-full h-screen mt-16 overflow-hidden">
                <img
                    src={bannerDesktop}
                    alt="Jewelry Banner"
                    className="hidden md:block w-full h-full object-cover"
                />
                <img
                    src={bannerMobile}
                    alt="Jewelry Banner Mobile"
                    className="block md:hidden w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.8 }}
                        className="text-white text-3xl md:text-5xl font-bold mb-4"
                    >
                        Elegant Jewelry Collection
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.8 }}
                        className="text-white/90 max-w-2xl text-sm md:text-lg"
                    >
                        Explore premium jewelry curated for every occasion
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
                                ? "bg-yellow-400/80   text-black border border-[#e2b82e]"
                                : " text-[#e2b82e] border-[#e2b82e] hover:bg-black/10 hover:border-gray-500"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ===== LOADING ===== */}
            {loading && (
                <p className="text-center text-[#e2b82e]">Loading jewelry...</p>
            )}

            {/* ===== JEWELRY GRID ===== */}
            {!loading && filteredJewelry.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredJewelry.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            onClick={() => navigate(`/jewelry/${item._id}`)}
                            className="bg-[#340B53] rounded-3xl shadow-xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
                        >
                            {/* IMAGE */}
                            <div className="rounded-2xl bg-[#340B53] p-3">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden">

                                    <LazyLoadImage
                                        effect="blur"
                                        wrapperProps={{ style: { transitionDelay: "1s" } }}
                                        src={getImageUrl(item.images?.[0]?.url)}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 px-2">
                                <h3 className="text-[#e2b82e] font-semibold text-lg leading-snug">
                                    {item.name}
                                </h3>
                                <p className="uppercase text-sm text-[#e2b82e]/80 mt-1">
                                    {item.category}
                                </p>
                                <p className="font-semibold text-[#e2b82e]">
                                    Buy ₹{item.price?.buy}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ===== EMPTY STATE ===== */}
            {!loading && filteredJewelry.length === 0 && (
                <p className="text-center font-bold text-[#e2b82e] mt-20">
                    No jewelry found in this category.
                </p>
            )}
        </section>
    );
};

export default Jewelry;
