import { personalInfo } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold mb-1">{personalInfo.fullName}</p>
            <p className="text-gray-400 text-sm">{personalInfo.location}</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
