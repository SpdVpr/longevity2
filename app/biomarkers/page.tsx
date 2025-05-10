'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for biomarkers articles
const biomarkersArticles = [
  {
    title: 'Essential Blood Biomarkers for Longevity',
    excerpt: 'The key blood markers to track for optimal health and longevity.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 27, 2025',
    slug: 'essential-blood-biomarkers-longevity'
  },
  {
    title: 'Understanding Aging Clocks',
    excerpt: 'How epigenetic and other aging clocks work and what they tell us about biological age.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 23, 2025',
    slug: 'understanding-aging-clocks'
  },
  {
    title: 'Wearable Technology for Health Tracking',
    excerpt: 'The best wearables and what metrics actually matter for longevity.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 19, 2025',
    slug: 'wearable-technology-health-tracking'
  },
  {
    title: 'Self-Experimentation: A Methodological Guide',
    excerpt: 'How to conduct personal experiments to optimize your health interventions.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 14, 2025',
    slug: 'self-experimentation-methodological-guide'
  },
  {
    title: 'Interpreting Your Test Results',
    excerpt: 'How to make sense of complex biomarker data and what actions to take.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 9, 2025',
    slug: 'interpreting-test-results'
  },
  {
    title: 'Inflammation Markers and Aging',
    excerpt: 'The connection between chronic inflammation and accelerated aging.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 4, 2025',
    slug: 'inflammation-markers-aging'
  }
];

export default function BiomarkersPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Biomarkers & Tracking
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Measure and monitor your biological age and health metrics with precision
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
                {biomarkersArticles.map((article, index) => (
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
                        href={`/biomarkers/${article.slug}`}
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
                    <Link href="/biomarkers/blood-tests" className="text-blue-600 hover:text-blue-800">
                      Blood Biomarkers
                    </Link>
                  </li>
                  <li>
                    <Link href="/biomarkers/aging-clocks" className="text-blue-600 hover:text-blue-800">
                      Aging Clocks
                    </Link>
                  </li>
                  <li>
                    <Link href="/biomarkers/wearables" className="text-blue-600 hover:text-blue-800">
                      Wearable Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/biomarkers/self-experimentation" className="text-blue-600 hover:text-blue-800">
                      Self-Experimentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/biomarkers/interpretation" className="text-blue-600 hover:text-blue-800">
                      Test Interpretation
                    </Link>
                  </li>
                  <li>
                    <Link href="/biomarkers/inflammation" className="text-blue-600 hover:text-blue-800">
                      Inflammation Markers
                    </Link>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mt-8 mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {biomarkersArticles.slice(0, 3).map((article, index) => (
                    <li key={index}>
                      <Link href={`/biomarkers/${article.slug}`} className="group">
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
