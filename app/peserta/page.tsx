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
type Siswa = {
  id: string;
  name: string;
  jabatan: string | null; // Nullable
  status: string | null; // Nullable
  date: string;
};

export default function SiswaPage() {
  const [data, setData] = useState<Siswa[]>([]); // Data Siswa
  const [selectedItem, setSelectedItem] = useState<Siswa | null>(null); // Item yang sedang di-edit
  const [darkMode, setDarkMode] = useState(false); // Status dark mode

  // Ambil status dark mode dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Simpan status dark mode ke localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  // Ambil data dari API
  useEffect(() => {
    fetch(`${BASE_URL}/peserta`)
      .then((res) => res.json())
      .then((data: Siswa[]) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  // Fungsi untuk merefresh data setelah Add/Edit/Delete
  function refreshData() {
    fetch(`${BASE_URL}/peserta`)
      .then((res) => res.json())
      .then((data: Siswa[]) => setData(data))
      .catch((err) => console.error(err));
  }

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

      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Siswa</h1>

      {/* Tombol Tambah Siswa */}
      <AddProduct
        onSuccess={refreshData}
        endpoint="peserta"
        showJabatanField={true}
        showStatusField={true}
        showTimeField={false}
        showDescriptionField={false}
        placeholders={{
          name: 'Nama Siswa',
          jabatan: 'Kelas',
        }}
        jabatanLabel="Kelas"
      />

      {/* Daftar Siswa */}
      <div className="mt-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between border p-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.jabatan || 'N/A'}</p>
            </div>
            <div className="flex space-x-4">
              <button
                className={`btn ${darkMode ? 'btn-dark' : 'btn-primary'}`}
                onClick={() => setSelectedItem(item)}
              >
                Edit
              </button>
              <DeleteProduct id={item.id} onSuccess={refreshData} endpoint="peserta" />
            </div>
          </div>
        ))}
      </div>

      {/* Form Edit Siswa */}
      {selectedItem && (
        <EditProduct
          item={{
            ...selectedItem,
            jabatan: selectedItem.jabatan || '',
            status: selectedItem.status || 'Aktif',
          }}
          onSuccess={() => {
            refreshData();
            setSelectedItem(null);
          }}
          endpoint="peserta"
          showStatusField={true}
          showJabatanField={true}
          showTimeField={false}
          showDescriptionField={false}
          jabatanLabel="Kelas"
          placeholders={{
            name: 'Nama Siswa',
            jabatan: 'Kelas',
          }}
        />
      )}
    </div>
  );
}
