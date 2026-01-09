// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import API from "./AdminApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ agar token hai to login page par aane hi mat do
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await API.post(
                "/admin/login",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            const { token } = res.data;
            localStorage.setItem("adminToken", token);

            navigate("/admin/dashboard", { replace: true });
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>

                {error && (
                    <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition disabled:opacity-60 text-sm"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

