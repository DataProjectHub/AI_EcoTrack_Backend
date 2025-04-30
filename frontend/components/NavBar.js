// frontend/components/NavBar.js
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-secondary to-primary text-white px-8 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="AI EcoTrack Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-4xl font-bold font-serif">AI EcoTrack</span>
        </Link>
        <div className="space-x-8 text-lg">
          {['Home', 'Upload', 'History', 'About'].map((label) => (
            <Link
              key={label}
              href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
              className="hover:text-accent transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
