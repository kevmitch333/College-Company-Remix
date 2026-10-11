import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Users,
  UserCheck, 
  MessageSquare, 
  Send, 
  Search, 
  Building2, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Plus, 
  X, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Globe, 
  Award,
  Hash,
  Mail,
  Briefcase,
  Lock,
  MessageCircle,
  MoreVertical,
  Check
} from 'lucide-react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  limit 
} from 'firebase/firestore';
import { db, auth, ensureAuthenticated } from '../src/firebase';

export interface MemberProfile {
  id: string;
  displayName: string;
  email: string;
  title: string;
  organization: string;
  affiliationType: 'University Athletic Dept' | 'Institutional Investor' | 'Conference Commissioner' | 'Varsity Program Lead' | 'Legal & Compliance';
  conference?: string;
  bio: string;
  avatarColor: string;
  isVerified: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderTitle: string;
  senderOrg: string;
  content: string;
  timestamp: any;
  isCurrentUser?: boolean;
}

// Initial Verified Institutional Network Members
const SEED_MEMBERS: MemberProfile[] = [
  {
    id: 'marcus_vance',
    displayName: 'Marcus Vance',
    email: 'm.vance@collegecompany.institutional',
    title: 'Senior VP, Collegiate Capital & Syndication',
    organization: 'College Company (Boston HQ)',
    affiliationType: 'Institutional Investor',
    conference: 'National Network',
    bio: 'Oversees intercollegiate capital syndication, NIL escrow facilities, and Tier-1 university expansion pacts.',
    avatarColor: 'from-amber-600 to-yellow-500',
    isVerified: true,
    createdAt: '2025-01-15'
  },
  {
    id: 'elena_rostova',
    displayName: 'Dr. Elena Rostova',
    email: 'rostova.84@osu.edu',
    title: 'Associate Athletic Director of Digital Sports',
    organization: 'The Ohio State University',
    affiliationType: 'University Athletic Dept',
    conference: 'Big Ten',
    bio: 'Directs Ohio State varsity esports operations, Lincoln Tower Arena infrastructure, and Big Ten broadcast syndication.',
    avatarColor: 'from-red-600 to-rose-500',
    isVerified: true,
    createdAt: '2025-02-10'
  },
  {
    id: 'derrick_chen',
    displayName: 'Derrick Chen',
    email: 'dchen@austin.utexas.edu',
    title: 'Executive Director, Digital Athletics & NIL',
    organization: 'University of Texas at Austin',
    affiliationType: 'Varsity Program Lead',
    conference: 'SEC',
    bio: 'Directs the 5,500 sq ft Alienware Longhorn Arena and coordinates SEC collegiate media and NIL partnerships.',
    avatarColor: 'from-orange-600 to-amber-500',
    isVerified: true,
    createdAt: '2025-02-28'
  },
  {
    id: 'sarah_jenkins',
    displayName: 'Sarah Jenkins, J.D.',
    email: 'sjenkins@collegiatelegal.org',
    title: 'Chair of Intercollegiate Athletic Compliance',
    organization: 'Intercollegiate Governance Institute',
    affiliationType: 'Legal & Compliance',
    conference: 'ACC / Big Ten Advisory',
    bio: 'Advising on Title IX roster balance, state-level NIL disclosure laws, and university trademark licensing agreements.',
    avatarColor: 'from-emerald-600 to-teal-500',
    isVerified: true,
    createdAt: '2025-03-04'
  },
  {
    id: 'julian_reynolds',
    displayName: 'Julian Reynolds',
    email: 'jreynolds@beaconcapital.com',
    title: 'Managing Director, Sports & Media IP',
    organization: 'Beacon Intercollegiate Capital',
    affiliationType: 'Institutional Investor',
    conference: 'NCAA Division I Syndicate',
    bio: 'Focuses on sports media rights consolidation, enterprise valuation modeling, and university IP holding structures.',
    avatarColor: 'from-blue-600 to-indigo-500',
    isVerified: true,
    createdAt: '2025-03-12'
  }
];

// Pre-configured Conference Channels
const WORKGROUP_CHANNELS = [
  { id: 'channel_big_ten', name: 'big-ten-syndicate', label: 'Big Ten Conference Syndicate', desc: 'Regional expansion, facilities & linear broadcast feeds' },
  { id: 'channel_nil_escrow', name: 'nil-escrow-clearing', label: 'NIL Escrow & Compliance Clearing', desc: 'Student-athlete protective trusts & regulatory disclosures' },
  { id: 'channel_facilities', name: 'varsity-flight-domes', label: 'Varsity Arenas & Flight Domes', desc: 'Engineering specs for CDRL drone zones & sim racing rigs' },
  { id: 'channel_general', name: 'institutional-general', label: 'General Syndicate Working Group', desc: 'Open discussion across accredited institutional partners' }
];

export const MemberProfileAndMessaging: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  defaultRecipientId?: string | null;
}> = ({ isOpen, onClose, defaultRecipientId }) => {
  // Navigation tabs within modal: 'messages' | 'directory' | 'my_profile'
  const [activeTab, setActiveTab] = useState<'messages' | 'directory' | 'my_profile'>('messages');

  // Active chat target: channel or direct user
  const [activeChannelId, setActiveChannelId] = useState<string>('channel_general');
  const [activeDirectRecipient, setActiveDirectRecipient] = useState<MemberProfile | null>(null);

  // Profile State
  const [currentProfile, setCurrentProfile] = useState<MemberProfile | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    email: '',
    title: '',
    organization: '',
    affiliationType: 'University Athletic Dept' as MemberProfile['affiliationType'],
    conference: 'Big Ten',
    bio: ''
  });

  // Directory State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [membersList, setMembersList] = useState<MemberProfile[]>(SEED_MEMBERS);

  // Messaging State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'local'>('connecting');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or fetch current user's profile from local storage / Firestore
  useEffect(() => {
    const localId = localStorage.getItem('cc_member_id') || `member_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('cc_member_id', localId);

    const savedLocalProfile = localStorage.getItem('cc_member_profile');
    if (savedLocalProfile) {
      try {
        const parsed = JSON.parse(savedLocalProfile);
        setCurrentProfile(parsed);
        setProfileForm({
          displayName: parsed.displayName,
          email: parsed.email,
          title: parsed.title,
          organization: parsed.organization,
          affiliationType: parsed.affiliationType,
          conference: parsed.conference || 'Big Ten',
          bio: parsed.bio
        });
      } catch (e) {
        console.error("Local profile parse error", e);
      }
    }

    // Connect to Firestore Auth & Profile
    ensureAuthenticated(async (user) => {
      setConnectionStatus('connected');
      const userId = user?.uid || localId;
      try {
        const profileRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(profileRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as MemberProfile;
          setCurrentProfile(data);
          setProfileForm({
            displayName: data.displayName,
            email: data.email,
            title: data.title,
            organization: data.organization,
            affiliationType: data.affiliationType,
            conference: data.conference || 'Big Ten',
            bio: data.bio
          });
          localStorage.setItem('cc_member_profile', JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Firestore profile fetch error, using local fallback", err);
      }
    });

    // Also fetch directory profiles from Firestore if available
    const fetchDirectory = async () => {
      try {
        const profilesCol = collection(db, 'profiles');
        const q = query(profilesCol, limit(20));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const remoteMembers: MemberProfile[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as MemberProfile;
            if (data.displayName && !SEED_MEMBERS.some(s => s.id === data.id)) {
              remoteMembers.push(data);
            }
          });
          if (remoteMembers.length > 0) {
            setMembersList([...SEED_MEMBERS, ...remoteMembers]);
          }
        }
      } catch (e) {
        // Fallback to seeded members
        setMembersList(SEED_MEMBERS);
      }
    };
    fetchDirectory();
  }, []);

  // When defaultRecipientId is provided, switch to direct messaging with them
  useEffect(() => {
    if (defaultRecipientId) {
      const target = membersList.find(m => m.id === defaultRecipientId);
      if (target) {
        startDirectMessage(target);
      }
    }
  }, [defaultRecipientId, membersList]);

  // Real-time listener for current active channel/direct chat
  useEffect(() => {
    if (!isOpen) return;

    // Build unique channel path
    const channelDocId = activeDirectRecipient 
      ? [currentProfile?.id || 'guest', activeDirectRecipient.id].sort().join('_direct_')
      : activeChannelId;

    try {
      const messagesRef = collection(db, 'channels', channelDocId, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(50));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loaded: ChatMessage[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          loaded.push({
            id: docSnap.id,
            channelId: channelDocId,
            senderId: d.senderId,
            senderName: d.senderName || 'Anonymous Member',
            senderTitle: d.senderTitle || 'Network Member',
            senderOrg: d.senderOrg || 'Affiliated Institution',
            content: d.content || '',
            timestamp: d.timestamp?.toDate ? d.timestamp.toDate() : new Date(),
            isCurrentUser: d.senderId === (currentProfile?.id || localStorage.getItem('cc_member_id'))
          });
        });

        // If no messages yet in this channel, provide contextual welcome starter
        if (loaded.length === 0) {
          if (activeDirectRecipient) {
            loaded.push({
              id: 'starter',
              channelId: channelDocId,
              senderId: activeDirectRecipient.id,
              senderName: activeDirectRecipient.displayName,
              senderTitle: activeDirectRecipient.title,
              senderOrg: activeDirectRecipient.organization,
              content: `Greetings. I lead ${activeDirectRecipient.affiliationType} at ${activeDirectRecipient.organization}. Feel free to message me regarding intercollegiate facility expansion, tournament circuits, or NIL compliance.`,
              timestamp: new Date(),
              isCurrentUser: false
            });
          } else {
            const channelInfo = WORKGROUP_CHANNELS.find(c => c.id === activeChannelId);
            loaded.push({
              id: 'starter_chan',
              channelId: channelDocId,
              senderId: 'system',
              senderName: 'Collegiate Governance Network',
              senderTitle: 'Institutional Syndicate Dispatch',
              senderOrg: 'College Company Secretariat',
              content: `Welcome to #${channelInfo?.name || 'channel'}. This is an encrypted collegiate channel for ${channelInfo?.desc || 'member coordination'}. Messages are synchronized across institutional nodes.`,
              timestamp: new Date(),
              isCurrentUser: false
            });
          }
        }

        setMessages(loaded);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, (error) => {
        console.warn("Firestore onSnapshot error, falling back to local chat session:", error);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Error setting up Firestore listener:", e);
    }
  }, [isOpen, activeChannelId, activeDirectRecipient, currentProfile]);

  // Handle Send Message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const myProfile = currentProfile || {
      id: localStorage.getItem('cc_member_id') || 'guest_user',
      displayName: 'Accredited Delegate',
      title: 'Institutional Observer',
      organization: 'Collegiate Network Partner',
      affiliationType: 'Institutional Investor',
      conference: 'National Network',
      bio: '',
      avatarColor: 'from-amber-600 to-yellow-500',
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    const text = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    const channelDocId = activeDirectRecipient 
      ? [myProfile.id, activeDirectRecipient.id].sort().join('_direct_')
      : activeChannelId;

    const newMsg: ChatMessage = {
      id: `local_${Date.now()}`,
      channelId: channelDocId,
      senderId: myProfile.id,
      senderName: myProfile.displayName,
      senderTitle: myProfile.title,
      senderOrg: myProfile.organization,
      content: text,
      timestamp: new Date(),
      isCurrentUser: true
    };

    // Optimistic UI update
    setMessages(prev => [...prev, newMsg]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    // Send to Firestore
    try {
      const messagesRef = collection(db, 'channels', channelDocId, 'messages');
      await addDoc(messagesRef, {
        channelId: channelDocId,
        senderId: myProfile.id,
        senderName: myProfile.displayName,
        senderTitle: myProfile.title,
        senderOrg: myProfile.organization,
        recipientId: activeDirectRecipient ? activeDirectRecipient.id : 'channel',
        content: text,
        timestamp: serverTimestamp(),
        read: false
      });
    } catch (err) {
      console.warn("Could not save to Firestore, stored in local state:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Start Direct Message with a directory member
  const startDirectMessage = (member: MemberProfile) => {
    setActiveDirectRecipient(member);
    setActiveTab('messages');
  };

  // Switch back to a conference workgroup channel
  const selectChannel = (channelId: string) => {
    setActiveDirectRecipient(null);
    setActiveChannelId(channelId);
    setActiveTab('messages');
  };

  // Save / Update Member Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.displayName.trim()) return;

    const userId = currentProfile?.id || auth.currentUser?.uid || localStorage.getItem('cc_member_id') || `member_${Date.now()}`;
    
    const colors = [
      'from-amber-600 to-yellow-500',
      'from-emerald-600 to-teal-500',
      'from-blue-600 to-indigo-500',
      'from-purple-600 to-pink-500',
      'from-rose-600 to-red-500'
    ];
    const assignedColor = currentProfile?.avatarColor || colors[Math.floor(Math.random() * colors.length)];

    const updatedProfile: MemberProfile = {
      id: userId,
      displayName: profileForm.displayName.trim(),
      email: profileForm.email.trim() || 'member@institution.edu',
      title: profileForm.title.trim() || 'Athletic Directorate Delegate',
      organization: profileForm.organization.trim() || 'Collegiate Partner Institution',
      affiliationType: profileForm.affiliationType,
      conference: profileForm.conference,
      bio: profileForm.bio.trim() || 'Accredited member of the Sovereign Intercollegiate Syndicate.',
      avatarColor: assignedColor,
      isVerified: true,
      createdAt: currentProfile?.createdAt || new Date().toISOString()
    };

    setCurrentProfile(updatedProfile);
    localStorage.setItem('cc_member_profile', JSON.stringify(updatedProfile));
    localStorage.setItem('cc_member_id', userId);
    setIsEditingProfile(false);

    // Save to Firestore
    try {
      const profileRef = doc(db, 'profiles', userId);
      await setDoc(profileRef, {
        ...updatedProfile,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Add to directory list if not already there
      setMembersList(prev => {
        const idx = prev.findIndex(m => m.id === userId);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = updatedProfile;
          return next;
        }
        return [updatedProfile, ...prev];
      });
    } catch (err) {
      console.warn("Could not save profile to Firestore, persisted locally:", err);
    }
  };

  // Quick Preset Messages
  const sendQuickChip = (text: string) => {
    setInputMessage(text);
  };

  // Filtered members for directory
  const filteredMembers = membersList.filter(m => {
    const matchesSearch = 
      m.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.conference && m.conference.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedFilterCategory === 'All' || m.affiliationType === selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0B0D13] border border-white/15 w-full max-w-5xl h-[88vh] max-h-[820px] rounded-xl flex flex-col shadow-2xl overflow-hidden relative font-sans"
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F1219] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#171B24] border border-[#C89B3C]/50 flex items-center justify-center text-[#E8C98B]">
              <Shield size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                  Institutional Syndicate Network
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#68D391]/10 text-[#68D391] border border-[#68D391]/20">
                  <CheckCircle2 size={10} /> Secure Fiduciary Node
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Real-time member directory & conference workgroup dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Nav Tabs */}
            <div className="flex items-center bg-[#07090D] p-1 rounded-sm border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3 py-1 rounded-sm transition-all flex items-center gap-1.5 ${
                  activeTab === 'messages' 
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MessageSquare size={13} />
                <span>Messages</span>
              </button>
              <button
                onClick={() => setActiveTab('directory')}
                className={`px-3 py-1 rounded-sm transition-all flex items-center gap-1.5 ${
                  activeTab === 'directory' 
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Users size={13} />
                <span>Directory</span>
              </button>
              <button
                onClick={() => { setActiveTab('my_profile'); setIsEditingProfile(false); }}
                className={`px-3 py-1 rounded-sm transition-all flex items-center gap-1.5 ${
                  activeTab === 'my_profile' 
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <User size={13} />
                <span className="hidden sm:inline">My Profile</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-sm hover:bg-white/10 transition-colors"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Content Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* ========================================================================= */}
          {/* VIEW A: MESSAGES TAB */}
          {/* ========================================================================= */}
          {activeTab === 'messages' && (
            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Channel / Conversation Sidebar */}
              <div className="w-full md:w-72 lg:w-80 border-r border-white/10 bg-[#0A0D12] flex flex-col shrink-0">
                
                {/* User quick status card */}
                <div className="p-3.5 border-b border-white/10 bg-[#0E1117] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentProfile?.avatarColor || 'from-amber-600 to-yellow-500'} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {currentProfile?.displayName ? currentProfile.displayName.charAt(0) : 'U'}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">
                        {currentProfile?.displayName || 'Accredited Guest'}
                      </div>
                      <div className="text-[10px] text-[#C89B3C] font-mono truncate">
                        {currentProfile?.organization || 'Configure Profile'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveTab('my_profile'); setIsEditingProfile(true); }}
                    className="p-1 text-neutral-400 hover:text-white"
                    title="Edit profile"
                  >
                    <Edit3 size={13} />
                  </button>
                </div>

                {/* Sidebar Scrollable Channels & Direct Chats */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono">
                  
                  {/* Conference Workgroups */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider px-2 font-semibold flex items-center justify-between">
                      <span>Working Group Channels</span>
                      <Hash size={11} />
                    </div>
                    {WORKGROUP_CHANNELS.map((chan) => {
                      const isActive = !activeDirectRecipient && activeChannelId === chan.id;
                      return (
                        <button
                          key={chan.id}
                          onClick={() => selectChannel(chan.id)}
                          className={`w-full text-left px-2.5 py-2 rounded-sm transition-all flex items-center justify-between ${
                            isActive 
                              ? 'bg-[#181D27] text-[#E8C98B] border border-white/10' 
                              : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-[#C89B3C]">#</span>
                            <span className="truncate">{chan.name}</span>
                          </div>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#68D391]"></span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Direct Messages with Institutional Leaders */}
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider px-2 font-semibold flex items-center justify-between">
                      <span>Direct Messages</span>
                      <MessageCircle size={11} />
                    </div>
                    {membersList.slice(0, 5).map((mem) => {
                      const isActive = activeDirectRecipient?.id === mem.id;
                      return (
                        <button
                          key={mem.id}
                          onClick={() => startDirectMessage(mem)}
                          className={`w-full text-left px-2.5 py-2 rounded-sm transition-all flex items-center gap-2.5 ${
                            isActive 
                              ? 'bg-[#181D27] text-white border border-white/10' 
                              : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${mem.avatarColor} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
                            {mem.displayName.charAt(0)}
                          </div>
                          <div className="truncate flex-1">
                            <div className="text-xs truncate font-medium">{mem.displayName}</div>
                            <div className="text-[10px] text-neutral-500 truncate">{mem.organization}</div>
                          </div>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E8C98B] shrink-0"></span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Directory Shortcut Callout */}
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('directory')}
                      className="w-full py-2 bg-[#121620] hover:bg-[#181D28] text-neutral-400 hover:text-white border border-white/5 rounded text-[11px] text-center transition-colors"
                    >
                      + Browse Full Syndicate Directory
                    </button>
                  </div>

                </div>
              </div>

              {/* Chat Thread Panel */}
              <div className="flex-1 flex flex-col h-full bg-[#0E1118] overflow-hidden">
                
                {/* Active Thread Banner */}
                <div className="px-5 py-3 border-b border-white/10 bg-[#121620] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    {activeDirectRecipient ? (
                      <>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${activeDirectRecipient.avatarColor} flex items-center justify-center text-xs font-bold text-white`}>
                          {activeDirectRecipient.displayName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{activeDirectRecipient.displayName}</span>
                            <span className="text-[10px] font-mono text-[#68D391] bg-[#68D391]/10 px-1.5 rounded border border-[#68D391]/20">Verified</span>
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">
                            {activeDirectRecipient.title} · <strong className="text-neutral-300">{activeDirectRecipient.organization}</strong>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded bg-[#1A202C] border border-white/10 flex items-center justify-center text-[#C89B3C]">
                          <Hash size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>#{WORKGROUP_CHANNELS.find(c => c.id === activeChannelId)?.name}</span>
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">
                            {WORKGROUP_CHANNELS.find(c => c.id === activeChannelId)?.desc}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse"></span>
                    <span className="hidden sm:inline">Active Synchronous Node</span>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-neutral-400">
                        <span className="font-semibold text-white">{msg.senderName}</span>
                        <span>·</span>
                        <span className="text-[#C89B3C] text-[10px]">{msg.senderOrg}</span>
                        <span>·</span>
                        <span className="text-neutral-500 text-[10px]">
                          {msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                        </span>
                      </div>

                      <div 
                        className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-lg text-xs leading-relaxed font-sans shadow-md ${
                          msg.isCurrentUser 
                            ? 'bg-[#C89B3C] text-[#090A0C] font-medium rounded-tr-none' 
                            : 'bg-[#181D26] border border-white/10 text-neutral-200 rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Inquiry Chips Bar */}
                <div className="px-4 py-2 bg-[#0C0F15] border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono shrink-0">
                  <span className="text-neutral-500 text-[10px] uppercase shrink-0">Quick Dispatch:</span>
                  {[
                    "Request Title IX Roster Audit",
                    "Schedule Athletic Board Briefing",
                    "Request Pro-Forma DCF Model",
                    "Inquire on CDRL Flight Dome Spec"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendQuickChip(chip)}
                      className="px-2.5 py-1 bg-[#151922] hover:bg-[#1C222E] border border-white/10 text-neutral-300 rounded whitespace-nowrap transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Message Input Bar */}
                <form 
                  onSubmit={handleSendMessage}
                  className="p-3 sm:p-4 bg-[#0A0D12] border-t border-white/10 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={activeDirectRecipient ? `Message ${activeDirectRecipient.displayName}...` : `Broadcast to #${WORKGROUP_CHANNELS.find(c => c.id === activeChannelId)?.name}...`}
                    className="flex-1 bg-[#121620] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    className="px-4 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-40 disabled:cursor-not-allowed text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                  >
                    <span>Send</span>
                    <Send size={13} />
                  </button>
                </form>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW B: DIRECTORY TAB */}
          {/* ========================================================================= */}
          {activeTab === 'directory' && (
            <div className="flex-1 flex flex-col p-6 bg-[#0A0D12] overflow-y-auto space-y-6">
              
              {/* Directory Filter & Search Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Accredited Institutional Directory
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Connect directly with athletic directors, compliance attorneys, and sovereign syndicate partners.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, university, title..."
                    className="w-full bg-[#121620] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 font-mono"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="text-neutral-500 text-[11px] uppercase mr-1">Filter Affiliation:</span>
                {[
                  'All',
                  'University Athletic Dept',
                  'Institutional Investor',
                  'Varsity Program Lead',
                  'Legal & Compliance'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilterCategory(cat)}
                    className={`px-3 py-1 rounded transition-all ${
                      selectedFilterCategory === cat 
                        ? 'bg-[#C89B3C] text-[#090A0C] font-bold' 
                        : 'bg-[#141822] text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Directory Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#121620] border border-white/10 hover:border-[#C89B3C]/50 rounded-lg p-5 flex flex-col justify-between space-y-4 transition-all shadow-md group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${member.avatarColor} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                          {member.displayName.charAt(0)}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#68D391]/10 text-[#68D391] border border-[#68D391]/20">
                          <Check size={11} /> Verified
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          {member.displayName}
                        </h4>
                        <div className="text-xs text-[#E8C98B] font-mono mt-0.5">
                          {member.title}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono mt-0.5 flex items-center gap-1.5">
                          <Building2 size={12} className="text-neutral-500" />
                          <span>{member.organization}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500">
                        {member.conference || 'National'}
                      </span>
                      <button
                        onClick={() => startDirectMessage(member)}
                        className="px-3 py-1.5 bg-[#C89B3C]/10 hover:bg-[#C89B3C] text-[#E8C98B] hover:text-[#090A0C] border border-[#C89B3C]/30 text-xs font-mono font-semibold rounded transition-colors flex items-center gap-1"
                      >
                        <MessageSquare size={12} />
                        <span>Direct Message</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW C: MY PROFILE TAB */}
          {/* ========================================================================= */}
          {activeTab === 'my_profile' && (
            <div className="flex-1 flex flex-col p-6 bg-[#0A0D12] overflow-y-auto space-y-6">
              
              <div className="max-w-2xl mx-auto w-full space-y-6">
                
                {/* Profile Header Card */}
                <div className="bg-[#121620] border border-white/10 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-tr ${currentProfile?.avatarColor || 'from-amber-600 to-yellow-500'} flex items-center justify-center text-3xl font-bold text-white shadow-xl`}>
                      {currentProfile?.displayName ? currentProfile.displayName.charAt(0) : 'U'}
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                          {currentProfile?.displayName || 'Accredited Member'}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20">
                          <Award size={11} /> Sovereign Syndicate Node
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[#E8C98B]">
                        {currentProfile?.title || 'Institutional Partner / Athletic Delegate'}
                      </div>
                      <div className="text-xs font-mono text-neutral-400">
                        {currentProfile?.organization || 'Collegiate Partner Institution'} · {currentProfile?.conference || 'Division I'}
                      </div>

                      <p className="text-xs text-neutral-300 font-sans pt-2 leading-relaxed max-w-lg">
                        {currentProfile?.bio || 'Configured institutional member profile within the College Company network.'}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="px-3 py-1.5 bg-[#1A1F2C] hover:bg-[#23293A] border border-white/10 text-white text-xs font-mono rounded transition-colors flex items-center gap-1.5 self-center sm:self-start"
                    >
                      <Edit3 size={13} />
                      <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>
                </div>

                {/* Profile Form (Edit Mode or Initial Creation) */}
                {isEditingProfile && (
                  <form onSubmit={handleSaveProfile} className="bg-[#141822] border border-white/10 rounded-xl p-6 space-y-5 shadow-xl">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-base font-bold font-display text-white">
                        Configure Institutional Credentials
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        Your accredited identity will be visible in the syndicate directory and messaging dispatch.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-1.5">
                        <label className="text-neutral-400">Full Name / Delegate Identity</label>
                        <input
                          type="text"
                          required
                          value={profileForm.displayName}
                          onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                          placeholder="e.g. Dr. Arthur Pendelton"
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-400">Institutional Email</label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          placeholder="e.g. pendelton@athletics.osu.edu"
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-400">Official Title</label>
                        <input
                          type="text"
                          required
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          placeholder="e.g. Associate Athletic Director"
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-400">University or Organization</label>
                        <input
                          type="text"
                          required
                          value={profileForm.organization}
                          onChange={(e) => setProfileForm({ ...profileForm, organization: e.target.value })}
                          placeholder="e.g. The Ohio State University"
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-400">Affiliation Sector</label>
                        <select
                          value={profileForm.affiliationType}
                          onChange={(e) => setProfileForm({ ...profileForm, affiliationType: e.target.value as any })}
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        >
                          <option value="University Athletic Dept">University Athletic Department</option>
                          <option value="Institutional Investor">Institutional Investor</option>
                          <option value="Conference Commissioner">Conference Commissioner</option>
                          <option value="Varsity Program Lead">Varsity Program Lead</option>
                          <option value="Legal & Compliance">Legal & Compliance</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-400">Athletic Conference Affiliation</label>
                        <input
                          type="text"
                          value={profileForm.conference}
                          onChange={(e) => setProfileForm({ ...profileForm, conference: e.target.value })}
                          placeholder="e.g. Big Ten, SEC, ACC, Ivy League"
                          className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono">
                      <label className="text-neutral-400">Executive Bio / Focus Area</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        placeholder="Brief summary of your institutional responsibilities and collegiate sports initiatives..."
                        className="w-full bg-[#0D1016] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded p-3 text-white text-xs font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-white/10 text-neutral-400 hover:text-white rounded text-xs font-mono"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded font-mono"
                      >
                        Save Profile & Synchronize
                      </button>
                    </div>
                  </form>
                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
