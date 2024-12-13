'use client';

import { SyntheticEvent, useState, useEffect } from 'react';
import { BASE_URL } from '../../config';

type EditProductProps = {
  item: {
    id: string;
    name: string;
    jabatan?: string | null;
    status?: string | null;
    date: string;
    time?: string;
    description?: string;
  };
  onSuccess: () => void;
  endpoint: string;
  showTimeField?: boolean;
  showDescriptionField?: boolean;
  showJabatanField?: boolean;
  showStatusField?: boolean;
  jabatanLabel?: string;
  placeholders?: {
    name?: string;
    jabatan?: string;
  };
};

export default function EditProduct({
  item,
  onSuccess,
  endpoint,
  showTimeField = false,
  showDescriptionField = false,
  showJabatanField = false,
  showStatusField = false,
  jabatanLabel = 'Jabatan',
  placeholders = {},
}: EditProductProps) {
  const [name, setName] = useState(item.name || '');
  const [jabatan, setJabatan] = useState(item.jabatan || '');
  const [status, setStatus] = useState(item.status || 'Aktif');
  const [date, setDate] = useState(item.date || '');
  const [time, setTime] = useState(item.time || '');
  const [description, setDescription] = useState(item.description || '');
  const [isMutating, setIsMutating] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    const payload: Record<string, any> = {
      name,
      jabatan,
      status,
      date,
    };

    if (showTimeField) payload.time = time;
    if (showDescriptionField) payload.description = description;

    try {
      const res = await fetch(`${BASE_URL}/${endpoint}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Gagal memperbarui data');
      onSuccess();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <>
      {showModal && (
        <div
          className={`modal modal-open ${
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <div className={`modal-box ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold text-lg">Edit {item.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input input-bordered w-full ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  }`}
                  placeholder={placeholders.name || 'Nama Peserta'}
                />
              </div>

              {showJabatanField && (
                <div className="form-control">
                  <label className="label">{jabatanLabel}</label>
                  <input
                    type="text"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    className={`input input-bordered w-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                    }`}
                    placeholder={placeholders.jabatan || 'Jabatan'}
                  />
                </div>
              )}

              {showStatusField && (
                <div className="form-control">
                  <label className="label">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`select select-bordered w-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                    }`}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              )}

              <div className="form-control">
                <label className="label">Tanggal Pendaftaran</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`input input-bordered w-full ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  }`}
                />
              </div>

              {showTimeField && (
                <div className="form-control">
                  <label className="label">Waktu</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`select select-bordered w-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                    }`}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`textarea textarea-bordered w-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                    }`}
                    placeholder="Tambahkan deskripsi (opsional)"
                  />
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className={`btn ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`btn ${isDarkMode ? 'bg-blue-600 text-white' : 'btn-primary'}`}
                  disabled={isMutating}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
