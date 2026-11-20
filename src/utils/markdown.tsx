import React from 'react';

/**
 * Clean, zero-dependency Markdown renderer for Research Wire articles.
 * Handles headings (#, ##, ###), unordered lists (- / *), ordered lists (1.),
 * bold (**text**), italic (*text*), inline code (`code`), and links ([label](url)),
 * including headings/lists mixed inside a single text block.
 */

function renderInline(text: string): React.ReactNode[] {
  // Match links, bold (**...**), italic (*...*), or inline code (`...`)
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const splitIdx = part.indexOf('](');
      const label = part.slice(1, splitIdx);
      const url = part.slice(splitIdx + 2, -1);
      const safeHref = /^https?:\/\//i.test(url) || url.startsWith('/') ? url : '#';
      const isExternal = /^https?:\/\//i.test(safeHref);
      return (
        <a
          key={idx}
          href={safeHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#E8C98B] underline underline-offset-2 hover:text-white transition-colors"
        >
          {label}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic text-neutral-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[0.9em] text-[#E8C98B]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const MarkdownContent: React.FC<{ content: string; className?: string }> = ({
  content,
  className = '',
}) => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${i}`}
          className="text-xl sm:text-2xl font-display font-bold text-white pt-4 tracking-tight"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl sm:text-3xl font-display font-bold text-white pt-6 tracking-tight border-b border-white/10 pb-2"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h2
          key={`h1-${i}`}
          className="text-2xl sm:text-3xl font-display font-bold text-white pt-6 tracking-tight"
        >
          {renderInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list block
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (cur.startsWith('- ') || cur.startsWith('* ')) {
          items.push(cur.slice(2).trim());
          i++;
        } else {
          break;
        }
      }
      blocks.push(
        <ul key={`ul-${i}`} className="space-y-2 list-disc pl-6 text-neutral-300 text-base leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list block
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (/^\d+\.\s+/.test(cur)) {
          items.push(cur.replace(/^\d+\.\s+/, '').trim());
          i++;
        } else {
          break;
        }
      }
      blocks.push(
        <ol key={`ol-${i}`} className="space-y-2.5 list-decimal pl-6 text-neutral-300 text-base leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (gather contiguous normal text lines until blank line, heading, or list)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (
        !cur ||
        cur.startsWith('#') ||
        cur.startsWith('- ') ||
        cur.startsWith('* ') ||
        /^\d+\.\s+/.test(cur)
      ) {
        break;
      }
      paraLines.push(cur);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push(
        <p key={`p-${i}`} className="text-base text-neutral-300 leading-relaxed">
          {renderInline(paraLines.join(' '))}
        </p>
      );
    }
  }

  return <div className={`space-y-4 ${className}`}>{blocks}</div>;
};
