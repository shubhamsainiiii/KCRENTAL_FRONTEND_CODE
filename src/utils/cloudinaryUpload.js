// export const uploadToCloudinary = async (file, type = "image") => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "garments_preset"); // 👈 Cloudinary preset
//     formData.append("folder", "garments");

//     const cloudName = "ds4t2aywj"; // 👈 apna cloud name

//     const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
//         {
//             method: "POST",
//             body: formData,
//         }
//     );

//     if (!res.ok) {
//         throw new Error("Cloudinary upload failed");
//     }

//     return await res.json();
// };


export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "garments_preset");

    const cloudName = "ds4t2aywj";

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    if (!res.ok) {
        console.error("Cloudinary Error:", data);
        throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data;
};
