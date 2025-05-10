'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Definice CSS animací
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

interface PyramidLevel {
  id: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  width: string;
}

export default function LongevityPyramid() {
  const t = useTranslations('longevityPyramid');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detekce mobilního zařízení
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Počáteční kontrola
    checkIfMobile();

    // Přidání event listeneru pro změnu velikosti okna
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Definice úrovní pyramidy - od základny (nejširší) po vrchol (nejužší)
  const pyramidLevels: PyramidLevel[] = [
    {
      id: 'nutrition',
      title: t('levels.nutrition.title'),
      description: t('levels.nutrition.description'),
      color: 'bg-gradient-to-r from-teal-500 to-teal-700',
      hoverColor: 'hover:from-teal-600 hover:to-teal-800',
      width: 'w-full'
    },
    {
      id: 'exercise',
      title: t('levels.exercise.title'),
      description: t('levels.exercise.description'),
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
      width: 'w-5/6'
    },
    {
      id: 'sleep',
      title: t('levels.sleep.title'),
      description: t('levels.sleep.description'),
      color: 'bg-gradient-to-r from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      width: 'w-4/6'
    },
    {
      id: 'stress',
      title: t('levels.stress.title'),
      description: t('levels.stress.description'),
      color: 'bg-gradient-to-r from-amber-500 to-amber-700',
      hoverColor: 'hover:from-amber-600 hover:to-amber-800',
      width: 'w-3/6'
    },
    {
      id: 'social',
      title: t('levels.social.title'),
      description: t('levels.social.description'),
      color: 'bg-gradient-to-r from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
      width: 'w-2/6'
    },
    {
      id: 'purpose',
      title: t('levels.purpose.title'),
      description: t('levels.purpose.description'),
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-800',
      width: 'w-1/6'
    }
  ];

  const handleLevelClick = (levelId: string) => {
    if (activeLevel === levelId) {
      setActiveLevel(null);
    } else {
      setActiveLevel(levelId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Vložení CSS animací */}
      <style dangerouslySetInnerHTML={{ __html: fadeInAnimation }} />

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-base sm:text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Pyramida */}
      <div className="flex flex-col items-center space-y-2 mb-8">
        {pyramidLevels.map((level, index) => (
          <div
            key={level.id}
            className={`${level.width} flex justify-center relative transition-all duration-500 ease-in-out`}
            style={{
              transform: `translateY(${activeLevel && activeLevel !== level.id ? '10px' : '0'})`,
              opacity: activeLevel && activeLevel !== level.id ? '0.7' : '1'
            }}
          >
            <button
              onClick={() => handleLevelClick(level.id)}
              className={`${level.color} ${level.hoverColor} text-white py-3 sm:py-4 px-4 sm:px-6 rounded-md w-full transition-all duration-300 transform ${activeLevel === level.id ? 'scale-105 shadow-lg' : ''} shadow-md`}
            >
              <span className="text-sm sm:text-base font-bold tracking-wide drop-shadow-sm">{level.title}</span>
            </button>
            {/* Indikátor aktivní úrovně */}
            {activeLevel === level.id && (
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Popis aktivní úrovně */}
      <div
        className={`bg-white border border-gray-300 p-6 rounded-lg shadow-md mb-8 transition-all duration-500 ease-in-out transform ${
          activeLevel
            ? 'opacity-100 max-h-96 translate-y-0'
            : 'opacity-0 max-h-0 overflow-hidden -translate-y-4'
        }`}
      >
        {activeLevel && (
          <>
            <div className="flex items-center mb-4" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div className={`w-6 h-6 rounded-full mr-3 ${pyramidLevels.find(level => level.id === activeLevel)?.color}`}></div>
              <h3 className="text-xl font-bold text-gray-900">
                {pyramidLevels.find(level => level.id === activeLevel)?.title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed" style={{ animation: 'fadeIn 0.5s ease-in-out 0.15s both' }}>
              {pyramidLevels.find(level => level.id === activeLevel)?.description}
            </p>
            <div className="mt-4 flex justify-end" style={{ animation: 'fadeIn 0.5s ease-in-out 0.3s both' }}>
              <button
                onClick={() => setActiveLevel(null)}
                className="text-sm text-teal-600 hover:text-teal-800 flex items-center transition-colors duration-200"
              >
                {t('close')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Legenda - skrytá na mobilních zařízeních, když je aktivní úroveň */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 ${activeLevel && isMobile ? 'hidden sm:grid' : ''}`}>
        {pyramidLevels.map((level) => (
          <div
            key={level.id}
            className={`flex items-center p-2 sm:p-3 rounded-md cursor-pointer transition-all duration-200 ${activeLevel === level.id ? 'bg-gray-200 shadow-md' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
            onClick={() => handleLevelClick(level.id)}
          >
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${level.color} mr-2 sm:mr-3 flex-shrink-0 shadow-sm`}></div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">{level.title}</span>
            {activeLevel === level.id && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 011.414-1.414l.793.793 2.293-2.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
