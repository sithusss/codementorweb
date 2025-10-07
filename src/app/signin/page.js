"use client";
import { useState } from "react";
import {useRouter} from "next/navigation";

export default function SigninPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if(res.ok){
            setMessage("Login successfully ✅");
            setTimeout(() => router.push("/"), 800);

        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
                    Login
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
