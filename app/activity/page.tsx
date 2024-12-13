'use client';

import { useEffect, useState } from 'react';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import DeleteProduct from '../components/DeleteProduct';
import { BASE_URL } from '../../config';
import {
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/solid";

// Definisi tipe data untuk setiap item
type Kegiatan = {
  id: string;
  name: string;
  jabatan?: string; // Nullable
  status?: string; // Nullable
  date: string;
  time?: string; // Nullable
  description?: string; // Nullable
};

export default function KegiatanPage() {
  const [data, setData] = useState<Kegiatan[]>([]); // Data Kegiatan
  const [selectedItem, setSelectedItem] = useState<Kegiatan | null>(null); // Item yang sedang di-edit
  const [darkMode, setDarkMode] = useState(false); // State untuk dark mode

  // Ambil status dark mode dari localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  // Ambil data dari API
  useEffect(() => {
    fetch(`${BASE_URL}/kegiatan`)
      .then((res) => res.json())
      .then((data: Kegiatan[]) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  // Fungsi untuk merefresh data setelah Add/Edit/Delete
  function refreshData() {
    fetch(`${BASE_URL}/kegiatan`)
      .then((res) => res.json())
      .then((data: Kegiatan[]) => setData(data))
      .catch((err) => console.error(err));
  }

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Tombol Toggle Dark Mode */}
      <div className="absolute top-4 right-4">
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
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Kegiatan</h1>

      {/* Tombol Tambah Kegiatan */}
      <AddProduct
        onSuccess={refreshData}
        endpoint="kegiatan"
        showJabatanField={false}
        showStatusField={false}
        showTimeField={true} // Menampilkan waktu
        showDescriptionField={true} // Menampilkan deskripsi
        placeholders={{
          name: 'Nama Kegiatan',
          time: 'Waktu Kegiatan',
          description: 'Deskripsi Kegiatan',
        }}
      />

      {/* Daftar Kegiatan */}
      <div className="mt-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between border p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-800'
              }`}
          >
            <div>
              <p className="font-bold">{item.name}</p>
              {item.date && <p className="text-sm">Tanggal: {formatDate(item.date)}</p>}
              {item.time && <p className="text-sm">Waktu: {item.time}</p>}
              {item.description && <p className="text-sm">Deskripsi: {item.description}</p>}
            </div>
            <div className="flex space-x-4">
              <button
                className={`btn btn-primary ${darkMode ? 'text-white' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                Edit
              </button>
              <DeleteProduct id={item.id} onSuccess={refreshData} endpoint="kegiatan" />
            </div>
          </div>
        ))}
      </div>

      {/* Form Edit Kegiatan */}
      {selectedItem && (
        <EditProduct
          item={{
            ...selectedItem,
            time: selectedItem.time || '', // Pastikan nilai tidak undefined
            description: selectedItem.description || '', // Pastikan nilai tidak undefined
          }}
          onSuccess={() => {
            refreshData();
            setSelectedItem(null); // Reset selectedItem setelah berhasil
          }}
          endpoint="kegiatan" // Kirim endpoint Kegiatan ke EditProduct
          showJabatanField={false}
          showStatusField={false}
          showTimeField={true} // Menampilkan waktu
          showDescriptionField={true} // Menampilkan deskripsi
          placeholders={{
            name: 'Nama Kegiatan',
            time: 'Waktu Kegiatan',
            description: 'Deskripsi Kegiatan',
          }}
        />
      )}
    </div>
  );
}
