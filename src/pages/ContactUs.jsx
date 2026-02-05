/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import contactDesktop from "../assets/images/slider2.jpg";
import contactMobile from "../assets/images/slidermobile3.jpg";

const fadeLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.1, ease: "easeOut" },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.1, ease: "easeOut" },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
    },
};

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneNumber = "917691888950";

        const text = `
New enquiry from Tarkashi Jewellers website
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `;

        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        window.open(url, "_blank");
    };

    return (
        <div className="text-gray-800 bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] overflow-hidden">
            {/* ================= HERO ================= */}
            <section className="relative h-svh md:h-screen flex items-center justify-center bg-black mt-16">
                {/* Desktop Image */}
                <img
                    src={contactDesktop}
                    alt="Contact Us"
                    className="absolute inset-0 w-full h-full object-cover hidden md:block"
                />

                {/* Mobile Image */}
                <img
                    src={contactMobile}
                    alt="Contact Us Mobile"
                    className="absolute inset-0 w-full h-full object-cover block md:hidden"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Title + Tagline */}
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-white text-4xl md:text-6xl font-bold tracking-wide"
                    >
                        Contact Us
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-white/90 text-base md:text-2xl max-w-2xl mx-auto"
                    >
                        We’re here to help you look your best — get in touch with us today
                    </motion.p>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
                {/* MAP */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full h-95 md:h-full rounded-2xl overflow-hidden shadow-xl"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.340214509431!2d75.743702!3d26.976091999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db30003a49793%3A0x938989c40b41bff!2sKC_RENTAL%20OUTFITS%20%26%20BOUTIQUE!5e1!3m2!1sen!2sin!4v1767063351254!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="border-0"
                        title="Store Location"
                    ></iframe>
                </motion.div>

                {/* CONTACT FORM */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="bg-[#340B53]  backdrop-blur-md p-10 rounded-2xl shadow-lg h-full flex flex-col justify-center text-[#e2b82e]"
                >
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        className="text-3xl font-bold mb-4 text-[#e2b82e]"
                    >
                        Let’s Connect
                    </motion.h2>

                    <p className="mb-8">
                        Have a question or looking for the perfect jewelry?
                        <br />
                        <span className="font-semibold ">
                            We’re just a message away
                        </span>
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <motion.input
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#e2b82e] focus:outline-none"
                        />

                        <motion.input
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#e2b82e] focus:outline-none"
                        />

                        <motion.textarea
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            rows="4"
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#e2b82e] focus:outline-none"
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="mx-auto px-10 py-3 rounded-full border border-[#e2b82e] hover:bg-black/10 transition-all duration-500 font-semibold block cursor-pointer"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactUs;
