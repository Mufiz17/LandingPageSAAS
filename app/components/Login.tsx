import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFrmProps {
    darkMode: boolean;
}

const LoginFrm = ({ darkMode }: LoginFrmProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Mencegah reload halaman
        setError(""); // Reset pesan error

        // Validasi login
        if (username === "John Doe") {
            if (password === "admin123") {
                // Login berhasil, arahkan ke /dashboard
                router.push("http://localhost:3000/admin");
            } else {
                // Password salah
                setError("Password yang Anda masukkan salah!");
            }
        } else {
            // Username salah
            setError("Username atau password yang Anda masukkan salah!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`p-6 max-w-md mx-auto shadow-md rounded-lg ${
                darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
        >
            {/* Judul Form */}
            <h2
                className={`text-2xl font-medium mb-4 text-center ${
                    darkMode ? "text-gray-200" : "text-darkBlue"
                }`}
            >
                Login
            </h2>

            {/* Error Message */}
            {error && (
                <p
                    className="text-sm text-red-500 mb-4 text-center"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {/* Input Username */}
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-darkBlue"
                    }`}
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full border-b-2 bg-transparent outline-none px-3 py-2 ${
                        darkMode
                            ? "border-gray-600 text-gray-200"
                            : "border-darkBlue text-gray-800"
                    }`}
                    placeholder="Enter your username"
                />
            </div>

            {/* Input Password */}
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-darkBlue"
                    }`}
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border-b-2 bg-transparent outline-none px-3 py-2 ${
                        darkMode
                            ? "border-gray-600 text-gray-200"
                            : "border-darkBlue text-gray-800"
                    }`}
                    placeholder="Enter your password"
                />
            </div>

            {/* Tombol Submit */}
            <button
                type="submit"
                className={`w-full py-2 font-medium rounded ${
                    darkMode
                        ? "bg-slate-700 text-gray-200 hover:bg-gray-700"
                        : "bg-sky-950 text-white hover:bg-opacity-90"
                }`}
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginFrm;
