import React, { useState } from 'react';
import { X, Plus, Trash2, HelpCircle, Image as ImageIcon, RotateCcw } from 'lucide-react';

export interface HeroImageConfig {
  src: string;
  label: string;
  iconName: string;
  sublabel?: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  images: HeroImageConfig[];
  setImages: (images: HeroImageConfig[]) => void;
}

export const ICON_OPTIONS = [
  'Trophy', 'Rocket', 'Video', 'Users', 'Gamepad2', 
  'Cpu', 'Mic', 'Glasses', 'Zap', 'Globe', 'Building2', 'Flag'
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, images, setImages }) => {
  const [newUrl, setNewUrl] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newSublabel, setNewSublabel] = useState('');
  const [newIcon, setNewIcon] = useState('Building2');

  if (!isOpen) return null;

  const convertLink = (url: string) => {
    if (!url) return '';
    
    // Cloud storage direct embed parser
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
      }
    }
    
    // Cloud storage direct file parser
    if (url.includes('dropbox.com')) {
      return url.replace('dl=0', 'raw=1');
    }
    
    return url;
  };

  const handleAdd = () => {
    if (!newUrl || !newLabel) return;
    const directLink = convertLink(newUrl);
    const newImage: HeroImageConfig = { 
      src: directLink, 
      label: newLabel, 
      sublabel: newSublabel || 'Strategic Asset',
      iconName: newIcon 
    };
    
    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    
    try {
      localStorage.setItem('heroImages', JSON.stringify(updatedImages));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
    
    setNewUrl('');
    setNewLabel('');
    setNewSublabel('');
  };

  const handleDelete = (index: number) => {
    if (images.length <= 1) {
      alert("A minimum of one showcase asset is required for the executive carrier.");
      return;
    }
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem('heroImages', JSON.stringify(updatedImages));
  };

  const handleReset = () => {
    if (window.confirm('Reset all hero visual carriers to institutional defaults? Custom links will be cleared.')) {
      localStorage.removeItem('heroImages');
      localStorage.removeItem('heroImagesVersion');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0F1217] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#12161E]">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C89B3C]">Administration Console</div>
            <h2 className="text-lg font-semibold text-[#F5F5F3] font-display">Hero Visual Asset Manager</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Add New Slide Form */}
          <div className="bg-[#141822] p-5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C89B3C] tracking-wide uppercase">
              <Plus size={14} /> Add Executive Visual Carrier
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                  Image Source URL (Direct CDN or Cloud Storage URL)
                </label>
                <input 
                  type="text" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://... direct image URL or cloud storage link"
                  className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-[#C89B3C] outline-none transition-colors"
                />
                <p className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
                  <HelpCircle size={11} /> Automatically standardizes public share links into direct embeds.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                    Display Title
                  </label>
                  <input 
                    type="text" 
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. National Championship Pavilion"
                    className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white focus:border-[#C89B3C] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                    Division / Subtitle
                  </label>
                  <input 
                    type="text" 
                    value={newSublabel}
                    onChange={(e) => setNewSublabel(e.target.value)}
                    placeholder="e.g. Live Broadcast Infrastructure"
                    className="w-full bg-[#0A0D12] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white focus:border-[#C89B3C] outline-none transition-colors"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleAdd}
                disabled={!newUrl || !newLabel}
                className="w-full bg-[#C89B3C] hover:bg-[#B3872F] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A0D12] font-semibold py-2.5 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={16} /> Deploy Visual Carrier
              </button>
            </div>
          </div>

          {/* Existing Slides List */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Active Media Units ({images.length})
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">16:9 Aspect Ratio</span>
            </div>

            <div className="space-y-2.5">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 bg-[#12161E] p-3 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="w-16 h-12 bg-neutral-900 rounded overflow-hidden flex-shrink-0 border border-white/10 relative">
                    <img 
                      src={img.src} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-white text-sm truncate">{img.label}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{img.sublabel || 'Strategic Asset'}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(idx)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
                    title="Remove Slide"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="pt-5 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
              <span className="text-neutral-500">Changes persist to local environment.</span>
              <button 
                onClick={handleReset}
                className="text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={12} /> Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
