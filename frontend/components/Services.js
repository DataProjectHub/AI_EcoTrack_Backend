// frontend/components/Services.js
const services = [
    { title: 'AI Classification', desc: 'Instantly identify waste type with high accuracy.' },
    { title: 'Carbon Insights',   desc: 'Calculate your positive environmental impact.' },
    { title: 'History Tracking',  desc: 'Review past scans to monitor progress.' }
  ]
  
  export default function Services() {
    return (
      <section className="py-20 bg-bgLight">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What We Do
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {services.map((s,i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow-lg transform hover:-translate-y-2 transition"
              >
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {s.title}
                </h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  