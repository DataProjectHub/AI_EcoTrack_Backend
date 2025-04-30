export default function Result() {
  const example = { label: 'Plastic', confidence: 0.92, co2: '0.15 kg' };
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow flex flex-col md:flex-row gap-6">
        <img src="/placeholder.jpg" alt="Uploaded" className="max-h-48 rounded" />
        <div>
          <p className="text-xl font-semibold text-gray-800">Type: {example.label}</p>
          <p className="mt-2 text-gray-600">Confidence: {(example.confidence * 100).toFixed(1)}%</p>
          <p className="mt-2 text-gray-600">Estimated CO₂ Saved: {example.co2}</p>
        </div>
      </main>
    </div>
  );
}