    "use client";

    import LoginFrm from "../components/Login";
    import { useState, useEffect } from "react";
    import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
    import { useRouter } from "next/navigation";

    export default function AuthPg() {
        const [darkMode, setDarkMode] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const savedDarkMode = localStorage.getItem("darkMode");
            if (savedDarkMode === "true") {
                setDarkMode(true);
            }
        }, []);

        const toggleDarkMode = () => {
            setDarkMode((prevMode) => {
                const newMode = !prevMode;
                localStorage.setItem("darkMode", newMode.toString());
                return newMode;
            });
        };

        // Fungsi untuk menangani login
        const handleLogin = (username: string, password: string) => {
            if (username === "John Doe" && password === "admin123") {
                router.push("http://localhost:3000/admin");
            } else {
                alert("Username atau password salah!");
            }
        };

        return (
            <main
                className={`w-full h-screen flex justify-center items-center transition-colors duration-300 ${
                    darkMode ? "bg-[#0F172A]" : "bg-gray-100"
                }`}
            >
                <div className="absolute top-4 right-4">
                    <button
                        onClick={toggleDarkMode}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors shadow-lg"
                    >
                        {darkMode ? (
                            <SunIcon className="h-6 w-6 text-gray-300" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-gray-300" />
                        )}
                    </button>
                </div>

                <div className="flex w-full max-w-5xl h-[80%] rounded-lg shadow-lg">
                    <aside className="relative w-1/2 h-full bg-cover bg-center rounded-l-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1D3557] to-[#2E4053] opacity-90 rounded-l-lg"></div>
                        <div className="relative w-full h-full flex justify-center items-center text-center px-4">
                            <h1 className="text-3xl font-bold text-white uppercase tracking-wide leading-relaxed">
                                Manajemen Kegiatan <br />
                                Sekolah
                            </h1>
                        </div>
                    </aside>

                    <aside
                        className={`w-1/2 flex flex-col justify-center items-center transition-colors duration-300 ${
                            darkMode ? "bg-[#1A202C]" : "bg-gray-50"
                        } px-12 py-16 rounded-r-lg shadow-lg`}
                    >
                        <div className="w-full">
                            <LoginFrm darkMode={darkMode} onLogin={handleLogin} />
                        </div>
                    </aside>
                </div>
            </main>
        );
    }
