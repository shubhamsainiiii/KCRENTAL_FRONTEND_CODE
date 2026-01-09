import React, { useState, useRef } from "react";
import API from "./AdminApi";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

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

const AddJewelry = () => {
    const [form, setForm] = useState({
        name: "",
        buyPrice: "",
        rentPerDay: "",
        category: "",
        description: "",
    });

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.buyPrice ||
            !form.rentPerDay ||
            !form.category ||
            !form.description
        ) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            /* ================= CLOUDINARY IMAGE UPLOAD ================= */
            const uploadedImages = [];

            for (const img of images) {
                const res = await uploadToCloudinary(img);
                uploadedImages.push({
                    public_id: res.public_id,
                    url: res.secure_url,
                });
            }

            /* ================= CLOUDINARY VIDEO UPLOAD ================= */
            let uploadedVideo = null;

            if (video) {
                const res = await uploadToCloudinary(video);
                uploadedVideo = {
                    public_id: res.public_id,
                    url: res.secure_url,
                };
            }

            /* ================= SEND JSON TO BACKEND ================= */
            const payload = {
                name: form.name,
                category: form.category,
                description: form.description,
                price: {
                    buy: form.buyPrice,
                    rentPerDay: form.rentPerDay,
                },
                images: uploadedImages,
                video: uploadedVideo,
            };

            await API.post("/jewelry/add", payload);

            toast.success("Jewelry Added Successfully");

            // ✅ Reset form fields
            setForm({
                name: "",
                buyPrice: "",
                rentPerDay: "",
                category: "",
                description: "",
            });

            // ✅ Reset state
            setImages([]);
            setVideo(null);

            // ✅ Reset file inputs (DOM level)
            if (imageInputRef.current) imageInputRef.current.value = "";
            if (videoInputRef.current) videoInputRef.current.value = "";

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Error adding jewelry");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:px-4">
            <div className="w-full max-w-6xl backdrop-blur-xl bg-[#340B53] rounded-3xl shadow-2xl border border-[#e2b82e]">

                {/* Header */}
                <div className="px-10 pt-10 pb-6 border-b border-slate-200 text-[#e2b82e]">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Add New Jewelry
                    </h2>
                    <p className="text-sm mt-2">
                        Add jewelry with Buy & Rent (per day) pricing.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="px-5 sm:px-6 md:px-10 py-6 sm:py-8 space-y-5 sm:space-y-6 text-[#e2b82e]"
                >
                    {/* Jewelry Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Jewelry Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Bridal Necklace Set"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 text-sm"
                        />
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Buy Price (₹)
                            </label>
                            <input
                                type="number"
                                name="buyPrice"
                                placeholder="7999"
                                value={form.buyPrice}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Rent Price / Day (₹)
                            </label>
                            <input
                                type="number"
                                name="rentPerDay"
                                placeholder="499 / day"
                                value={form.rentPerDay}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 text-sm"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 text-sm"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Material, weight, purity, styling tips..."
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 text-sm resize-none"
                        />
                    </div>

                    {/* Media Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Images */}
                        <div className="p-5 rounded-2xl border border-dashed border-slate-300">
                            <label className="block text-sm font-semibold mb-2">
                                Jewelry Images
                                <span className="text-xs ml-1">(Multiple allowed)</span>
                            </label>

                            <input
                                type="file"
                                multiple
                                ref={imageInputRef}
                                accept="image/*"
                                onChange={(e) => setImages([...e.target.files])}
                                className="block w-full text-sm
        file:mr-4 file:py-2.5 file:px-5
        file:rounded-full file:border-0
        file:bg-slate-900 file:text-[#e2b82e]
        hover:file:bg-slate-700 cursor-pointer"
                            />

                            {/* ✅ IMAGE PREVIEW */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={URL.createObjectURL(img)}
                                            alt="preview"
                                            className="h-28 w-full object-cover rounded-xl border border-[#e2b82e]"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Video */}
                        <div className="p-5 rounded-2xl border border-dashed border-slate-300">
                            <label className="block text-sm font-semibold mb-2">
                                Jewelry Video (Optional)
                            </label>

                            <input
                                type="file"
                                accept="video/*"
                                ref={videoInputRef}
                                onChange={(e) => setVideo(e.target.files[0])}
                                className="block w-full text-sm
        file:mr-4 file:py-2.5 file:px-5
        file:rounded-full file:border-0
        file:bg-slate-900 file:text-[#e2b82e]
        hover:file:bg-slate-700 cursor-pointer"
                            />

                            {/* ✅ VIDEO PREVIEW */}
                            {video && (
                                <video
                                    controls
                                    src={URL.createObjectURL(video)}
                                    className="mt-4 w-full h-40 rounded-xl border border-[#e2b82e] object-contain"
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-full bg-[#e2b82e] px-8 py-3 text-sm font-semibold text-black
                            hover:scale-105 shadow-lg transition-all duration-500 disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? "Saving..." : "Add Jewelry"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJewelry;
