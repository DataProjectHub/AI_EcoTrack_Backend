// frontend/components/Hero.js
export default function Hero() {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradientStart to-gradientEnd text-white">
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            Sustainable Waste Classification
          </h1>
          <p className="text-xl mb-8 drop-shadow-md">
            AI EcoTrack uses cutting-edge MobileNetV2 AI to accurately classify waste and estimate your CO₂ savings in real time.
          </p>
          <a
            href="/upload"
            className="inline-block bg-accent text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-opacity-90 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    )
  }
  