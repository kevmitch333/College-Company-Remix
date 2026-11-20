import React, { useState, useRef } from 'react';
import {
  Rss,
  Copy,
  Check,
  ExternalLink,
  X,
  Download,
  FileCode,
  Radio,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { RSS_ITEMS } from '../src/rssData';
import { useModalA11y } from './public/useModalA11y';

export interface RssSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RssSubscriptionModal: React.FC<RssSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useModalA11y(isOpen, onClose, dialogRef, closeBtnRef);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://college.company';
  const feedUrl = `${origin}/rss.xml`;
  const feedUrlWithoutProtocol = feedUrl.replace(/^https?:\/\//, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const readers = [
    {
      name: 'Feedly',
      description: 'Add to Feedly feed reader',
      url: `https://feedly.com/i/subscription/feed/${encodeURIComponent(feedUrl)}`,
    },
    {
      name: 'Inoreader',
      description: 'Subscribe in Inoreader',
      url: `https://www.inoreader.com/?add_feed=${encodeURIComponent(feedUrl)}`,
    },
    {
      name: 'NetNewsWire / Native Client',
      description: 'Open via feed:// protocol',
      url: `feed://${feedUrlWithoutProtocol}`,
    },
    {
      name: 'NewsBlur',
      description: 'Open in NewsBlur web reader',
      url: `https://www.newsblur.com/?url=${encodeURIComponent(feedUrl)}`,
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rss-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0C0F17] border border-white/15 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-white/10 flex items-start justify-between bg-[#111520]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E8C98B] font-bold">
              <Rss size={13} className="text-[#C89B3C]" />
              <span>RSS 2.0 Feed</span>
            </div>
            <h2 id="rss-modal-title" className="text-xl sm:text-2xl font-bold text-white font-display">
              Subscribe via News Reader
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Follow Research Wire guides and Market Wire updates in your preferred RSS reader. Items match /intelligence and /intelligence/market-wire directly.
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close RSS dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode size={14} className="text-[#C89B3C]" />
              <span>Direct RSS XML URL</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#080A0F] border border-white/15 rounded-lg p-2.5">
              <div className="flex-1 font-mono text-sm text-[#E8C98B] truncate px-1 select-all">
                {feedUrl}
              </div>

              <button
                type="button"
                onClick={copyToClipboard}
                className={`min-h-[44px] px-4 py-2 rounded font-mono text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                  copied ? 'bg-[#68D391] text-[#090A0C]' : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C]'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded bg-[#141824] hover:bg-[#1D2232] border border-white/15 text-sm font-mono text-neutral-200 hover:text-white inline-flex items-center gap-1.5"
            >
              <ExternalLink size={14} className="text-[#38BDF8]" />
              <span>Open Raw XML</span>
            </a>

            <a
              href="/rss.xml"
              download="college-company-updates.xml"
              className="min-h-[44px] px-4 py-2 rounded bg-[#141824] hover:bg-[#1D2232] border border-white/15 text-sm font-mono text-neutral-200 hover:text-white inline-flex items-center gap-1.5"
            >
              <Download size={14} className="text-[#68D391]" />
              <span>Download (.xml)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {readers.map((reader) => (
              <a
                key={reader.name}
                href={reader.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[54px] p-3 rounded-lg bg-[#111520] hover:bg-[#171D2B] border border-white/10 hover:border-[#C89B3C]/50 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white">{reader.name}</div>
                  <div className="text-xs text-neutral-400">{reader.description}</div>
                </div>
                <ArrowRight size={15} className="text-[#E8C98B] shrink-0" />
              </a>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Radio size={13} className="text-[#68D391]" />
              <span>Items in Feed ({RSS_ITEMS.length})</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {RSS_ITEMS.map((item) => (
                <div key={item.id} className="p-3 rounded bg-[#090C12] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#E8C98B]">{item.category}</span>
                    <span className="text-neutral-400 inline-flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{item.pubDate}</span>
                    </span>
                  </div>
                  <div className="text-sm text-white font-semibold">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0E121A] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 bg-[#171C26] hover:bg-[#202735] border border-white/15 text-white rounded text-sm font-mono cursor-pointer"
          >
            Close [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
