export const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("https")) {
        return url;
    }
    const base = import.meta.env.VITE_API_URL || "http://localhost:8080";
    // Handle local paths (replace backslashes with forward slashes)
    const cleanPath = url.replace(/\\/g, "/");
    return `${base}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;
};
