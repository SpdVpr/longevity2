'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for fitness articles
const fitnessArticles = [
  {
    title: 'Zone 2 Training for Longevity',
    excerpt: 'Learn how low-intensity exercise can significantly improve your healthspan.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 28, 2025',
    slug: 'zone-2-training-longevity'
  },
  {
    title: 'Resistance Training After 50',
    excerpt: 'Why strength training becomes even more important as you age.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 22, 2025',
    slug: 'resistance-training-after-50'
  },
  {
    title: 'Mobility Work for Healthy Aging',
    excerpt: 'Maintain flexibility and joint health with these evidence-based approaches.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 18, 2025',
    slug: 'mobility-work-healthy-aging'
  },
  {
    title: 'Recovery Optimization Strategies',
    excerpt: 'How to maximize recovery for better performance and longevity.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 12, 2025',
    slug: 'recovery-optimization-strategies'
  },
  {
    title: 'Exercise Intensity and Longevity',
    excerpt: 'Finding the right balance between high and low-intensity training.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 8, 2025',
    slug: 'exercise-intensity-longevity'
  },
  {
    title: 'Cardiorespiratory Fitness and Lifespan',
    excerpt: 'The science behind VO2 max and its impact on mortality risk.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 2, 2025',
    slug: 'cardiorespiratory-fitness-lifespan'
  }
];

export default function FitnessPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Physical Activity & Fitness
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Exercise strategies to extend healthspan and lifespan based on the latest research
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
              
              <div className="space-y-8">
                {fitnessArticles.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                    <div className="relative h-64 md:h-auto md:w-1/3">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="text-gray-500 text-sm mb-2">{article.date}</div>
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <Link 
                        href={`/fitness/${article.slug}`}
                        className="text-blue-600 font-semibold hover:text-blue-800"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold mb-4">Topics</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/fitness/zone-2-training" className="text-blue-600 hover:text-blue-800">
                      Zone 2 Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/fitness/resistance-training" className="text-blue-600 hover:text-blue-800">
                      Resistance Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/fitness/mobility" className="text-blue-600 hover:text-blue-800">
                      Mobility & Flexibility
                    </Link>
                  </li>
                  <li>
                    <Link href="/fitness/recovery" className="text-blue-600 hover:text-blue-800">
                      Recovery Optimization
                    </Link>
                  </li>
                  <li>
                    <Link href="/fitness/cardio" className="text-blue-600 hover:text-blue-800">
                      Cardiovascular Health
                    </Link>
                  </li>
                  <li>
                    <Link href="/fitness/exercise-for-seniors" className="text-blue-600 hover:text-blue-800">
                      Exercise for Seniors
                    </Link>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mt-8 mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {fitnessArticles.slice(0, 3).map((article, index) => (
                    <li key={index}>
                      <Link href={`/fitness/${article.slug}`} className="group">
                        <h4 className="font-semibold group-hover:text-blue-600">{article.title}</h4>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
