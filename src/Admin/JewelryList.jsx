/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import API from "../Admin/AdminApi";
import { getImageUrl } from "../utils/helper";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
    FiUpload,
    FiImage,
    FiVideo,
    FiEdit,
    FiTrash2,
    FiSave,
    FiX
} from "react-icons/fi";

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

const JewelryList = () => {
    const [jewelry, setJewelry] = useState([]);
    const [editJewelry, setEditJewelry] = useState(null);
    const [activeCategory, setActiveCategory] = useState("ALL JEWELRY");

    /* ================= FETCH ================= */
    const fetchJewelry = async () => {
        try {
            const res = await API.get("/jewelry/admin/all");
            setJewelry(res.data);
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error fetching jewelry");
        }
    };

    useEffect(() => {
        fetchJewelry();
    }, []);

    const filteredJewelry =
        activeCategory === "ALL JEWELRY"
            ? jewelry
            : jewelry.filter(
                (item) => item.category === activeCategory
            );

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This jewelry will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e2b82e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: "#340B53",
            color: "#e2b82e",
        });

        if (!result.isConfirmed) return;

        try {
            await API.delete(`/jewelry/delete/${id}`);

            Swal.fire({
                title: "Deleted!",
                text: "Jewelry has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#e2b82e",
                background: "#340B53",
                color: "#e2b82e",
            });

            fetchJewelry();
        } catch (error) {
            console.error("DELETE ERROR:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete jewelry.",
                icon: "error",
                confirmButtonColor: "#e2b82e",
                background: "#340B53",
                color: "#e2b82e",
            });
        }
    };

    /* ================= UPDATE ================= */
    const handleUpdate = async () => {
        try {
            /* ================= CLOUDINARY IMAGE UPLOAD ================= */
            let uploadedImages = editJewelry.images || [];

            if (editJewelry.newImages) {
                uploadedImages = [];

                for (const img of Array.from(editJewelry.newImages)) {
                    const res = await uploadToCloudinary(img);
                    uploadedImages.push({
                        public_id: res.public_id,
                        url: res.secure_url,
                    });
                }
            }

            /* ================= CLOUDINARY VIDEO UPLOAD ================= */
            let uploadedVideo = editJewelry.video || null;

            if (editJewelry.newVideo) {
                const res = await uploadToCloudinary(editJewelry.newVideo);
                uploadedVideo = {
                    public_id: res.public_id,
                    url: res.secure_url,
                };
            }

            /* ================= SEND JSON ================= */
            const payload = {
                name: editJewelry.name,
                category: editJewelry.category,
                description: editJewelry.description,
                isActive: editJewelry.isActive,
                price: {
                    buy: editJewelry.price.buy
                },
                images: uploadedImages,
                video: uploadedVideo,
            };

            await API.put(`/jewelry/update/${editJewelry._id}`, payload);

            toast.success("Jewelry updated successfully");

            /* ================= RESET + BACK ================= */
            setEditJewelry(null);
            fetchJewelry();
        } catch (error) {
            console.error("UPDATE ERROR:", error);
            toast.error("Update failed");
        }
    };


    return (
        <div>
            {/* ================= EDIT MODE ================= */}
            {editJewelry ? (
                <div className="max-w-6xl mx-auto backdrop-blur-xl bg-[#340B53] rounded-3xl shadow-2xl border border-[#e2b82e] py-5 px-4 text-[#e2b82e]">

                    <h2 className="text-3xl font-bold mb-8">Edit Jewelry</h2>

                    {/* Name */}
                    <input
                        className="w-full mb-4 rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3"
                        value={editJewelry.name}
                        onChange={(e) =>
                            setEditJewelry({ ...editJewelry, name: e.target.value })
                        }
                    />

                    {/* Price */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
                        <input
                            type="number"
                            placeholder="Buy Price"
                            className="w-full rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3"
                            value={editJewelry.price.buy}
                            onChange={(e) =>
                                setEditJewelry({
                                    ...editJewelry,
                                    price: {
                                        ...editJewelry.price,
                                        buy: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>

                    {/* Category */}
                    <select
                        className="w-full mb-4 rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3"
                        value={editJewelry.category}
                        onChange={(e) =>
                            setEditJewelry({ ...editJewelry, category: e.target.value })
                        }
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Description */}
                    <textarea
                        rows={4}
                        className="w-full mb-6 rounded-xl border border-slate-300 bg-[#340B53] px-4 py-3 resize-none"
                        value={editJewelry.description}
                        onChange={(e) =>
                            setEditJewelry({
                                ...editJewelry,
                                description: e.target.value,
                            })
                        }
                    />

                    {/* Existing Images */}
                    {/* Images Section */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold mb-3">Images</p>

                        {/* Existing Images */}
                        {editJewelry.images?.length > 0 && !editJewelry.newImages && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {editJewelry.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={getImageUrl(img.url)}
                                        className="h-64 w-full object-cover rounded-xl border border-[#e2b82e]"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Upload Button */}
                        <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-900 text-[#e2b82e] px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-700 transition">
                            <FiImage className="text-lg" />
                            Update Images
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setEditJewelry({
                                        ...editJewelry,
                                        newImages: e.target.files,
                                    })
                                }
                            />
                        </label>


                        {/* New Image Preview */}
                        {editJewelry.newImages && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {Array.from(editJewelry.newImages).map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        className="h-64 w-full object-cover rounded-xl border border-[#e2b82e]"
                                    />
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Existing Video (SMALL PREVIEW) */}
                    {/* Video Section */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold mb-3">Video</p>

                        {/* Existing Video */}
                        {editJewelry.video?.url && !editJewelry.newVideo && (
                            <video
                                controls
                                src={getImageUrl(editJewelry.video.url)}
                                className="h-70 w-100 object-cover rounded-xl border border-[#e2b82e] mb-5"
                            />
                        )}

                        {/* Upload Button */}
                        <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-900 text-[#e2b82e] px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-700 transition">
                            <FiVideo className="text-lg" />
                            Update Video
                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) =>
                                    setEditJewelry({
                                        ...editJewelry,
                                        newVideo: e.target.files[0],
                                    })
                                }
                            />
                        </label>


                        {/* New Video Preview */}
                        {editJewelry.newVideo && (
                            <video
                                controls
                                src={URL.createObjectURL(editJewelry.newVideo)}
                                className="h-70 w-100 object-cover rounded-xl border border-[#e2b82e] mt-5"
                            />
                        )}
                    </div>


                    {/* Modern Active Toggle */}
                    <div className="flex items-center justify-between mt-8 p-5 rounded-2xl border border-slate-300">
                        <div>
                            <p className="font-semibold">Active Status</p>
                            <p className="text-sm opacity-80">
                                Enable or disable this jewelry
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={editJewelry.isActive}
                                onChange={(e) =>
                                    setEditJewelry({
                                        ...editJewelry,
                                        isActive: e.target.checked,
                                    })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-400 rounded-full peer-checked:bg-green-500 transition-all" />
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex 
  flex-col sm:flex-row
  items-stretch sm:items-center
  justify-center sm:justify-end
  gap-4 
  mt-8">
                        <button
                            onClick={handleUpdate}
                            className="self-center
    w-auto
    flex items-center justify-center gap-2
    bg-[#e2b82e]
    px-8 py-3
    rounded-full
    text-black
    font-semibold
    hover:scale-105
    shadow-lg
    transition-all duration-500
    cursor-pointer"
                        >
                            <FiSave />
                            Save
                        </button>

                        <button
                            onClick={() => setEditJewelry(null)}
                            className="self-center
    w-auto
    flex items-center justify-center gap-2
    bg-gray-200
    px-8 py-3
    rounded-full
    text-black
    hover:bg-gray-300
    transition-all duration-500
    cursor-pointer font-semibold"
                        >
                            <FiX />
                            Cancel
                        </button>

                    </div>
                </div>
            ) : (
                <>
                    {/* ================= LIST MODE ================= */}
                    <h2 className="text-2xl font-bold mb-6 text-[#e2b82e] text-center">
                        All Jewelry
                    </h2>
                    <div className="w-full py-4 px-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
          px-6 py-2
          rounded-full
          border-2
          text-sm md:text-base
          font-semibold
          tracking-wide
          transition-all duration-300 cursor-pointer
          ${activeCategory === cat
                                            ? "bg-[#e2b82e] text-black border-[#e2b82e]"
                                            : "text-[#e2b82e] border-[#e2b82e] hover:bg-[#e2b82e]/10"
                                        }
        `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredJewelry.map((item) => (
                            <div
                                key={item._id}
                                className="bg-[#3A0D57]
    rounded-2xl
    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    p-3
    flex flex-col
    transition-all duration-300
    hover:-translate-y-1"
                            >
                                {/* IMAGE FRAME */}
                                <div className="">
                                    <div className="rounded-2xl overflow-hidden aspect-3/4">
                                        <LazyLoadImage
                                            effect="blur"
                                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                                            src={getImageUrl(item.images?.[0]?.url)}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="mt-5 flex-1">
                                    <h3 className="text-xl font-bold text-yellow-400">
                                        {item.name}
                                    </h3>

                                    <p
                                        className={`mt-2 font-semibold ${item.isActive ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {item.isActive ? "Active" : "Inactive"}
                                    </p>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() =>
                                            setEditJewelry({
                                                ...item,
                                                newImages: null,
                                                newVideo: null,
                                            })
                                        }
                                        className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-500 cursor-pointer"
                                    >
                                        <FiEdit />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-500 cursor-pointer"
                                    >
                                        <FiTrash2 />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}
        </div>
    );
};

export default JewelryList;
