'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for supplements articles
const supplementsArticles = [
  {
    title: 'Understanding NAD+ and Aging',
    excerpt: 'Explore the role of NAD+ in cellular aging and potential supplementation strategies.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 25, 2025',
    slug: 'understanding-nad-aging'
  },
  {
    title: 'The Science of Resveratrol',
    excerpt: 'What does the research actually say about this popular longevity supplement?',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 20, 2025',
    slug: 'science-of-resveratrol'
  },
  {
    title: 'Metformin: Anti-Aging Drug?',
    excerpt: 'Examining the evidence for metformin as a longevity intervention.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 15, 2025',
    slug: 'metformin-anti-aging-drug'
  },
  {
    title: 'Omega-3 Fatty Acids and Inflammation',
    excerpt: 'How omega-3 supplementation affects inflammatory markers and aging.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 10, 2025',
    slug: 'omega-3-inflammation'
  },
  {
    title: 'Vitamin D: Optimal Levels for Longevity',
    excerpt: 'What the research says about vitamin D supplementation and dosage.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 5, 2025',
    slug: 'vitamin-d-optimal-levels'
  },
  {
    title: 'Emerging Peptides for Longevity',
    excerpt: 'An overview of peptide therapies being researched for anti-aging effects.',
    imageSrc: '/placeholder-image.jpg',
    date: 'March 30, 2025',
    slug: 'emerging-peptides-longevity'
  }
];

export default function SupplementsPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Supplements & Interventions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Evidence-based supplements and therapies to support healthy aging
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
                {supplementsArticles.map((article, index) => (
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
                        href={`/supplements/${article.slug}`}
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
                    <Link href="/supplements/nad" className="text-blue-600 hover:text-blue-800">
                      NAD+ Boosters
                    </Link>
                  </li>
                  <li>
                    <Link href="/supplements/antioxidants" className="text-blue-600 hover:text-blue-800">
                      Antioxidants
                    </Link>
                  </li>
                  <li>
                    <Link href="/supplements/medications" className="text-blue-600 hover:text-blue-800">
                      Prescription Medications
                    </Link>
                  </li>
                  <li>
                    <Link href="/supplements/essential-nutrients" className="text-blue-600 hover:text-blue-800">
                      Essential Nutrients
                    </Link>
                  </li>
                  <li>
                    <Link href="/supplements/peptides" className="text-blue-600 hover:text-blue-800">
                      Peptides
                    </Link>
                  </li>
                  <li>
                    <Link href="/supplements/cost-effectiveness" className="text-blue-600 hover:text-blue-800">
                      Cost-Effectiveness
                    </Link>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mt-8 mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {supplementsArticles.slice(0, 3).map((article, index) => (
                    <li key={index}>
                      <Link href={`/supplements/${article.slug}`} className="group">
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
