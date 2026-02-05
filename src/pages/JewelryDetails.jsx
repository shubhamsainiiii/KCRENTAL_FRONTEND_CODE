/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import API from "../Admin/AdminApi";
import { getImageUrl } from "../utils/helper";
import { FaVideo } from "react-icons/fa";

const sizes = ["S", "M", "L", "XL"];

/* ================= ANIMATION VARIANTS ================= */
const pageVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const leftVariant = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const rightVariant = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const JewelryDetails = () => {
    const { id } = useParams();
    const [jewelry, setJewelry] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedType, setSelectedType] = useState("image");
    const [selectedSize, setSelectedSize] = useState("M");
    const [loading, setLoading] = useState(true);

    const sendWhatsApp = () => {
        if (!jewelry) return;

        const phone = "917691888950";
        const itemLink = `${window.location.origin}/jewelry/${id}`;

        const priceText = `Buy Price: ₹${jewelry.price?.buy}`;

        const text =
            `Hello Tarkashi Jewellers,\n` +
            `I want to buy this jewelry:\n` +
            `Name: ${jewelry.name}\n` +
            `Category: ${jewelry.category}\n` +
            `${priceText}\n` +
            `Size: ${selectedSize}\n` +
            `Link: ${itemLink}`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    /* ===== FETCH JEWELRY ===== */
    useEffect(() => {
        const fetchJewelry = async () => {
            try {
                const res = await API.get(`/jewelry/${id}`);
                const data = res.data;
                setJewelry(data);

                if (data.images?.length > 0) {
                    setSelectedMedia(data.images[0].url);
                    setSelectedType("image");
                }
            } catch (error) {
                console.error("Error fetching jewelry details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJewelry();
    }, [id]);

    if (loading) {
        return <div className="pt-32 text-center text-[#e2b82e]">Loading...</div>;
    }

    if (!jewelry) {
        return (
            <div className="pt-32 text-center text-[#e2b82e] font-bold">
                Jewelry item not found
            </div>
        );
    }

    return (
        <motion.section
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            className="min-h-screen text-gray-800 bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] pt-28 px-6 pb-20"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* ===== LEFT : MEDIA ===== */}
                <motion.div variants={leftVariant}>
                    {/* MAIN IMAGE / VIDEO */}
                    <motion.div
                        key={selectedMedia}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-h-164 rounded-2xl flex items-center justify-center overflow-hidden mb-4"
                    >
                        {selectedType === "video" ? (
                            <video
                                src={getImageUrl(selectedMedia)}
                                controls
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <LazyLoadImage
                                effect="blur"
                                wrapperProps={{ style: { transitionDelay: "1s" } }}
                                src={getImageUrl(selectedMedia)}
                                alt={jewelry.name}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {jewelry.images?.map((img, index) => (
                            <motion.div
                                key={index}
                                onClick={() => {
                                    setSelectedMedia(img.url);
                                    setSelectedType("image");
                                }}
                                className={`w-24 h-28 rounded-xl overflow-hidden cursor-pointer border shrink-0 bg-white
                                ${selectedMedia === img.url
                                        ? "border-[#e2b82e]"
                                        : "border-gray-300"
                                    }`}
                            >
                                <LazyLoadImage
                                    effect="blur"
                                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                                    src={getImageUrl(img.url)}
                                    alt="thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}

                        {/* VIDEO THUMBNAIL */}
                        {jewelry.video?.url && (
                            <motion.div
                                onClick={() => {
                                    setSelectedMedia(jewelry.video.url);
                                    setSelectedType("video");
                                }}
                                className={`relative w-24 h-28 rounded-xl overflow-hidden cursor-pointer border shrink-0 bg-black
                                ${selectedType === "video"
                                        ? "border-[#e2b82e]"
                                        : "border-gray-300"
                                    }`}
                            >
                                <video
                                    src={getImageUrl(jewelry.video.url)}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <FaVideo className="text-white text-xl" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* ===== RIGHT : DETAILS ===== */}
                <motion.div
                    variants={rightVariant}
                    className="flex flex-col"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#e2b82e]">
                        Name : {jewelry.name}
                    </h1>

                    <p className="text-[#e2b82e] mb-4">Category : {jewelry.category}</p>

                    <p className="text-2xl text-[#e2b82e] font-semibold mb-6">
                        Buy ₹ : {jewelry.price?.buy}
                    </p>

                    {/* SIZE */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2 text-[#e2b82e]">Select Size</p>
                        <div className="flex gap-3">
                            {sizes.map((size) => (
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer font-bold
                                    ${selectedSize === size
                                            ? "bg-[#e2b82e]  text-black  border-gray-500"
                                            : "text-[#e2b82e] border-[#e2b82e] hover:bg-black/10"
                                        }`}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mb-8">
                        <p className="font-semibold mb-2 text-[#e2b82e] ">Description</p>
                        <p className="text-[#e2b82e]  leading-relaxed">
                            {jewelry.description}
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={sendWhatsApp}
                            className="flex-1 py-3 rounded-full text-black hover:text-black bg-[#e2b82e]  transition-all duration-300 font-semibold cursor-pointer"
                        >
                            Buy Now
                        </motion.button>
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
};

export default JewelryDetails;
