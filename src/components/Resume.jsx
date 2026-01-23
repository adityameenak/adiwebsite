import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Resume() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="resume" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Resume
          </h2>

          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="aspect-[8.5/11] bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500">PDF Viewer Placeholder</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/resume.pdf"
                download
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all text-center"
              >
                Download Resume
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all text-center"
              >
                View Full Screen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
