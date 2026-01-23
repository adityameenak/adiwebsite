import { experience } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Experience() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Experience
          </h2>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-purple-200 transition-all duration-300"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {job.role}
                    </h3>
                    <p className="text-lg text-purple-600 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-gray-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
