export default function History() {
    const entries = [
      { date: '2025-04-27', type: 'Glass', co2: '0.12 kg' },
    ];
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <main className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scan History</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">CO₂ Saved</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e,i)=>(
                <tr key={i} className="border-b hover:bg-gray-100">
                  <td className="py-2">{e.date}</td>
                  <td className="py-2">{e.type}</td>
                  <td className="py-2">{e.co2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  }