'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for nutrition articles
const nutritionArticles = [
  {
    title: 'The Science of Intermittent Fasting',
    excerpt: 'Discover how intermittent fasting can improve longevity markers and metabolic health.',
    imageSrc: '/placeholder-image.jpg',
    date: 'May 1, 2025',
    slug: 'science-of-intermittent-fasting'
  },
  {
    title: 'Mediterranean Diet and Longevity',
    excerpt: 'Explore the evidence behind the Mediterranean diet and its impact on lifespan.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 20, 2025',
    slug: 'mediterranean-diet-longevity'
  },
  {
    title: 'Caloric Restriction: Benefits and Risks',
    excerpt: 'A comprehensive look at caloric restriction as a longevity intervention.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 15, 2025',
    slug: 'caloric-restriction-benefits-risks'
  },
  {
    title: 'Blue Zones: Dietary Patterns of the Longest-Lived',
    excerpt: 'What can we learn from the diets of people in regions with exceptional longevity?',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 10, 2025',
    slug: 'blue-zones-dietary-patterns'
  },
  {
    title: 'Polyphenols and Aging: Food Sources and Benefits',
    excerpt: 'How plant compounds can slow aging processes and improve health outcomes.',
    imageSrc: '/placeholder-image.jpg',
    date: 'April 5, 2025',
    slug: 'polyphenols-aging-food-sources'
  },
  {
    title: 'Protein Intake for Healthy Aging',
    excerpt: 'Optimal protein strategies to maintain muscle mass and function as you age.',
    imageSrc: '/placeholder-image.jpg',
    date: 'March 30, 2025',
    slug: 'protein-intake-healthy-aging'
  }
];

export default function NutritionPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nutrition for Longevity
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover evidence-based dietary patterns and foods that promote longevity and healthspan
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
                {nutritionArticles.map((article, index) => (
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
                        href={`/nutrition/${article.slug}`}
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
                    <Link href="/nutrition/intermittent-fasting" className="text-blue-600 hover:text-blue-800">
                      Intermittent Fasting
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutrition/mediterranean-diet" className="text-blue-600 hover:text-blue-800">
                      Mediterranean Diet
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutrition/caloric-restriction" className="text-blue-600 hover:text-blue-800">
                      Caloric Restriction
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutrition/blue-zones" className="text-blue-600 hover:text-blue-800">
                      Blue Zones
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutrition/superfoods" className="text-blue-600 hover:text-blue-800">
                      Superfoods
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutrition/protein" className="text-blue-600 hover:text-blue-800">
                      Protein Intake
                    </Link>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mt-8 mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {nutritionArticles.slice(0, 3).map((article, index) => (
                    <li key={index}>
                      <Link href={`/nutrition/${article.slug}`} className="group">
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
