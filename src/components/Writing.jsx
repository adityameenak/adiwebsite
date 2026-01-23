import { writing } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Writing() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="writing" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Writing
          </h2>

          <p className="text-lg text-gray-600 mb-4">
            {writing.description}
          </p>

          <div className="flex items-center gap-4 mb-12">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              {writing.platform}
            </span>
            <span className="text-gray-500">
              {writing.readers} monthly readers
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {writing.articles.map((article, index) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium mb-4">
                  {article.tag}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <span className="text-sm text-gray-400">
                  {article.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
