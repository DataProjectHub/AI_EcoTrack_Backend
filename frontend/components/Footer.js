export default function Footer() {
    return (
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} AI EcoTrack. Developed for Zayed Sustainability Challenge.
        </div>
      </footer>
    );
  }