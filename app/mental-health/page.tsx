'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for mental health articles
const mentalHealthArticles = [
  {
    title: 'Stress Management for Longevity',
    excerpt: 'How chronic stress accelerates aging and evidence-based techniques to manage it.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 26, 2025',
    slug: 'stress-management-longevity'
  },
  {
    title: 'Sleep Optimization: The Ultimate Guide',
    excerpt: 'Comprehensive strategies to improve sleep quality and its impact on healthspan.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 21, 2025',
    slug: 'sleep-optimization-guide'
  },
  {
    title: 'Cognitive Training Approaches',
    excerpt: 'Evidence-based methods to maintain cognitive function as you age.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 16, 2025',
    slug: 'cognitive-training-approaches'
  },
  {
    title: 'Social Connection and Longevity',
    excerpt: 'Why relationships might be the most important longevity intervention.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 11, 2025',
    slug: 'social-connection-longevity'
  },
  {
    title: 'Purpose and Meaning: Impact on Health',
    excerpt: 'How having purpose in life affects biological markers of aging.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 6, 2025',
    slug: 'purpose-meaning-health-impact'
  },
  {
    title: 'Meditation and Brain Aging',
    excerpt: "The science behind meditation's effects on brain health and cognitive decline.",
    imageSrc: '/placeholder-image.jpg',
    date: 'April 1, 2025',
    slug: 'meditation-brain-aging'
  }
];

export default function MentalHealthPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mental & Cognitive Health
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Optimize brain health and cognitive function for a longer, more fulfilling life
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
                {mentalHealthArticles.map((article, index) => (
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
                        href={`/mental-health/${article.slug}`}
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
                    <Link href="/mental-health/stress-management" className="text-blue-600 hover:text-blue-800">
                      Stress Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/mental-health/sleep" className="text-blue-600 hover:text-blue-800">
                      Sleep Optimization
                    </Link>
                  </li>
                  <li>
                    <Link href="/mental-health/cognitive-training" className="text-blue-600 hover:text-blue-800">
                      Cognitive Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/mental-health/social-connection" className="text-blue-600 hover:text-blue-800">
                      Social Connection
                    </Link>
                  </li>
                  <li>
                    <Link href="/mental-health/purpose" className="text-blue-600 hover:text-blue-800">
                      Purpose & Meaning
                    </Link>
                  </li>
                  <li>
                    <Link href="/mental-health/meditation" className="text-blue-600 hover:text-blue-800">
                      Meditation & Mindfulness
                    </Link>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {mentalHealthArticles.slice(0, 3).map((article, index) => (
                    <li key={index}>
                      <Link href={`/mental-health/${article.slug}`} className="group">
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
