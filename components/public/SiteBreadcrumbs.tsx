import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProgramStatus } from '../../src/data/programs';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const SiteBreadcrumbs: React.FC<{
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}> = ({ items, onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-300 mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center min-h-[44px] px-1.5 text-neutral-300 hover:text-[#E8C98B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded transition-colors"
          >
            Home
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              <li aria-hidden="true" className="text-neutral-500">
                <ChevronRight size={15} />
              </li>
              <li>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href!)}
                    className="inline-flex items-center min-h-[44px] px-1.5 text-neutral-300 hover:text-[#E8C98B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="inline-flex items-center min-h-[44px] px-1.5 text-white font-medium"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export const ProgramStatusBadge: React.FC<{ status: ProgramStatus }> = ({ status }) => {
  const styles: Record<ProgramStatus, string> = {
    Live: 'bg-emerald-950/60 text-[#68D391] border-[#68D391]/40',
    'In development': 'bg-[#C89B3C]/15 text-[#E8C98B] border-[#C89B3C]/40',
    Concept: 'bg-sky-950/50 text-[#7DD3FC] border-[#38BDF8]/35',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold border ${styles[status]}`}
    >
      <span
        aria-hidden="true"
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'Live'
            ? 'bg-[#68D391]'
            : status === 'In development'
            ? 'bg-[#E8C98B]'
            : 'bg-[#7DD3FC]'
        }`}
      />
      <span>Status: {status}</span>
    </span>
  );
};
