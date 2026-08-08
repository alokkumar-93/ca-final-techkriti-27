import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { UserProfile, TaskItem, TaskSubmission, RewardItem } from '../types/user';
import { TechkritiLogo } from './TechkritiLogo';
import { InteractiveGlowBackground } from './InteractiveGlowBackground';
import { 
  Home, 
  Clock, 
  Trophy, 
  Gift, 
  LogOut, 
  ListChecks, 
  CheckCircle2, 
  Star, 
  PlayCircle, 
  BarChart2, 
  Bell, 
  Copy, 
  Check, 
  ExternalLink,
  X,
  User,
  GraduationCap,
  Share2,
  Edit3,
  Save,
  Award,
  Search,
  Layers,
  Sparkles,
  AlertCircle,
  Camera,
  XCircle
} from 'lucide-react';

interface CaDashboardProps {
  userProfile: UserProfile;
  onLogout: () => void;
  onGoHome: () => void;
}

export const CaDashboard: React.FC<CaDashboardProps> = ({
  userProfile: initialUserProfile,
  onLogout,
  onGoHome
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [activePortalTab, setActivePortalTab] = useState<'dashboard' | 'profile' | 'tasks' | 'pending' | 'leaderboard' | 'notices' | 'incentives' | 'contact'>('dashboard');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [proofUrl, setProofUrl] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Profile Edit States
  const [editingSection, setEditingSection] = useState<'personal' | 'academic' | 'social' | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    mobile: userProfile.mobile || '',
    whatsapp: userProfile.whatsapp || '',
    postalAddress: userProfile.postalAddress || '',
    gender: userProfile.gender || '',
    collegeName: userProfile.collegeName || '',
    collegeCity: userProfile.collegeCity || '',
    yearOfStudy: userProfile.yearOfStudy || '',
    facebookProfile: userProfile.facebookProfile || '',
    instagramProfile: userProfile.instagramProfile || '',
    xProfile: userProfile.xProfile || ''
  });

  // Tasks Filter & Search States (Matching Screenshot)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [quickFilter, setQuickFilter] = useState<'all' | 'urgent' | 'high_points'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest_points' | 'lowest_points'>('newest');
  const [pendingStatusFilter, setPendingStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notices state from localStorage published by Admin Panel
  const [notices] = useState<Array<{ id: string; title: string; date: string; text: string }>>(() => {
    const saved = localStorage.getItem('techkriti_ca_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { id: '1', title: 'Important Notice for All Techkriti Ambassadors', date: '2026-08-07', text: 'Task proofs are verified daily by IIT Kanpur organizers. Ensure clear screenshots or public URLs.' }
    ];
  });

  // Rewards / Incentives catalog state with localStorage persistence (controlled by Admin Panel)
  const [rewardsCatalog] = useState<RewardItem[]>(() => {
    const saved = localStorage.getItem('techkriti_rewards_catalog');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'reward-cert',
        title: 'Official Faculty Certificate',
        pts: 100,
        desc: 'Verified digital certificate signed by IIT Kanpur faculty & Dean of Student Affairs.',
        codeOrUrl: 'https://techkriti.org/certificates/verify/IITK-CA2027-CERT-8849',
        rewardType: 'url'
      },
      {
        id: 'reward-hoodie',
        title: 'Techkriti Official Hoodie & Merch Kit',
        pts: 300,
        desc: 'Customized IIT Kanpur Techkriti ambassador hoodie, merch kit & lapel pins.',
        codeOrUrl: 'TECHKRITI27-HOODIE-CLAIM-X892',
        rewardType: 'code'
      },
      {
        id: 'reward-voucher',
        title: 'Amazon Gift Voucher (₹500)',
        pts: 500,
        desc: 'E-Gift Voucher redeemable across all Amazon India purchases.',
        codeOrUrl: 'AMZ-TK27-9923-4819-2027',
        rewardType: 'code'
      },
      {
        id: 'reward-vip-pass',
        title: 'VIP Pronite Festival Pass',
        pts: 1000,
        desc: 'Front-row VIP backstage access pass for all celebrity Pronites & concerts.',
        codeOrUrl: 'https://techkriti.org/vip-pass/claim/PRO-PASS-IITK-7712',
        rewardType: 'url'
      }
    ];
  });

  const [redeemedRewardIds, setRedeemedRewardIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('techkriti_redeemed_rewards');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [activeRedeemModal, setActiveRedeemModal] = useState<RewardItem | null>(null);
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  const handleRedeemReward = (reward: RewardItem) => {
    setActiveRedeemModal(reward);
    if (!redeemedRewardIds.includes(reward.id)) {
      const updated = [...redeemedRewardIds, reward.id];
      setRedeemedRewardIds(updated);
      localStorage.setItem('techkriti_redeemed_rewards', JSON.stringify(updated));
    }
  };

  const handleCopyCodeOrUrl = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2500);
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        const updated: UserProfile = { ...userProfile, avatarUrl };
        setUserProfile(updated);
        localStorage.setItem('techkriti_ca_user_profile', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = (_section: 'personal' | 'academic' | 'social') => {
    const updated: UserProfile = {
      ...userProfile,
      ...editFormData
    };
    setUserProfile(updated);
    localStorage.setItem('techkriti_ca_user_profile', JSON.stringify(updated));
    setEditingSection(null);
  };

  // Mock Tasks Data matching exact screenshot reference items
  const [availableTasks, setAvailableTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('techkriti_ca_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // Filtered Tasks Computation
  const filteredTasks = useMemo(() => {
    return availableTasks.filter((task) => {
      // Search query filter
      const matchesSearch = searchQuery.trim() === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Domain filter
      const matchesDomain = selectedDomain === 'All Domains' || task.category === selectedDomain;

      // Quick filter pill
      let matchesQuick = true;
      if (quickFilter === 'urgent') matchesQuick = !!task.isUrgent;
      if (quickFilter === 'high_points') matchesQuick = task.points >= 200;

      return matchesSearch && matchesDomain && matchesQuick;
    }).sort((a, b) => {
      if (sortBy === 'highest_points') return b.points - a.points;
      if (sortBy === 'lowest_points') return a.points - b.points;
      return 0; // Default order
    });
  }, [availableTasks, searchQuery, selectedDomain, quickFilter, sortBy]);

  // Domain count computation
  const uniqueDomainsCount = useMemo(() => {
    const set = new Set(availableTasks.map(t => t.category));
    return set.size;
  }, [availableTasks]);

  const totalAvailablePointsSum = useMemo(() => {
    return availableTasks.reduce((acc, t) => acc + t.points, 0);
  }, [availableTasks]);

  // Mock Submissions Data
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(() => {
    const saved = localStorage.getItem('techkriti_ca_submissions');
    if (saved) {
      try {
        const allSubs = JSON.parse(saved);
        return allSubs.filter((s: any) => s.userEmail === initialUserProfile.email);
      } catch {}
    }
    return [];
  });

  // Leaderboard Data matching exact screenshot reference items
  const leaderboardData = useMemo(() => {
    const allUsers = JSON.parse(localStorage.getItem('techkriti_ca_users') || '[]');
    const allSubs = JSON.parse(localStorage.getItem('techkriti_ca_submissions') || '[]');
    return allUsers.map((u: any) => {
      const userSubs = allSubs.filter((s: any) => s.userEmail === u.email);
      const approved = userSubs.filter((s: any) => s.status === 'Approved');
      const totalPts = approved.reduce((acc: number, s: any) => acc + s.points, 0);
      return {
        rank: 0,
        name: u.name,
        college: u.collegeName || 'Unknown College',
        points: totalPts,
        approved: approved.length,
        pending: userSubs.filter((s: any) => s.status === 'Pending').length,
        avatar: u.name?.charAt(0)?.toUpperCase() || '?'
      };
    }).sort((a: any, b: any) => b.points - a.points).map((u: any, idx: number) => ({ ...u, rank: idx + 1 }));
  }, [submissions]);

  // Stats calculation
  const tasksAttempted = submissions.length;
  const tasksApproved = submissions.filter((s) => s.status === 'Approved').length;
  const tasksPending = submissions.filter((s) => s.status === 'Pending').length;
  const totalPoints = submissions
    .filter((s) => s.status === 'Approved')
    .reduce((acc, curr) => acc + curr.points, 0);

  const referralLink = `https://b4rq2cy5.insforge.site/ca?ref=${userProfile.caId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !proofUrl.trim()) return;

    const newSub: TaskSubmission = {
      id: `sub-${Date.now()}`,
      taskId: selectedTask.id,
      taskTitle: selectedTask.title,
      points: selectedTask.points,
      submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      proofUrl,
      status: 'Pending',
      userName: userProfile.name,
      userEmail: userProfile.email
    } as any; // Typecast because of extra properties

    setSubmissions([newSub, ...submissions]);
    
    // Save to shared localStorage
    const allSubs = JSON.parse(localStorage.getItem('techkriti_ca_submissions') || '[]');
    allSubs.push(newSub);
    localStorage.setItem('techkriti_ca_submissions', JSON.stringify(allSubs));

    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedTask(null);
      setProofUrl('');
      setActivePortalTab('pending');
    }, 1200);
  };

  const userInitials = userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'CA';

  useEffect(() => {
    const handleFocus = () => {
      // Re-read submissions for current user
      const saved = localStorage.getItem('techkriti_ca_submissions');
      if (saved) {
        try {
          const allSubs = JSON.parse(saved);
          setSubmissions(allSubs.filter((s: any) => s.userEmail === userProfile.email));
        } catch {}
      }
      // Re-read tasks
      const savedTasks = localStorage.getItem('techkriti_ca_tasks');
      if (savedTasks) {
        try { setAvailableTasks(JSON.parse(savedTasks)); } catch {}
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [userProfile.email]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#05030b', color: '#ffffff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      
      {/* Background Interactive Glow */}
      <InteractiveGlowBackground />

      {/* Royal Blue Ambient Background Glows */}
      <div 
        style={{
          position: 'fixed',
          top: '15%',
          left: '10%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 80%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'fixed',
          bottom: '10%',
          right: '5%',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 80%)',
          filter: 'blur(140px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Glassy Sticky Navbar */}
      <nav 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(5, 10, 24, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Brand Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', transition: 'transform 0.2s ease' }} 
          onClick={onGoHome}
          className="hover:scale-105 active:scale-95"
        >
          <TechkritiLogo height={32} />
          <span className="font-tech-heading" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
            Techkriti<span style={{ color: '#38bdf8', textShadow: '0 0 15px rgba(56, 189, 248, 0.6)' }}>'27</span>
          </span>
        </div>

        {/* Center Nav Items */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.35rem', 
            flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '0.3rem 0.5rem',
            backdropFilter: 'blur(16px)'
          }}
        >
          <button
            onClick={onGoHome}
            style={{
              padding: '0.4rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            className="hover:text-blue-400 active:scale-95"
          >
            <Home size={14} />
            <span>Home</span>
          </button>

          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'profile', label: 'Profile' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'pending', label: 'Pending' },
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'incentives', label: 'Incentives' },
            { id: 'contact', label: 'Contact' }
          ].map((tab) => {
            const isActive = activePortalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id as any)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 800 : 700,
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(56, 189, 248, 0.8))' 
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.7)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.5)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="active:scale-95"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right User Info & Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            onClick={() => setActivePortalTab('profile')} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            title="View Profile"
            className="hover:opacity-80 transition-opacity"
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', overflow: 'hidden' }}>
              {userProfile.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt={userProfile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userInitials
              )}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, textShadow: '0 0 10px rgba(56, 189, 248, 0.4)' }}>
              {userProfile.email}
            </span>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 800,
              border: '1px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            className="hover:scale-105 active:scale-95 hover:bg-red-600"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '75rem', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* ================= 1. DASHBOARD TAB ================= */}
        {activePortalTab === 'dashboard' && (
          <div key="dashboard" className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Welcome Banner */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h1 className="font-tech-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
                Welcome back, <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.7)' }}>{userProfile.name}</span>!
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem', margin: 0 }}>
                Track your progress and manage your tasks
              </p>
            </div>

            {/* 4 Top Stat Cards Grid matching Image 2 */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {/* Card 1: Tasks Attempted */}
              <div 
                className="glass-glow-card"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                  <ListChecks size={24} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                    {tasksAttempted}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.25rem' }}>
                    Tasks Attempted
                  </div>
                </div>
              </div>

              {/* Card 2: Tasks Approved */}
              <div 
                className="glass-glow-card"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                  <CheckCircle2 size={24} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                    {tasksApproved}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.25rem' }}>
                    Tasks Approved
                  </div>
                </div>
              </div>

              {/* Card 3: Pending */}
              <div 
                className="glass-glow-card"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}>
                  <Clock size={24} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                    {tasksPending}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.25rem' }}>
                    Pending
                  </div>
                </div>
              </div>

              {/* Card 4: Points Earned */}
              <div 
                className="glass-glow-card"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #eab308, #ca8a04)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}>
                  <Star size={24} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                    {totalPoints}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.25rem' }}>
                    Points Earned
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Container matching Image 2 */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <h2 className="font-tech-heading" style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 1.75rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                Quick Actions
              </h2>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {/* Action 1: Start Doing a New Task */}
                <div 
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '1.25rem',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:border-sky-400 hover:shadow-lg"
                >
                  <div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                      <PlayCircle size={24} color="#ffffff" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#ffffff' }}>
                      Start Doing a New Task
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.5rem' }}>
                      Browse and start working on available tasks
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePortalTab('tasks')}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    Browse Tasks
                  </button>
                </div>

                {/* Action 2: View Progress */}
                <div 
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '1.25rem',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:border-sky-400 hover:shadow-lg"
                >
                  <div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                      <BarChart2 size={24} color="#ffffff" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#ffffff' }}>
                      View Progress
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.5rem' }}>
                      Check your pending and completed tasks
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePortalTab('pending')}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    View Tasks
                  </button>
                </div>

                {/* Action 3: Leaderboard */}
                <div 
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '1.25rem',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:border-sky-400 hover:shadow-lg"
                >
                  <div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
                      <Trophy size={24} color="#ffffff" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#ffffff' }}>
                      Leaderboard
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.5rem' }}>
                      See where you rank among peers
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePortalTab('leaderboard')}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    Check Rank
                  </button>
                </div>

                {/* Action 4: Rewards */}
                <div 
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '1.25rem',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:border-sky-400 hover:shadow-lg"
                >
                  <div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                      <Gift size={24} color="#ffffff" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#ffffff' }}>
                      Rewards
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.5rem' }}>
                      Claim your earned incentives
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePortalTab('incentives')}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0284c7, #3b82f6)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    View Rewards
                  </button>
                </div>
              </div>
            </div>

            {/* Notices Section at Bottom of Dashboard Page */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Bell size={22} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }} />
                  <h2 className="font-tech-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '0.04em' }}>
                    Notices & Announcements
                  </h2>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  {notices.length} Published
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notices.map((notice) => (
                  <div 
                    key={notice.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '1.25rem',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', margin: 0 }}>
                        📢 {notice.title}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>
                        📅 {notice.date}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, margin: 0 }}>
                      {notice.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= 2. ENHANCED PROFILE TAB ================= */}
        {activePortalTab === 'profile' && (
          <div key="profile" className="animate-portal-tab" style={{ maxWidth: '58rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Top Profile Header Banner matching screenshot */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Avatar with verified green badge & Camera Upload Option */}
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ 
                      width: '84px', 
                      height: '84px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0284c7, #2563eb)', 
                      border: '2px solid #38bdf8', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '2rem', 
                      fontWeight: 900, 
                      color: '#ffffff', 
                      boxShadow: '0 0 25px rgba(56, 189, 248, 0.5)',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    className="group"
                    title="Click to upload profile photo"
                  >
                    {userProfile.avatarUrl ? (
                      <img src={userProfile.avatarUrl} alt={userProfile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      userInitials
                    )}
                  </div>
                  
                  {/* Camera Upload Badge */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#0284c7',
                      border: '2px solid #050a18',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
                      cursor: 'pointer'
                    }}
                    title="Upload Photo"
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Camera size={14} color="#ffffff" />
                  </button>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleAvatarFileUpload} style={{ display: 'none' }} />
                </div>

                {/* User Name & Details */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <h2 className="font-tech-heading" style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                      {userProfile.name}
                    </h2>
                    <span style={{ padding: '0.25rem 0.85rem', borderRadius: '9999px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', color: '#eab308', fontSize: '0.75rem', fontWeight: 800 }}>
                      Novice
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.35rem' }}>
                    {userProfile.email}
                  </div>
                  <div style={{ marginTop: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.85rem', borderRadius: '9999px', background: 'rgba(234, 179, 8, 0.15)', border: '1px solid rgba(234, 179, 8, 0.4)', color: '#facc15', fontSize: '0.8rem', fontWeight: 800 }}>
                    <Star size={14} fill="#facc15" />
                    <span>{totalPoints} Points</span>
                  </div>
                </div>
              </div>

              {/* Rank Badge Emblem (Top-Right) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '1rem', padding: '0.85rem 1.25rem' }}>
                <Award size={32} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, letterSpacing: '0.1em' }}>AMBASSADOR RANK</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.05em' }}>BRONZE TIER</div>
                </div>
              </div>
            </div>

            {/* Referral Link Box */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.25rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.1em' }}>YOUR UNIQUE REFERRAL LINK</span>
                <div style={{ fontSize: '0.95rem', color: '#ffffff', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                  {referralLink}
                </div>
              </div>
              <button
                onClick={handleCopyLink}
                style={{
                  padding: '0.65rem 1.35rem',
                  borderRadius: '10px',
                  background: copiedLink ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #0284c7, #2563eb)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                  transition: 'transform 0.2s ease'
                }}
                className="hover:scale-105 active:scale-95"
              >
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Section 1: 👤 Personal Information */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <User size={22} color="#38bdf8" />
                  <h3 className="font-tech-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Personal Information
                  </h3>
                </div>
                {editingSection === 'personal' ? (
                  <button
                    onClick={() => handleProfileSave('personal')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: '#22c55e', color: '#ffffff', fontWeight: 800, fontSize: '0.8rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingSection('personal')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>FULL NAME</label>
                  {editingSection === 'personal' ? (
                    <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontWeight: 600 }}>{userProfile.name}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>EMAIL</label>
                  <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>{userProfile.email}</div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>PHONE / MOBILE</label>
                  {editingSection === 'personal' ? (
                    <input type="text" value={editFormData.mobile} onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontWeight: 600 }}>{userProfile.mobile || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>CA ID</label>
                  <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', color: '#38bdf8', fontWeight: 800 }}>{userProfile.caId}</div>
                </div>
              </div>
            </div>

            {/* Section 2: 🎓 Academic Information */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <GraduationCap size={22} color="#38bdf8" />
                  <h3 className="font-tech-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Academic Information
                  </h3>
                </div>
                {editingSection === 'academic' ? (
                  <button
                    onClick={() => handleProfileSave('academic')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: '#22c55e', color: '#ffffff', fontWeight: 800, fontSize: '0.8rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingSection('academic')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>COLLEGE</label>
                  {editingSection === 'academic' ? (
                    <input type="text" value={editFormData.collegeName} onChange={(e) => setEditFormData({ ...editFormData, collegeName: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontWeight: 600 }}>{userProfile.collegeName || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>CITY</label>
                  {editingSection === 'academic' ? (
                    <input type="text" value={editFormData.collegeCity} onChange={(e) => setEditFormData({ ...editFormData, collegeCity: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontWeight: 600 }}>{userProfile.collegeCity || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>YEAR OF STUDY</label>
                  {editingSection === 'academic' ? (
                    <input type="text" value={editFormData.yearOfStudy} onChange={(e) => setEditFormData({ ...editFormData, yearOfStudy: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontWeight: 600 }}>{userProfile.yearOfStudy || 'Not provided'}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: 🌐 Social Media */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Share2 size={22} color="#38bdf8" />
                  <h3 className="font-tech-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Social Media
                  </h3>
                </div>
                {editingSection === 'social' ? (
                  <button
                    onClick={() => handleProfileSave('social')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: '#22c55e', color: '#ffffff', fontWeight: 800, fontSize: '0.8rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingSection('social')}
                    style={{ padding: '0.45rem 1.1rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {editingSection === 'social' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', marginBottom: '0.25rem' }}>Instagram Profile</label>
                    <input type="text" value={editFormData.instagramProfile} onChange={(e) => setEditFormData({ ...editFormData, instagramProfile: e.target.value })} placeholder="Instagram link" style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', marginBottom: '0.25rem' }}>Facebook Profile</label>
                    <input type="text" value={editFormData.facebookProfile} onChange={(e) => setEditFormData({ ...editFormData, facebookProfile: e.target.value })} placeholder="Facebook link" style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', marginBottom: '0.25rem' }}>X Profile</label>
                    <input type="text" value={editFormData.xProfile} onChange={(e) => setEditFormData({ ...editFormData, xProfile: e.target.value })} placeholder="X profile link" style={{ width: '100%', padding: '0.65rem', background: '#05030b', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#ffffff' }} />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {userProfile.instagramProfile ? (
                    <a href={userProfile.instagramProfile} target="_blank" rel="noreferrer" style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Instagram</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px border-dashed rgba(255, 255, 255, 0.15)', borderRadius: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
                      No Instagram profile added yet
                    </div>
                  )}

                  {userProfile.facebookProfile ? (
                    <a href={userProfile.facebookProfile} target="_blank" rel="noreferrer" style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Facebook</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px border-dashed rgba(255, 255, 255, 0.15)', borderRadius: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
                      No Facebook profile added yet
                    </div>
                  )}

                  {userProfile.xProfile ? (
                    <a href={userProfile.xProfile} target="_blank" rel="noreferrer" style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>X (Twitter)</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div style={{ padding: '0.85rem 1rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px border-dashed rgba(255, 255, 255, 0.15)', borderRadius: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
                      No X profile added yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 4: 📊 Performance Overview */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '2.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
                <BarChart2 size={22} color="#38bdf8" />
                <h3 className="font-tech-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Performance Overview
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #eab308, #ca8a04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Total Points</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{totalPoints}</div>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ListChecks size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Tasks Attempted</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{tasksAttempted}</div>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Tasks Approved</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{tasksApproved}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= 3. TASKS HUB (MATCHING USER REFERENCE SCREENSHOT) ================= */}
        {activePortalTab === 'tasks' && (
          <div key="tasks" className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Header Title matching screenshot */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                Available Tasks
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.05rem', margin: 0 }}>
                Complete tasks to earn points and climb the leaderboard
              </p>
            </div>

            {/* Search Input Bar matching screenshot */}
            <div style={{ maxWidth: '42rem', margin: '0 auto', width: '100%', position: 'relative' }}>
              <Search 
                size={20} 
                color="rgba(255, 255, 255, 0.5)" 
                style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, technologies, or domains..."
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3.25rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '14px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Domain, Quick Filters, and Sorting Controls Row matching screenshot */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1.25rem',
                padding: '0.85rem 1.25rem',
                backdropFilter: 'blur(16px)'
              }}
            >
              {/* Domain Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>Domain:</span>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(5, 10, 24, 0.85)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontWeight: 600
                  }}
                >
                  <option value="All Domains">All Domains</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Outreach">Outreach</option>
                  <option value="Hackathons & Events">Hackathons & Events</option>
                  <option value="Registrations">Registrations</option>
                </select>
              </div>

              {/* Quick Filter Pills matching screenshot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setQuickFilter('all')}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: quickFilter === 'all' ? '#2563eb' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: quickFilter === 'all' ? '1px solid #38bdf8' : '1px solid transparent',
                    boxShadow: quickFilter === 'all' ? '0 0 15px rgba(56, 189, 248, 0.4)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="active:scale-95"
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setQuickFilter('urgent')}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: quickFilter === 'urgent' ? '#dc2626' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: quickFilter === 'urgent' ? '1px solid #f87171' : '1px solid transparent',
                    boxShadow: quickFilter === 'urgent' ? '0 0 15px rgba(220, 38, 38, 0.4)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="active:scale-95"
                >
                  Urgent
                </button>
                <button
                  onClick={() => setQuickFilter('high_points')}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: quickFilter === 'high_points' ? '#0284c7' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: quickFilter === 'high_points' ? '1px solid #38bdf8' : '1px solid transparent',
                    boxShadow: quickFilter === 'high_points' ? '0 0 15px rgba(56, 189, 248, 0.4)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="active:scale-95"
                >
                  High Points
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    backgroundColor: 'rgba(5, 10, 24, 0.85)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontWeight: 600
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="highest_points">Highest Points</option>
                  <option value="lowest_points">Lowest Points</option>
                </select>
              </div>
            </div>

            {/* Task Counter Stat Bar matching screenshot */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <ListChecks size={22} color="#38bdf8" />
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  {filteredTasks.length} Tasks Available
                </span>
              </div>

              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Sparkles size={22} color="#eab308" />
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  {totalAvailablePointsSum} Total Points
                </span>
              </div>

              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Layers size={22} color="#8b5cf6" />
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  {uniqueDomainsCount} Domains
                </span>
              </div>
            </div>

            {/* Rich Task Cards Grid matching screenshot reference items */}
            {filteredTasks.length === 0 ? (
              <div className="glass-glow-card" style={{ borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Try adjusting your search term or domain filters.
              </p>
            </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
                {filteredTasks.map((task) => {
                  const existingSub = submissions.find(s => s.taskId === task.id || s.taskTitle === task.title);
                  const isApproved = existingSub?.status === 'Approved';
                  const isPending = existingSub?.status === 'Pending';
                  const isDisabled = task.isExpired || isApproved || isPending;

                  return (
                    <div 
                      key={task.id}
                      className="glass-glow-card animate-portal-tab hover:border-cyan-400/50 transition-all duration-300"
                      style={{
                        borderRadius: '1.5rem',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: isApproved ? '1px solid rgba(34, 197, 94, 0.5)' : isPending ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: isApproved ? '0 0 25px rgba(34, 197, 94, 0.2)' : isPending ? '0 0 25px rgba(245, 158, 11, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div>
                        {/* Domain Category & Active Pill */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                          <span 
                            style={{ 
                              padding: '0.3rem 0.85rem', 
                              borderRadius: '9999px', 
                              fontSize: '0.75rem', 
                              fontWeight: 800,
                              backgroundColor: 'rgba(56, 189, 248, 0.15)',
                              color: '#38bdf8',
                              border: '1px solid rgba(56, 189, 248, 0.3)'
                            }}
                          >
                            {task.category}
                          </span>

                          {isApproved ? (
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.725rem', fontWeight: 800, backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid #22c55e' }}>
                              ✓ COMPLETED
                            </span>
                          ) : isPending ? (
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.725rem', fontWeight: 800, backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b' }}>
                              ⏳ PENDING VERIFICATION
                            </span>
                          ) : (
                            <span 
                              style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.25rem 0.75rem', 
                                borderRadius: '9999px', 
                                fontSize: '0.725rem', 
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                backgroundColor: task.isExpired ? 'rgba(255, 255, 255, 0.08)' : 'rgba(34, 197, 94, 0.15)',
                                color: task.isExpired ? 'rgba(255, 255, 255, 0.5)' : '#22c55e',
                                border: task.isExpired ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #22c55e',
                                flexShrink: 0
                              }}
                            >
                              <Clock size={12} />
                              <span>{task.isExpired ? 'EXPIRED' : 'ACTIVE'}</span>
                            </span>
                          )}
                        </div>

                        {/* Title matching screenshot */}
                        <h3 className="font-tech-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.65rem', lineHeight: 1.35 }}>
                          {task.title}
                        </h3>

                        {/* Points Gold Star Pill matching screenshot */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#facc15', fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem' }}>
                          <Star size={16} fill="#facc15" />
                          <span>{task.points} Points</span>
                        </div>

                        {/* Horizontal Divider matching screenshot */}
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', marginBottom: '1.25rem' }} />

                        {/* Detailed Description matching screenshot */}
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line' }}>
                          {task.description}
                        </p>
                      </div>

                      {/* Action Button: Disabled if expired or already submitted */}
                      <div style={{ marginTop: '1.5rem' }}>
                        <button
                          onClick={() => setSelectedTask(task)}
                          disabled={isDisabled}
                          style={{
                            width: '100%',
                            padding: '0.85rem',
                            borderRadius: '12px',
                            background: isApproved
                              ? 'rgba(34, 197, 94, 0.2)'
                              : isPending
                              ? 'rgba(245, 158, 11, 0.2)'
                              : task.isExpired 
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'linear-gradient(135deg, #0284c7, #2563eb)',
                            color: isApproved
                              ? '#22c55e'
                              : isPending
                              ? '#f59e0b'
                              : task.isExpired
                              ? 'rgba(255, 255, 255, 0.4)'
                              : '#ffffff',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            border: isApproved
                              ? '1px solid #22c55e'
                              : isPending
                              ? '1px solid #f59e0b'
                              : task.isExpired
                              ? '1px solid rgba(255, 255, 255, 0.1)'
                              : 'none',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: isDisabled ? 'none' : '0 0 20px rgba(56, 189, 248, 0.4)',
                            transition: 'transform 0.2s ease'
                          }}
                          className={isDisabled ? '' : 'hover:scale-[1.02] active:scale-95'}
                        >
                          <span>
                            {isApproved
                              ? 'Points Claimed ✓'
                              : isPending
                              ? 'Under Verification ⏳'
                              : task.isExpired
                              ? 'Task Expired'
                              : 'Submit Proof →'}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Task Submission Modal */}
            {selectedTask && !selectedTask.isExpired && (
              <div 
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                <div 
                  className="glass-glow-card animate-portal-tab"
                  style={{
                    width: '100%',
                    maxWidth: '28rem',
                    borderRadius: '1.5rem',
                    padding: '2.25rem',
                    color: '#ffffff',
                    position: 'relative'
                  }}
                >
                  <button
                    onClick={() => setSelectedTask(null)}
                    style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
                    Submit Proof
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#38bdf8', margin: '0 0 1.25rem' }}>
                    {selectedTask.title} (+{selectedTask.points} PTS)
                  </p>

                  {submissionSuccess ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Submission Received!</h4>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem' }}>
                        Redirecting to Pending tab...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.4rem' }}>
                          Proof URL / Drive Link / Post Link*
                        </label>
                        <input
                          type="url"
                          required
                          value={proofUrl}
                          onChange={(e) => setProofUrl(e.target.value)}
                          placeholder="Paste screenshot link or public post URL"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            backgroundColor: '#05030b',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '10px',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '0.85rem',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
                        }}
                        className="hover:scale-105 active:scale-95"
                      >
                        Submit for Admin Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. TASK STATUS / PENDING TAB (MATCHING USER REFERENCE SCREENSHOT) ================= */}
        {activePortalTab === 'pending' && (
          <div key="pending" className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Header Title matching screenshot */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                Task Status
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.05rem', margin: 0 }}>
                Track the status of your submitted tasks and get feedback
              </p>
            </div>

            {/* Filter Pills Centered Row matching screenshot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `All (${submissions.length})` },
                { id: 'pending', label: `Pending (${submissions.filter(s => s.status === 'Pending').length})` },
                { id: 'approved', label: `Approved (${submissions.filter(s => s.status === 'Approved').length})` },
                { id: 'rejected', label: `Rejected (${submissions.filter(s => s.status === 'Rejected').length})` }
              ].map((pill) => {
                const isActive = pendingStatusFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setPendingStatusFilter(pill.id as any)}
                    style={{
                      padding: '0.5rem 1.35rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 800 : 700,
                      backgroundColor: isActive 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(56, 189, 248, 0.8))' 
                        : 'rgba(15, 23, 42, 0.6)',
                      background: isActive ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'rgba(15, 23, 42, 0.6)',
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                      border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: isActive ? '0 0 20px rgba(56, 189, 248, 0.5)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    className="active:scale-95"
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* 4 Summary Stat Boxes Grid matching screenshot */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {/* Box 1: Tasks Pending */}
              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} color="#f59e0b" />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  Tasks Pending : <span style={{ color: '#f59e0b' }}>{submissions.filter(s => s.status === 'Pending').length}</span>
                </span>
              </div>

              {/* Box 2: Tasks Approved */}
              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  Tasks Approved : <span style={{ color: '#22c55e' }}>{submissions.filter(s => s.status === 'Approved').length}</span>
                </span>
              </div>

              {/* Box 3: Tasks Rejected */}
              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={18} color="#ef4444" />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  Tasks Rejected : <span style={{ color: '#ef4444' }}>{submissions.filter(s => s.status === 'Rejected').length}</span>
                </span>
              </div>

              {/* Box 4: Points Awarded */}
              <div className="glass-glow-card" style={{ borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} color="#facc15" fill="#facc15" />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  Points Awarded : <span style={{ color: '#facc15' }}>{totalPoints}</span>
                </span>
              </div>
            </div>

            {/* Submissions Table / Cards Container */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '1.75rem',
                overflowX: 'auto'
              }}
            >
              {submissions.filter(s => pendingStatusFilter === 'all' ? true : s.status.toLowerCase() === pendingStatusFilter).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <AlertCircle size={40} color="#38bdf8" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    No {pendingStatusFilter !== 'all' ? pendingStatusFilter : ''} task submissions
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                    When you submit task proofs from the Tasks tab, they will appear here for verification.
                  </p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: '#38bdf8', fontSize: '0.85rem' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Task Title</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Points</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Submitted At</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Proof Link</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions
                      .filter(s => pendingStatusFilter === 'all' ? true : s.status.toLowerCase() === pendingStatusFilter)
                      .map((sub) => (
                        <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.9rem' }}>
                          <td style={{ padding: '1rem', fontWeight: 600 }}>{sub.taskTitle}</td>
                          <td style={{ padding: '1rem', color: '#eab308', fontWeight: 700 }}>+{sub.points} PTS</td>
                          <td style={{ padding: '1rem', color: 'rgba(255, 255, 255, 0.65)' }}>{sub.submittedAt}</td>
                          <td style={{ padding: '1rem' }}>
                            <a href={sub.proofUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                              <span>View Proof</span>
                              <ExternalLink size={13} />
                            </a>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span 
                              style={{
                                padding: '0.35rem 0.85rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                background: sub.status === 'Approved' ? 'rgba(34, 197, 94, 0.15)' : sub.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                color: sub.status === 'Approved' ? '#22c55e' : sub.status === 'Rejected' ? '#ef4444' : '#f59e0b',
                                border: sub.status === 'Approved' ? '1px solid #22c55e' : sub.status === 'Rejected' ? '1px solid #ef4444' : '1px solid #f59e0b'
                              }}
                            >
                              {sub.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ================= 5. LEADERBOARD TAB (MATCHING USER REFERENCE SCREENSHOT 1:1) ================= */}
        {activePortalTab === 'leaderboard' && (
          <div key="leaderboard" className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Top User Rank Banner matching screenshot */}
            <div 
              className="glass-glow-card"
              style={{
                borderRadius: '1.5rem',
                padding: '1.75rem 2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span className="font-tech-heading" style={{ fontSize: '2.75rem', fontWeight: 900, color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.7)' }}>
                  #9
                </span>
                <div>
                  <h3 className="font-tech-heading" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.25rem', color: '#ffffff' }}>
                    Your Current Rank
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    Keep completing tasks to climb higher!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Star size={14} fill="#38bdf8" />
                  <span>{totalPoints} Points</span>
                </div>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#22c55e', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} />
                  <span>{tasksApproved} Approved</span>
                </div>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ListChecks size={14} />
                  <span>{tasksAttempted} Attempted</span>
                </div>
              </div>
            </div>

            {/* Top 3 Performers Section matching screenshot */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <h3 className="font-tech-heading" style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  Top 3 Performers
                </h3>
                <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #38bdf8, #2563eb)', margin: '0 auto', borderRadius: '9999px' }} />
              </div>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'end'
                }}
              >
                {/* Rank 2 (Silver - Left) */}
                <div 
                  className="glass-glow-card hover:scale-[1.02] transition-all"
                  style={{
                    borderRadius: '1.5rem',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    border: '1px solid rgba(226, 232, 240, 0.4) !important',
                    boxShadow: '0 0 25px rgba(226, 232, 240, 0.2)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <span>🥈 2</span>
                  </div>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto 1rem', overflow: 'hidden', border: '3px solid #e2e8f0', boxShadow: '0 0 15px rgba(226, 232, 240, 0.5)' }}>
                    <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem' }}>
                    {leaderboardData[1].name}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.25rem', lineHeight: 1.4, minHeight: '2.5rem' }}>
                    {leaderboardData[1].college}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800 }}>
                      {leaderboardData[1].points} pts
                    </span>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 800 }}>
                      {leaderboardData[1].level}
                    </span>
                  </div>
                </div>

                {/* Rank 1 (Gold - Center) */}
                <div 
                  className="glass-glow-card hover:scale-[1.03] transition-all"
                  style={{
                    borderRadius: '1.75rem',
                    padding: '2.5rem 1.75rem',
                    textAlign: 'center',
                    border: '1.5px solid rgba(234, 179, 8, 0.7) !important',
                    boxShadow: '0 0 35px rgba(234, 179, 8, 0.35)',
                    transform: 'translateY(-10px)'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#facc15', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <span>🥇 1</span>
                  </div>
                  <div style={{ width: '84px', height: '84px', borderRadius: '50%', margin: '0 auto 1rem', overflow: 'hidden', border: '3.5px solid #facc15', boxShadow: '0 0 25px rgba(234, 179, 8, 0.6)' }}>
                    <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.35rem' }}>
                    {leaderboardData[0].name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 1.25rem', lineHeight: 1.4, minHeight: '2.5rem' }}>
                    {leaderboardData[0].college}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', color: '#facc15', fontSize: '0.8rem', fontWeight: 800 }}>
                      {leaderboardData[0].points} pts
                    </span>
                    <span style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', fontSize: '0.8rem', fontWeight: 800 }}>
                      {leaderboardData[0].level}
                    </span>
                  </div>
                </div>

                {/* Rank 3 (Bronze - Right) */}
                <div 
                  className="glass-glow-card hover:scale-[1.02] transition-all"
                  style={{
                    borderRadius: '1.5rem',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    border: '1px solid rgba(217, 119, 6, 0.5) !important',
                    boxShadow: '0 0 25px rgba(217, 119, 6, 0.2)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#d97706', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <span>🥉 3</span>
                  </div>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto 1rem', overflow: 'hidden', border: '3px solid #d97706', boxShadow: '0 0 15px rgba(217, 119, 6, 0.5)' }}>
                    <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem' }}>
                    {leaderboardData[2].name}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 1.25rem', lineHeight: 1.4, minHeight: '2.5rem' }}>
                    {leaderboardData[2].college}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800 }}>
                      {leaderboardData[2].points} pts
                    </span>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 800 }}>
                      {leaderboardData[2].level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Rankings Table matching screenshot */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 className="font-tech-heading" style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  Full Rankings
                </h3>
                <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #38bdf8, #2563eb)', margin: '0 auto', borderRadius: '9999px' }} />
              </div>

              <div 
                className="glass-glow-card"
                style={{
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  overflowX: 'auto'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>RANK</th>
                      <th style={{ padding: '0.85rem 1rem' }}>USER</th>
                      <th style={{ padding: '0.85rem 1rem' }}>COLLEGE</th>
                      <th style={{ padding: '0.85rem 1rem' }}>LEVEL</th>
                      <th style={{ padding: '0.85rem 1rem' }}>POINTS</th>
                      <th style={{ padding: '0.85rem 1rem' }}>TASKS APPROVED</th>
                      <th style={{ padding: '0.85rem 1rem' }}>TASKS ATTEMPTED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((row: any) => {
                      const isTop1 = row.rank === 1;
                      const isTop2 = row.rank === 2;
                      const isTop3 = row.rank === 3;
                      const rankBg = isTop1 ? '#eab308' : isTop2 ? '#cbd5e1' : isTop3 ? '#d97706' : '#2563eb';

                      return (
                        <tr 
                          key={row.rank} 
                          style={{ 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
                            fontSize: '0.9rem',
                            background: row.name === userProfile.name ? 'rgba(56, 189, 248, 0.16)' : 'transparent'
                          }}
                        >
                          <td style={{ padding: '1rem' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: rankBg, color: '#ffffff', fontWeight: 900, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                              {row.rank}
                            </div>
                          </td>

                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.4)', flexShrink: 0 }}>
                                {row.avatar ? (
                                  <img src={row.avatar} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: '100%', height: '100%', background: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                                    {row.name.substring(0, 2).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <span style={{ fontWeight: 700, color: row.name === userProfile.name ? '#38bdf8' : '#ffffff' }}>
                                {row.name} {row.name === userProfile.name && '(You)'}
                              </span>
                            </div>
                          </td>

                          <td style={{ padding: '1rem', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>
                            {row.college}
                          </td>

                          <td style={{ padding: '1rem' }}>
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(45, 212, 191, 0.3)' }}>
                              {row.level}
                            </span>
                          </td>

                          <td style={{ padding: '1rem', color: '#facc15', fontWeight: 900 }}>
                            {row.points} pts
                          </td>

                          <td style={{ padding: '1rem', color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
                            {row.approved}
                          </td>

                          <td style={{ padding: '1rem', color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
                            {row.attempted}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}



        {/* ================= 6. INCENTIVES & REDEEM REWARDS TAB ================= */}
        {activePortalTab === 'incentives' && (
          <div key="incentives" className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
                REWARDS & REDEMPTION HUB 🎁
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem', margin: 0 }}>
                Earn points by completing tasks, then click to instantly redeem your reward codes & claim URLs!
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>
                <Star size={16} fill="#facc15" color="#facc15" />
                <span>Your Balance: {totalPoints} Points</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {rewardsCatalog.map((item) => {
                const isRedeemed = redeemedRewardIds.includes(item.id);
                const isUnlocked = totalPoints >= item.pts;

                return (
                  <div
                    key={item.id}
                    className="glass-glow-card animate-portal-tab"
                    style={{
                      borderRadius: '1.25rem',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      border: isRedeemed
                        ? '1.5px solid #22c55e !important'
                        : isUnlocked
                        ? '1.5px solid #38bdf8 !important'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isRedeemed
                        ? '0 0 25px rgba(34, 197, 94, 0.25)'
                        : isUnlocked
                        ? '0 0 25px rgba(56, 189, 248, 0.25)'
                        : 'none'
                    }}
                  >
                    <div>
                      <div 
                        style={{
                          display: 'inline-block',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          background: isRedeemed
                            ? 'rgba(34, 197, 94, 0.2)'
                            : isUnlocked
                            ? 'rgba(56, 189, 248, 0.2)'
                            : 'rgba(255, 255, 255, 0.08)',
                          color: isRedeemed ? '#22c55e' : isUnlocked ? '#38bdf8' : 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          marginBottom: '1rem'
                        }}
                      >
                        {isRedeemed ? 'REDEEMED ✅' : isUnlocked ? 'READY TO REDEEM 🎁' : `Requires ${item.pts} PTS`}
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#ffffff' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Redeem / Claim Action Button */}
                    <div>
                      {isRedeemed ? (
                        <button
                          onClick={() => handleRedeemReward(item)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            background: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid #22c55e',
                            color: '#22c55e',
                            fontWeight: 800,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem'
                          }}
                          className="hover:bg-emerald-500/30 active:scale-95 transition-all"
                        >
                          <Check size={16} />
                          <span>View Reward Code ✅</span>
                        </button>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleRedeemReward(item)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem'
                          }}
                          className="hover:scale-105 active:scale-95 transition-all animate-pulse"
                        >
                          <Gift size={16} />
                          <span>Redeem Reward 🎁</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'not-allowed'
                          }}
                        >
                          🔒 Need {item.pts - totalPoints} More Points
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CELEBRATORY REWARD REDEMPTION POPUP MODAL */}
        {activeRedeemModal && (
          <div
            style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }}
        >
          <div
            className="glass-glow-card animate-portal-tab"
            style={{
              width: '100%',
              maxWidth: '30rem',
              borderRadius: '1.75rem',
              padding: '2.25rem',
              textAlign: 'center',
              border: '1.5px solid rgba(56, 189, 248, 0.5)',
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.4)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveRedeemModal(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>

            {/* Sparkle Graphics */}
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 30px rgba(16, 185, 129, 0.7)' }}>
              <Gift size={32} color="#ffffff" className="animate-bounce" />
            </div>

            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>
              🎉 CONGRATULATIONS! REWARD UNLOCKED
            </span>

            <h3 className="font-tech-heading" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem' }}>
              {activeRedeemModal.title}
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
              {activeRedeemModal.desc}
            </p>

            {/* Code / URL Display Container */}
            <div style={{ backgroundColor: '#04151f', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>
                {activeRedeemModal.rewardType === 'url' ? '🔗 YOUR REDEMPTION URL' : '🔑 YOUR VOUCHER / REWARD CODE'}
              </span>

              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#34d399', letterSpacing: activeRedeemModal.rewardType === 'code' ? '0.08em' : 'normal', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {activeRedeemModal.codeOrUrl}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', width: '100%' }}>
                <button
                  onClick={() => handleCopyCodeOrUrl(activeRedeemModal.codeOrUrl)}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                  className="hover:bg-cyan-500/30 active:scale-95 transition-all"
                >
                  {isCopiedCode ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                  <span>{isCopiedCode ? 'Copied to Clipboard! ✅' : activeRedeemModal.rewardType === 'url' ? 'Copy Link 📋' : 'Copy Code 📋'}</span>
                </button>

                {activeRedeemModal.rewardType === 'url' && (
                  <a
                    href={activeRedeemModal.codeOrUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '0.65rem 1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    className="hover:scale-105 active:scale-95"
                  >
                    <span>Open Link 🔗</span>
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveRedeemModal(null)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
              className="hover:bg-white/20 active:scale-95"
            >
              Close & Done
            </button>
          </div>
        </div>
      )}

        {/* ================= 7. CONTACT TAB ================= */}
        {activePortalTab === 'contact' && (
          <div key="contact" className="animate-portal-tab" style={{ maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
              CA SUPPORT DESK
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem', marginBottom: '2rem' }}>
              Need help with task submissions or referral tracking?
            </p>

            <div className="glass-glow-card" style={{ borderRadius: '1.5rem', padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.08em' }}>OFFICIAL CA EMAIL</span>
                <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, marginTop: '0.2rem' }}>ca@techkriti.org</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.08em' }}>IITK CAMPUS HELPLINE</span>
                <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, marginTop: '0.2rem' }}>+91 512 259 7787</div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
