import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-stone-muted">
        <li>
          <Link href="/" className="hover:text-brass transition-colors">
            HOME
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-stone-muted/50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brass transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-warmWhite font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
