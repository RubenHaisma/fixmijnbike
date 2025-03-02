import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/structured-data';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function SEOBreadcrumbs({ items }: BreadcrumbsProps) {
  // Prepare items for structured data
  const schemaItems = items.map(item => ({
    name: item.name,
    url: `https://fixmijnbike.nl${item.href}`
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" aria-hidden="true" />
              )}
              {item.current ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}