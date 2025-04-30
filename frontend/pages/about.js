// frontend/pages/about.js
export default function About() {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <main className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            About AI EcoTrack
          </h2>
          <p className="text-gray-700 mb-6">
            AI EcoTrack leverages a MobileNetV2-powered AI model to accurately classify
            different types of waste from a single image and instantly estimate your
            CO₂ savings. Our mission is to make sustainable disposal as effortless and
            engaging as possible.
          </p>
  
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Key Features (Web & Mobile)
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Image Upload & Classification:</strong> Simply snap or upload
              a photo of your waste, and our AI returns the waste category with
              confidence scores.
            </li>
            <li>
              <strong>CO₂ Savings Estimate:</strong> Get real-time feedback on how
              much CO₂ you’re saving by disposing correctly.
            </li>
            <li>
              <strong>Scan History:</strong> Review past classifications and track
              your sustainability progress over time.
            </li>
            <li>
              <strong>PWA Install & Offline Support:</strong> Add AI EcoTrack to your
              home screen and keep using it even when you’re offline.
            </li>
            <li>
              <strong>Future Push Reminders:</strong> (Coming soon) Receive weekly
              nudges to keep you engaged and on track with eco-friendly habits.
            </li>
          </ul>
        </main>
      </div>
    );
  }
  