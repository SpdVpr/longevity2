'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Newsletter() {
  const t = useTranslations('home.newsletter');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call
    try {
      // In a real application, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-teal-light/20 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-dark">{t('title')}</h2>
        <p className="text-gray mb-8 max-w-2xl mx-auto">
          {t('description')}
        </p>

        {isSuccess ? (
          <div className="bg-mint/30 text-mint-dark p-4 rounded max-w-md mx-auto border border-mint">
            Thank you for subscribing! We've sent a confirmation email to your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                className="flex-grow px-4 py-2 rounded-lg border border-gray-light focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber hover:bg-amber/90 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : t('button')}
              </button>
            </div>

            {error && (
              <div className="text-red-500 mt-2 text-sm text-left">
                {error}
              </div>
            )}

            <p className="text-gray text-sm mt-4">
              {t('privacy')}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
