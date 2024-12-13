'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';

type AddProductProps = {
  onSuccess: () => void;
  endpoint?: string; // Tambahkan endpoint untuk API yang dinamis
  showTimeField?: boolean; // Kontrol apakah field waktu ditampilkan
  showDescriptionField?: boolean; // Kontrol apakah field deskripsi ditampilkan
  showJabatanField?: boolean; // Kontrol apakah field jabatan ditampilkan
  showStatusField?: boolean; // Kontrol apakah field status ditampilkan
  placeholders?: { // Placeholder dinamis
    name?: string;
    jabatan?: string;
  };
  jabatanLabel?: string; // Label untuk jabatan, bisa diubah sesuai kebutuhan
};

export default function AddProduct({
  onSuccess,
  endpoint = 'peserta',
  showTimeField = true,
  showDescriptionField = true,
  showJabatanField = true,
  showStatusField = true,
  placeholders = {},
  jabatanLabel = 'Jabatan',
}: AddProductProps) {
  const [name, setName] = useState('');
  const [jabatan, setJabatan] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State untuk dark mode

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPeserta = {
      name,
      jabatan: jabatan || undefined,
      status: status || undefined,
      date,
      time: time || undefined,
      description: description || undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPeserta),
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan peserta.');
      }

      onSuccess();
      setShowModal(false); // Tutup modal
      setName('');
      setJabatan(null);
      setStatus(null);
      setDate('');
      setTime(null);
      setDescription(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button
        className={`btn ${darkMode ? 'bg-blue-600 text-white' : 'btn-primary'}`}
        onClick={() => setShowModal(true)}
      >
        Tambah
      </button>

      {showModal && (
        <div
          className={`modal modal-open ${darkMode ? 'bg-gray-800 bg-opacity-75' : ''
            }`}
        >
          <div
            className={`modal-box ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
              }`}
          >
            <h3 className="font-bold text-lg">Tambah Peserta</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">Nama</label>
                <input
                  type="text"
                  className={`input w-full input-bordered ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={placeholders.name || 'Nama Peserta'}
                  required
                />
              </div>

              {showJabatanField && (
                <div className="form-control">
                  <label className="label">{jabatanLabel}</label>
                  <input
                    type="text"
                    className={`input w-full input-bordered ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                      }`}
                    value={jabatan || ''}
                    onChange={(e) => setJabatan(e.target.value || null)}
                    placeholder={placeholders.jabatan || 'Jabatan'}
                  />
                </div>
              )}

              {showStatusField && (
                <div className="form-control">
                  <label className="label">Status</label>
                  <select
                    className={`select w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                      }`}
                    value={status || ''}
                    onChange={(e) => setStatus(e.target.value || null)}
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>

                </div>
              )}

              <div className="form-control">
                <label className="label">Tanggal Pendaftaran</label>
                <input
                  type="date"
                  className={`input w-full input-bordered ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {showTimeField && (
                <div className="form-control">
                  <label className="label">Waktu</label>
                  <select
                    className={`select w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                      }`}
                    value={time || ''}
                    onChange={(e) => setTime(e.target.value || null)}
                  >
                    <option value="">-- Pilih Waktu --</option>
                    <option value="Siang">Siang</option>
                    <option value="Malam">Malam</option>
                    <option value="Sore">Sore</option>
                  </select>
                </div>
              )}

              {showDescriptionField && (
                <div className="form-control">
                  <label className="label">Deskripsi</label>
                  <textarea
                    className={`textarea textarea-bordered w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                      }`}
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value || null)}
                    placeholder="Tambahkan deskripsi (opsional)"
                  />

                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className={`btn ${darkMode ? 'bg-gray-700 text-white' : ''}`}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`btn ${darkMode ? 'bg-blue-600 text-white' : 'btn-primary'}`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
