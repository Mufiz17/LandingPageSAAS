'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';

export default function DeleteProduct({
  id,
  onSuccess,
  endpoint,
}: {
  id: string;
  onSuccess: () => void;
  endpoint: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk menampilkan modal konfirmasi
  const [darkMode, setDarkMode] = useState(false); // State untuk dark mode

  // Ambil status dark mode dari localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  async function handleDelete() {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus data');
      onSuccess(); // Callback untuk refresh data
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`btn ${darkMode ? 'bg-red-600 text-white' : 'btn-error'}`}
      >
        Delete
      </button>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex justify-center items-center ${
            darkMode ? 'bg-gray-800 bg-opacity-75' : 'bg-black bg-opacity-50'
          }`}
        >
          <div
            className={`p-6 rounded-md space-y-4 ${
              darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h2 className="text-lg font-bold">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`btn ${darkMode ? 'bg-gray-700 text-white' : 'btn-secondary'}`}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setIsModalOpen(false); // Tutup modal setelah penghapusan
                }}
                className={`btn ${darkMode ? 'bg-red-600 text-white' : 'btn-primary'}`}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
