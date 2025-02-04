'use client'
import axios from "axios";

import React, { useState } from "react";

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/src/app/api/register', formData)
        console.log(formData);

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Створити акаунт</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Ім'я користувача:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Електронна пошта:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-foreground text-white rounded-lg hover:bg-blue-600"
                >
                    Створити акаунт
                </button>
            </form>
        </div>
    );
}

export default SignUp;
