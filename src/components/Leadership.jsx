import { leadership } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Leadership() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="leadership" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Leadership
          </h2>

          <div className="space-y-8">
            {leadership.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.organization}
                  </h3>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-4">
                  {item.roles.map((role, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">
                        {role.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
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
