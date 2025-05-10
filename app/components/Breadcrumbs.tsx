'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({ 
  items = [], 
  showHome = true,
  className = ''
}: BreadcrumbsProps) {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  
  // If no items are provided, generate them from the pathname
  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs(pathname, locale);
  
  // Add home item if showHome is true and it's not already included
  const allBreadcrumbs = showHome && (breadcrumbs.length === 0 || breadcrumbs[0].href !== `/${locale}`)
    ? [{ label: 'Home', href: `/${locale}` }, ...breadcrumbs]
    : breadcrumbs;
  
  return (
    <div className={`bg-gray-100 py-3 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-wrap text-sm text-gray-600">
          {allBreadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">›</span>}
              
              {index === allBreadcrumbs.length - 1 || !item.href ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string, locale: string): BreadcrumbItem[] {
  // Remove locale prefix and split path
  const path = pathname.replace(new RegExp(`^/${locale}`), '');
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return [];
  }
  
  // Generate breadcrumb items
  return segments.map((segment, index) => {
    // Format the label (convert slug to title case)
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    
    // Generate href for all but the last segment
    const href = index < segments.length - 1
      ? `/${locale}/${segments.slice(0, index + 1).join('/')}`
      : undefined;
    
    return { label, href };
  });
}
