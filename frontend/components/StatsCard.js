export default function StatsCard({ title, value, icon }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className="text-4xl text-accent">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm uppercase">{title}</p>
          <p className="text-2xl font-semibold text-primary">{value}</p>
        </div>
      </div>
    );
  }