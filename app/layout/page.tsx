"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Mengambil status dark mode dari localStorage saat pertama kali komponen dimuat
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Toggle dan simpan status dark mode ke localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString()); // Simpan status ke localStorage
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      {/* Header dengan Dark Mode Toggle dan Login Button */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="relative w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors flex items-center justify-center shadow-lg"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-gray-300" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-300" />
          )}
        </button>
        <Link
          href="/login"
          className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
            darkMode ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-500 text-white hover:bg-blue-400"
          }`}
        >
          Login
        </Link>
      </div>

      {/* Content */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">Aplikasi Manajemen Kegiatan</h1>
        <p className="mt-4 text-lg">Solusi lengkap untuk mengelola kegiatan sekolah dan asrama dengan mudah.</p>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Rincian Kegiatan */}
            <Link href="/activity">
              <div
                className={`shadow-md rounded-lg overflow-hidden transition hover:shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-6 flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${darkMode ? "bg-green-700" : "bg-green-100"}`}>
                    <ClipboardDocumentCheckIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Rincian Kegiatan</h3>
                    <p className="mt-2">
                      Tambahkan rincian kegiatan seperti deskripsi lengkap, durasi, dan pengelola.
                    </p>
                  </div>
                </div>
                <div className={`p-4 text-right ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>Tambah Rincian</div>
              </div>
            </Link>

            {/* Card 2: Daftar Peserta */}
            <Link href="/peserta">
              <div
                className={`shadow-md rounded-lg overflow-hidden transition hover:shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-6 flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${darkMode ? "bg-yellow-700" : "bg-yellow-100"}`}>
                    <UsersIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Daftar Peserta</h3>
                    <p className="mt-2">
                      Kelola peserta kegiatan dan simpan data peserta secara terorganisir.
                    </p>
                  </div>
                </div>
                <div className={`p-4 text-right ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>Lihat Peserta</div>
              </div>
            </Link>

            {/* Card 3: Daftar Guru */}
            <Link href="/guru">
              <div
                className={`shadow-md rounded-lg overflow-hidden transition hover:shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-6 flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${darkMode ? "bg-purple-700" : "bg-purple-100"}`}>
                    <AcademicCapIcon className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Daftar Guru</h3>
                    <p className="mt-2">
                      Kelola data guru seperti informasi kontak, jadwal, dan pengelolaan tugas.
                    </p>
                  </div>
                </div>
                <div className={`p-4 text-right ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>Lihat Guru</div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
