import React, { useState } from 'react';
import { 
  Rss, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Download, 
  FileCode, 
  Sparkles, 
  ShieldCheck, 
  Radio, 
  BookOpen, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RSS_ITEMS } from '../src/rssData';

export interface RssSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RssSubscriptionModal: React.FC<RssSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'rss2' | 'atom'>('rss2');

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
      description: 'Add to Feedly workspace or personal feed',
      color: '#2BB24C',
      url: `https://feedly.com/i/subscription/feed/${encodeURIComponent(feedUrl)}`,
      badge: 'Popular'
    },
    {
      name: 'Inoreader',
      description: 'Subscribe with rules & broadcast monitoring',
      color: '#0066FF',
      url: `https://www.inoreader.com/?add_feed=${encodeURIComponent(feedUrl)}`,
      badge: 'Enterprise'
    },
    {
      name: 'NetNewsWire / Native Client',
      description: 'Open in system newsreader via feed:// protocol',
      color: '#E8C98B',
      url: `feed://${feedUrlWithoutProtocol}`,
      badge: 'macOS / iOS'
    },
    {
      name: 'NewsBlur',
      description: 'Original-page interactive RSS reader',
      color: '#E59B3C',
      url: `https://www.newsblur.com/?url=${encodeURIComponent(feedUrl)}`,
      badge: 'Web / Mobile'
    },
    {
      name: 'The Old Reader',
      description: 'Social reader with notes and sharing',
      color: '#D44B38',
      url: `https://theoldreader.com/feeds/subscribe?url=${encodeURIComponent(feedUrl)}`,
      badge: 'Web'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rss-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0C0F17] border border-white/10 rounded-xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-start justify-between bg-[#111520] relative">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30 font-bold flex items-center gap-1.5">
                  <Rss size={11} className="text-[#C89B3C]" />
                  <span>SYNDICATED RSS 2.0 FEED</span>
                </span>
                <span className="text-neutral-500 text-xs font-mono">Live Market Updates</span>
              </div>
              <h2 id="rss-modal-title" className="text-xl sm:text-2xl font-bold text-white font-display">
                Subscribe via News Reader
              </h2>
              <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                Receive real-time institutional briefings, antitrust developments (House v. NCAA), media rights deals, and research dispatches in your preferred RSS reader.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close RSS Subscription Dialog"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Direct Feed URL with 1-Click Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode size={13} className="text-[#C89B3C]" />
                  <span>Direct RSS XML Endpoint:</span>
                </span>
                <span className="text-neutral-500 text-[11px]">RSS 2.0 + Atom 1.0 Namespace</span>
              </div>

              <div className="flex items-center gap-2 bg-[#080A0F] border border-white/15 rounded-lg p-2.5">
                <div className="flex-1 font-mono text-xs text-[#E8C98B] truncate px-1 select-all">
                  {feedUrl}
                </div>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={`px-3.5 py-2 rounded font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-[#68D391] text-[#090A0C]'
                      : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={13} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Action Links: Raw XML & Download */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#141824] hover:bg-[#1D2232] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <ExternalLink size={13} className="text-[#38BDF8]" />
                <span>View Raw XML in Browser</span>
              </a>

              <a
                href="/rss.xml"
                download="college-company-intelligence.xml"
                className="px-3.5 py-2 rounded bg-[#141824] hover:bg-[#1D2232] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Download size={13} className="text-[#68D391]" />
                <span>Download Feed File (.xml)</span>
              </a>
            </div>

            {/* One-Click Launchers for Popular Readers */}
            <div className="space-y-3 pt-2 border-t border-white/[0.08]">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-2">
                <Layers size={13} className="text-[#C89B3C]" />
                <span>Instant 1-Click Launchers for News Readers:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {readers.map((reader) => (
                  <a
                    key={reader.name}
                    href={reader.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#111520] hover:bg-[#171D2B] border border-white/10 hover:border-[#C89B3C]/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#E8C98B] transition-colors">
                          {reader.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400 border border-white/10">
                          {reader.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-snug">
                        {reader.description}
                      </div>
                    </div>

                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-[#C89B3C] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

            {/* Feed Content Snapshot Preview */}
            <div className="space-y-3 pt-2 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Radio size={12} className="text-[#68D391]" />
                  <span>Recent Items Currently in Feed ({RSS_ITEMS.length} Entries):</span>
                </span>
                <span className="text-[11px] text-neutral-500">Auto-updated via continuous wire monitoring</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {RSS_ITEMS.slice(0, 5).map((item) => (
                  <div 
                    key={item.id}
                    className="p-2.5 rounded bg-[#090C12] border border-white/5 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="text-[#C89B3C] font-semibold">{item.category}</span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Calendar size={10} />
                        <span>{item.pubDate}</span>
                      </span>
                    </div>
                    <div className="text-xs text-white font-medium line-clamp-1">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Instructions Accordion */}
            <div className="p-3.5 rounded-lg bg-[#0E121A] border border-white/5 text-xs text-neutral-400 space-y-1.5">
              <div className="font-semibold text-neutral-300 font-mono flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#68D391]" />
                <span>How to subscribe in other readers or internal enterprise tools:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Copy the feed link <code className="text-[#E8C98B] bg-black/40 px-1 py-0.5 rounded font-mono select-all">{feedUrl}</code> and paste it into the "Add Source / New Subscription" dialog in Outlook, Thunderbird, Slack RSS bot (<code className="text-neutral-300 font-mono">/feed subscribe</code>), or Apple News.
              </p>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0E121A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68D391]" />
              <span>CORS-enabled &amp; CDN-cached feed (RFC 822 compliant)</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#171C26] hover:bg-[#202735] border border-white/10 text-neutral-300 hover:text-white rounded text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
