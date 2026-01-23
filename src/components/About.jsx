import { about, education } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            About
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.paragraph}
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Education
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {education.school}
                </p>
                <p className="text-gray-600">
                  {education.degree} in {education.major}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2">
                  <span className="font-medium text-purple-600">
                    GPA: {education.gpa}
                  </span>
                  <span>•</span>
                  <span>Expected {education.graduationDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
