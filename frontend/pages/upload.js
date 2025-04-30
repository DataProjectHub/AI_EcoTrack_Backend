import { useState } from 'react';

export default function Upload() {
  const [preview, setPreview] = useState(null);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    // TODO: post file to /api/classify
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <main className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
        <div className="border-2 border-dashed border-gray-300 p-6 text-center">
          <input type="file" accept="image/*" onChange={handleFile} />
          {preview && (
            <img src={preview} alt="Preview" className="mt-4 mx-auto max-h-64" />
          )}
        </div>
      </main>
    </div>
  );
}
