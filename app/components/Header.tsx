'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import SearchBar from './SearchBar';
import { FaHome, FaUtensils, FaDumbbell, FaBrain, FaChartLine, FaTablets, FaTools, FaUser, FaSignInAlt, FaUserPlus, FaBars, FaSignOutAlt, FaHistory } from 'react-icons/fa';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && dropdownRef.current.contains && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Extract locale from pathname
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'en'; // Default to 'en' if not found

  // Function to toggle language
  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'cs' : 'en';

    // Replace the locale segment in the path
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={`/${currentLocale}`} className="text-2xl font-bold text-teal">
              Longevity Hub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href={`/${currentLocale}`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaHome className="h-5 w-5 mr-1" />
              {t('home')}
            </Link>
            <Link href={`/${currentLocale}/nutrition`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaUtensils className="h-5 w-5 mr-1" />
              {t('nutrition')}
            </Link>
            <Link href={`/${currentLocale}/fitness`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaDumbbell className="h-5 w-5 mr-1" />
              {t('fitness')}
            </Link>
            <Link href={`/${currentLocale}/mental-health`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaBrain className="h-5 w-5 mr-1" />
              {t('mental_health')}
            </Link>
            <Link href={`/${currentLocale}/biomarkers`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaChartLine className="h-5 w-5 mr-1" />
              {t('biomarkers')}
            </Link>
            <Link href={`/${currentLocale}/supplements`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaTablets className="h-5 w-5 mr-1" />
              {t('supplements')}
            </Link>
            <Link href={`/${currentLocale}/tools`} className="text-gray-700 hover:text-blue-600 flex items-center">
              <FaTools className="h-5 w-5 mr-1" />
              {t('tools')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">

            {/* Auth Buttons */}
            {status === 'authenticated' && session ? (
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer"
                  >
                    <FaUser className="h-5 w-5 mr-1" />
                    <span>{session.user.name || 'Account'}</span>
                  </button>
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${isDropdownOpen ? 'block' : 'hidden'}`}
                  >
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaUser className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaUser className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link href="/dashboard/bioage-history" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaHistory className="h-4 w-4 mr-2" />
                      Bio Age History
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: `/${currentLocale}` })}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <FaSignInAlt className="h-5 w-5 mr-1" />
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <FaUserPlus className="h-5 w-5 mr-1" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              {currentLocale === 'en' ? 'CS' : 'EN'}
            </button>



            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Desktop Search Bar */}
        <div className="hidden md:block mt-4 max-w-xl mx-auto">
          <SearchBar
            placeholder={t('search')}
            showButton={true}
          />
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <SearchBar
                placeholder={t('search')}
                showButton={false}
              />
            </div>

            <nav className="space-y-2">
              <Link href={`/${currentLocale}`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaHome className="h-5 w-5 mr-2" />
                {t('home')}
              </Link>
              <Link href={`/${currentLocale}/nutrition`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaUtensils className="h-5 w-5 mr-2" />
                {t('nutrition')}
              </Link>
              <Link href={`/${currentLocale}/fitness`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaDumbbell className="h-5 w-5 mr-2" />
                {t('fitness')}
              </Link>
              <Link href={`/${currentLocale}/mental-health`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaBrain className="h-5 w-5 mr-2" />
                {t('mental_health')}
              </Link>
              <Link href={`/${currentLocale}/biomarkers`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaChartLine className="h-5 w-5 mr-2" />
                {t('biomarkers')}
              </Link>
              <Link href={`/${currentLocale}/supplements`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaTablets className="h-5 w-5 mr-2" />
                {t('supplements')}
              </Link>
              <Link href={`/${currentLocale}/tools`} className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                <FaTools className="h-5 w-5 mr-2" />
                {t('tools')}
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {status === 'authenticated' && session ? (
                  <>
                    <Link href="/dashboard" className="flex items-center py-2 text-gray-700 hover:text-blue-600 font-medium">
                      <FaUser className="h-5 w-5 mr-2" />
                      {session.user.name || 'Account'}
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center py-2 text-gray-700 hover:text-blue-600 ml-4">
                      <FaUser className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                    <Link href="/dashboard/bioage-history" className="flex items-center py-2 text-gray-700 hover:text-blue-600 ml-4">
                      <FaHistory className="h-5 w-5 mr-2" />
                      Bio Age History
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: `/${currentLocale}` })}
                      className="flex items-center py-2 text-red-600 hover:text-red-800 w-full text-left ml-4"
                    >
                      <FaSignOutAlt className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="flex items-center py-2 text-gray-700 hover:text-blue-600">
                      <FaSignInAlt className="h-5 w-5 mr-2" />
                      Sign In
                    </Link>
                    <Link href="/auth/register" className="flex items-center py-2 text-blue-600 hover:text-blue-800 font-medium">
                      <FaUserPlus className="h-5 w-5 mr-2" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
