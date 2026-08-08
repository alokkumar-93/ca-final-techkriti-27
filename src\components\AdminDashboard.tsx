import React, { useState, useEffect } from 'react';
import type { UserProfile, TaskItem, TaskSubmission, RewardItem } from '../types/user';
import { 
  ShieldCheck, 
  CheckCircle2, 
  PlusCircle, 
  Users, 
  ListChecks, 
  Bell,
  Home,
  RotateCcw,
  Inbox,
  Gift
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onGoHome: () => void;
  onGoCaPortal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onGoHome,
  onGoCaPortal
}) => {
  const [activeTab, setActiveTab] = useState<'create-task' | 'all-tasks' | 'requests' | 'users' | 'notices' | 'rewards'>('create-task');

  // Re-sync data from localStorage on window focus
  useEffect(() => {
    const handleFocus = () => {
      const savedUsers = localStorage.getItem('techkriti_ca_users');
      if (savedUsers) {
        try {
          const users = JSON.parse(savedUsers);
          const allSubs = JSON.parse(localStorage.getItem('techkriti_ca_submissions') || '[]');
          setCaUsers(users.map((u: any, idx: number) => {
            const userSubs = allSubs.filter((s: any) => s.userEmail === u.email);
            const approvedPts = userSubs.filter((s: any) => s.status === 'Approved').reduce((acc: number, s: any) => acc + s.points, 0);
            return { ...u, points: approvedPts, rank: idx + 1, tasksCount: userSubs.length };
          }));
        } catch {}
      }
      const savedSubs = localStorage.getItem('techkriti_ca_submissions');
      if (savedSubs) { try { setSubmissions(JSON.parse(savedSubs)); } catch {} }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  
  // Create Task Form State (Matching Reference Screenshot 100%)
  const [createTaskForm, setCreateTaskForm] = useState({
    title: '',
    content: '',
    domain: 'Select domain',
    difficulty: 'Medium',
    estimatedTime: '',
    taskLink: '',
    points: '',
    deadline: '',
    technologies: '',
    submissionGuidelines: ''
  });

  const [formNotice, setFormNotice] = useState<string | null>(null);

  // Mock Proof Submissions Data for Verification (Matching User Screenshots 100%)
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(() => {
    const saved = localStorage.getItem('techkriti_ca_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  const [requestSearchQuery, setRequestSearchQuery] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Review Modal state
  const [selectedReviewSub, setSelectedReviewSub] = useState<TaskSubmission | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [reviewPointsToAward, setReviewPointsToAward] = useState<number>(0);

  const handleOpenReviewModal = (sub: TaskSubmission) => {
    setSelectedReviewSub(sub);
    setReviewFeedback(sub.feedback || '');
    setReviewPointsToAward(sub.points || 0);
  };

  const handleModalApprove = () => {
    if (!selectedReviewSub) return;
    const updatedSubs = submissions.map((s) =>
      s.id === selectedReviewSub.id
        ? { ...s, status: 'Approved' as const, points: reviewPointsToAward, feedback: reviewFeedback || 'Verified by Admin' }
        : s
    );
    setSubmissions(updatedSubs);
    localStorage.setItem('techkriti_ca_submissions', JSON.stringify(updatedSubs));
    setSelectedReviewSub(null);
  };

  const handleModalReject = () => {
    if (!selectedReviewSub) return;
    const updatedSubs = submissions.map((s) =>
      s.id === selectedReviewSub.id
        ? { ...s, status: 'Rejected' as const, points: 0, feedback: reviewFeedback || 'Submission rejected by Admin' }
        : s
    );
    setSubmissions(updatedSubs);
    localStorage.setItem('techkriti_ca_submissions', JSON.stringify(updatedSubs));
    setSelectedReviewSub(null);
  };

  const handleDeleteSubmission = (id: string) => {
    if (confirm('Delete this submission request?')) {
      const updatedSubs = submissions.filter((s) => s.id !== id);
      setSubmissions(updatedSubs);
      localStorage.setItem('techkriti_ca_submissions', JSON.stringify(updatedSubs));
    }
  };

  // Mock Active Tasks Data matching user screenshot reference items 1:1
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('techkriti_ca_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // Mock Registered CA Users Data
  const [caUsers, setCaUsers] = useState<(UserProfile & { points: number; rank: number; tasksCount: number })[]>(() => {
    const saved = localStorage.getItem('techkriti_ca_users');
    if (saved) {
      try {
        const users = JSON.parse(saved);
        // Enrich with submission-based stats
        const allSubs = JSON.parse(localStorage.getItem('techkriti_ca_submissions') || '[]');
        return users.map((u: any, idx: number) => {
          const userSubs = allSubs.filter((s: any) => s.userEmail === u.email);
          const approvedPts = userSubs.filter((s: any) => s.status === 'Approved').reduce((acc: number, s: any) => acc + s.points, 0);
          return { ...u, points: approvedPts, rank: idx + 1, tasksCount: userSubs.length };
        });
      } catch {}
    }
    return [];
  });

  // Notice Board announcements state with localStorage persistence
  const [notices, setNotices] = useState<Array<{ id: string; title: string; date: string; text: string }>>(() => {
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
  const [newNoticeText, setNewNoticeText] = useState('');

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;
    const updated = [
      { id: String(Date.now()), title: 'Official Announcement', date: new Date().toLocaleDateString(), text: newNoticeText },
      ...notices
    ];
    setNotices(updated);
    localStorage.setItem('techkriti_ca_notices', JSON.stringify(updated));
    setNewNoticeText('');
    alert('Notice broadcasted live to all Campus Ambassadors!');
  };

  // Rewards catalog state with localStorage persistence
  const [rewardsList, setRewardsList] = useState<RewardItem[]>(() => {
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

  const [createRewardForm, setCreateRewardForm] = useState({
    title: '',
    pts: '',
    desc: '',
    codeOrUrl: '',
    rewardType: 'code' as 'code' | 'url'
  });

  const handleCreateRewardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createRewardForm.title || !createRewardForm.codeOrUrl) {
      alert('Please fill in Reward Title and Code / URL!');
      return;
    }

    const newReward: RewardItem = {
      id: `reward-${Date.now()}`,
      title: createRewardForm.title,
      pts: Number(createRewardForm.pts) || 100,
      desc: createRewardForm.desc || 'Exclusive ambassador reward perk.',
      codeOrUrl: createRewardForm.codeOrUrl,
      rewardType: createRewardForm.rewardType
    };

    const updated = [...rewardsList, newReward];
    setRewardsList(updated);
    localStorage.setItem('techkriti_rewards_catalog', JSON.stringify(updated));
    setCreateRewardForm({ title: '', pts: '', desc: '', codeOrUrl: '', rewardType: 'code' });
    alert('Reward added & synced live to Ambassador Portal!');
  };

  const handleDeleteReward = (id: string) => {
    if (confirm('Delete this reward item?')) {
      const updated = rewardsList.filter((r) => r.id !== id);
      setRewardsList(updated);
      localStorage.setItem('techkriti_rewards_catalog', JSON.stringify(updated));
    }
  };

  // Form Submit Handler matching screenshot
  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTaskForm.title || !createTaskForm.content) {
      alert('Please fill in Task Title and Task Content!');
      return;
    }

    const newTaskItem: TaskItem = {
      id: `task-${Date.now()}`,
      title: createTaskForm.title,
      description: createTaskForm.content,
      points: Number(createTaskForm.points) || 100,
      category: createTaskForm.domain !== 'Select domain' ? createTaskForm.domain : 'General',
      deadline: createTaskForm.deadline ? `Active (${createTaskForm.deadline})` : 'Active',
      instructions: createTaskForm.submissionGuidelines || 'Upload valid screenshot or public link.',
      isExpired: false
    };

    const updatedTasks = [newTaskItem, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('techkriti_ca_tasks', JSON.stringify(updatedTasks));
    setFormNotice('Task published successfully!');
    setTimeout(() => setFormNotice(null), 3000);

    // Reset Form
    handleResetForm();
    setActiveTab('all-tasks');
  };

  const handleResetForm = () => {
    setCreateTaskForm({
      title: '',
      content: '',
      domain: 'Select domain',
      difficulty: 'Medium',
      estimatedTime: '',
      taskLink: '',
      points: '',
      deadline: '',
      technologies: '',
      submissionGuidelines: ''
    });
  };



  const handleDeleteTask = (id: string) => {
    if (confirm('Delete this task permanently?')) {
      const updated = tasks.filter((t) => t.id !== id);
      setTasks(updated);
      localStorage.setItem('techkriti_ca_tasks', JSON.stringify(updated));
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#04151f', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ================= LEFT SIDEBAR (GREENISH-BLUE / TEAL AQUA THEME) ================= */}
      <aside 
        style={{ 
          width: '260px', 
          backgroundColor: '#061a25', 
          borderRight: '1px solid rgba(6, 182, 212, 0.2)', 
          padding: '1.5rem 1rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div>
          {/* Admin Panel Header Logo Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.75rem', borderBottom: '1px solid rgba(6, 182, 212, 0.15)' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 0 18px rgba(6, 182, 212, 0.5)' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-tech-heading" style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '0.02em' }}>
                Admin Panel
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600 }}>
                Techkriti'27
              </span>
            </div>
          </div>

          {/* Navigation Links List */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {/* Nav Item 1: Create Task (Teal / Emerald Aqua Primary Button) */}
            <button
              onClick={() => setActiveTab('create-task')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: activeTab === 'create-task' ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'rgba(6, 182, 212, 0.15)',
                color: activeTab === 'create-task' ? '#ffffff' : '#2dd4bf',
                border: activeTab === 'create-task' ? 'none' : '1px solid rgba(6, 182, 212, 0.35)',
                fontWeight: 800,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                boxShadow: activeTab === 'create-task' ? '0 0 20px rgba(6, 182, 212, 0.45)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="hover:scale-[1.02] active:scale-95"
            >
              <PlusCircle size={18} />
              <span>Create Task</span>
            </button>

            {/* Nav Item 2: All Tasks */}
            <button
              onClick={() => setActiveTab('all-tasks')}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: activeTab === 'all-tasks' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: activeTab === 'all-tasks' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                color: activeTab === 'all-tasks' ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                fontWeight: activeTab === 'all-tasks' ? 800 : 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <ListChecks size={16} />
              <span>All Tasks ({tasks.length})</span>
            </button>

            {/* Nav Item 3: All Requests (Verification Submissions Queue) */}
            <button
              onClick={() => setActiveTab('requests')}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: activeTab === 'requests' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: activeTab === 'requests' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                color: activeTab === 'requests' ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                fontWeight: activeTab === 'requests' ? 800 : 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Inbox size={16} />
              <span>All Requests ({submissions.filter(s => s.status === 'Pending').length})</span>
            </button>

            {/* Nav Item 4: All Users */}
            <button
              onClick={() => setActiveTab('users')}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: activeTab === 'users' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: activeTab === 'users' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                color: activeTab === 'users' ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                fontWeight: activeTab === 'users' ? 800 : 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Users size={16} />
              <span>All Users ({caUsers.length})</span>
            </button>

            {/* Nav Item 5: Notices */}
            <button
              onClick={() => setActiveTab('notices')}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: activeTab === 'notices' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: activeTab === 'notices' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                color: activeTab === 'notices' ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                fontWeight: activeTab === 'notices' ? 800 : 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Bell size={16} />
              <span>Notices ({notices.length})</span>
            </button>

            {/* Nav Item 6: Rewards & Incentives */}
            <button
              onClick={() => setActiveTab('rewards')}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: activeTab === 'rewards' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: activeTab === 'rewards' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                color: activeTab === 'rewards' ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                fontWeight: activeTab === 'rewards' ? 800 : 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Gift size={16} />
              <span>Rewards Control ({rewardsList.length})</span>
            </button>
          </div>
        </div>

        {/* Sidebar Bottom Action Buttons */}
        <div style={{ borderTop: '1px solid rgba(6, 182, 212, 0.15)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={onGoCaPortal}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            CA Portal View →
          </button>
          
          <button
            onClick={onGoHome}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Home size={14} />
            <span>Go to Home</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT CONTAINER (GREENISH-BLUE THEME) ================= */}
      <main style={{ flex: 1, backgroundColor: '#04151f', padding: '2.5rem 2rem', overflowY: 'auto' }}>
        
        {formNotice && (
          <div style={{ maxWidth: '44rem', margin: '0 auto 1.5rem', padding: '0.85rem 1.25rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{formNotice}</span>
          </div>
        )}

        {/* TAB 1: CREATE NEW TASK FORM */}
        {activeTab === 'create-task' && (
          <div className="animate-portal-tab" style={{ maxWidth: '44rem', margin: '0 auto' }}>
            
            <div 
              style={{
                backgroundColor: '#0a2330',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                borderRadius: '1.5rem',
                padding: '2.5rem 2.25rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Form Title Header matching screenshot */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #10b981)', color: '#ffffff', marginBottom: '0.75rem', boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
                  <PlusCircle size={26} />
                </div>
                <h2 className="font-tech-heading" style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.35rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                  Create New Task
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#2dd4bf', margin: 0, fontWeight: 600 }}>
                  Add a new task to the system for users to complete
                </p>
                <div style={{ width: '100%', height: '1px', background: 'rgba(6, 182, 212, 0.2)', marginTop: '1.5rem' }} />
              </div>

              {/* Form Fields matching screenshot */}
              <form onSubmit={handleCreateTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                
                {/* 1. Task Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Task Title*
                  </label>
                  <input
                    type="text"
                    required
                    value={createTaskForm.title}
                    onChange={(e) => setCreateTaskForm({ ...createTaskForm, title: e.target.value })}
                    placeholder="Enter task title"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#04151f',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* 2. Task Content (Textarea) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Task Content*
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={createTaskForm.content}
                    onChange={(e) => setCreateTaskForm({ ...createTaskForm, content: e.target.value })}
                    placeholder="Enter detailed task description..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#04151f',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </div>

                {/* 3 & 4. Grid Row 1: Domain / Category & Difficulty */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Domain / Category
                    </label>
                    <select
                      value={createTaskForm.domain}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, domain: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Select domain">Select domain</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Hackathons & Events">Hackathons & Events</option>
                      <option value="Registrations">Registrations</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Difficulty
                    </label>
                    <select
                      value={createTaskForm.difficulty}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, difficulty: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* 5 & 6. Grid Row 2: Estimated Time & Task Link */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      value={createTaskForm.estimatedTime}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, estimatedTime: e.target.value })}
                      placeholder="e.g., 4-6 hours"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Task Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={createTaskForm.taskLink}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, taskLink: e.target.value })}
                      placeholder="Enter task link"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* 7 & 8. Grid Row 3: Task Points & Deadline */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Task Points*
                    </label>
                    <input
                      type="number"
                      required
                      value={createTaskForm.points}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, points: e.target.value })}
                      placeholder="Enter points"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={createTaskForm.deadline}
                      onChange={(e) => setCreateTaskForm({ ...createTaskForm, deadline: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#04151f',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* 9. Technologies (comma-separated) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={createTaskForm.technologies}
                    onChange={(e) => setCreateTaskForm({ ...createTaskForm, technologies: e.target.value })}
                    placeholder="e.g., React, Node.js, MongoDB"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#04151f',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* 10. Task Images (Multiple) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Task Images (Multiple)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      backgroundColor: '#04151f',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '10px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.35rem' }}>
                    Select multiple images to upload
                  </span>
                </div>

                {/* 11. Submission Guidelines */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Submission Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={createTaskForm.submissionGuidelines}
                    onChange={(e) => setCreateTaskForm({ ...createTaskForm, submissionGuidelines: e.target.value })}
                    placeholder="Provide instructions for how to submit this task..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#04151f',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </div>

                {/* Action Buttons matching screenshot */}
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 0 25px rgba(6, 182, 212, 0.45)'
                    }}
                    className="hover:scale-[1.01] active:scale-95 transition-transform"
                  >
                    <PlusCircle size={18} />
                    <span>Create Task</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    className="hover:bg-white/15"
                  >
                    <RotateCcw size={15} />
                    <span>Reset Form</span>
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}

        {/* TAB 2: ALL TASKS (MATCHING USER REFERENCE SCREENSHOT 100% IN OUR GREENISH-BLUE THEME) */}
        {activeTab === 'all-tasks' && (
          <div className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Header Title & Stat Pill matching reference screenshot */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 0.35rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <ListChecks size={32} color="#06b6d4" />
                <span>All Tasks</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.85rem' }}>
                Manage and edit all available tasks in the system
              </p>
              <span style={{ padding: '0.35rem 1.25rem', borderRadius: '9999px', backgroundColor: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800 }}>
                {tasks.length} Tasks
              </span>
            </div>

            {/* 2-Column Task Cards Grid matching reference screenshot 100% */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  style={{ 
                    backgroundColor: '#0a2330', 
                    border: '1px solid rgba(6, 182, 212, 0.3)', 
                    borderRadius: '1.25rem', 
                    padding: '1.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    gap: '1.25rem' 
                  }}
                >
                  <div>
                    {/* Card Top Row: Task Title + Edit & Delete Buttons matching screenshot */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(6, 182, 212, 0.2)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <h3 className="font-tech-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.35, flex: 1 }}>
                        {task.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                          onClick={() => alert(`Editing task: ${task.title}`)}
                          style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', background: '#10b981', color: '#ffffff', fontSize: '0.775rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          className="hover:bg-emerald-600 active:scale-95"
                        >
                          <span>📝 Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', background: '#ef4444', color: '#ffffff', fontSize: '0.775rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          className="hover:bg-red-600 active:scale-95"
                        >
                          <span>🗑️ Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Task Description Body matching screenshot */}
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, margin: '0 0 1rem', whiteSpace: 'pre-line' }}>
                      {task.description}
                    </p>

                    {/* Task Link (if present) matching screenshot */}
                    {task.taskLink && (
                      <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
                        <a href={task.taskLink} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>🔗 {task.taskLink}</span>
                        </a>
                      </div>
                    )}

                    {/* Domain & Difficulty Badges Row matching screenshot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Domain:</span>
                        <span style={{ padding: '0.2rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(6, 182, 212, 0.25)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(6, 182, 212, 0.4)' }}>
                          {task.category}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Difficulty:</span>
                        <span style={{ padding: '0.2rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(245, 158, 11, 0.25)', color: '#f59e0b', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                          {task.difficulty || 'Medium'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dark Inner Metadata Box at Card Bottom matching screenshot */}
                  <div style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(250, 204, 21, 0.15)', color: '#facc15', fontSize: '0.8rem', fontWeight: 900, border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                        🪙 {task.points} Points
                      </span>
                      <span style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(244, 114, 182, 0.15)', color: '#f472b6', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(244, 114, 182, 0.3)' }}>
                        📅 Deadline: {task.deadline}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
                      <span style={{ padding: '0.25rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                        🕒 Created: {task.createdAt || 'March 7, 2026 at 11:52 AM'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ALL UPLOAD REQUESTS (MATCHING USER SCREENSHOT 100% IN OUR GREENISH-BLUE THEME) */}
        {activeTab === 'requests' && (
          <div className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Page Header */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 0.35rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <Inbox size={32} color="#06b6d4" />
                <span>All Upload Requests</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.85rem' }}>
                Review and manage task submissions from users
              </p>
              <span style={{ padding: '0.35rem 1.25rem', borderRadius: '9999px', backgroundColor: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800 }}>
                {submissions.length} Requests
              </span>
            </div>

            {/* Search Input */}
            <div style={{ maxWidth: '32rem', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '9999px', padding: '0.65rem 1.25rem', width: '100%' }}>
                <input
                  type="text"
                  value={requestSearchQuery}
                  onChange={(e) => setRequestSearchQuery(e.target.value)}
                  placeholder="Search by user name, email, or task title..."
                  style={{ width: '100%', background: 'none', border: 'none', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                />
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>🔍</span>
              </div>
            </div>

            {/* Filter by Status Pill Container */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.25rem', padding: '0.75rem 1.5rem', maxWidth: '24rem', margin: '0 auto', width: '100%' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)' }}>Filter by Status:</span>
              <select
                value={requestStatusFilter}
                onChange={(e) => setRequestStatusFilter(e.target.value as any)}
                style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', padding: '0.4rem 0.85rem', fontSize: '0.85rem', outline: 'none', fontWeight: 700 }}
              >
                <option value="All">All Requests</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Submissions 2-Column Cards Grid matching screenshot 1 100% */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {submissions
                .filter((sub) => {
                  const matchQuery = !requestSearchQuery.trim() || 
                    sub.taskTitle.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
                    (sub.userName && sub.userName.toLowerCase().includes(requestSearchQuery.toLowerCase())) ||
                    (sub.userEmail && sub.userEmail.toLowerCase().includes(requestSearchQuery.toLowerCase()));
                  const matchStatus = requestStatusFilter === 'All' || sub.status.toLowerCase() === requestStatusFilter.toLowerCase();
                  return matchQuery && matchStatus;
                })
                .map((sub) => {
                  const isApproved = sub.status === 'Approved';
                  const isRejected = sub.status === 'Rejected';

                  return (
                    <div
                      key={sub.id}
                      style={{
                        backgroundColor: '#0a2330',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '1.25rem',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1.25rem'
                      }}
                    >
                      {/* Top Header inside card matching screenshot */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(6, 182, 212, 0.15)', paddingBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#ffffff', fontSize: '1rem' }}>
                            👤
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
                              {sub.userName || 'Unknown User'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                              {sub.userEmail}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 900, 
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: isApproved ? '#34d399' : isRejected ? '#ef4444' : '#f59e0b'
                        }}>
                          {sub.status}
                        </span>
                      </div>

                      {/* Task Info Container */}
                      <div style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📋</span>
                          <span>Submission for: {sub.taskTitle}</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15', backgroundColor: 'rgba(250, 204, 21, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          🪙 {sub.points} Points
                        </span>
                      </div>

                      {/* Submitted Work Box */}
                      <div style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>📄</span>
                          <span>Submitted Work: {sub.submittedWorkTitle || `Submission for: ${sub.taskTitle}`}</span>
                        </div>
                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub.submittedWorkDesc || sub.proofUrl}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                          <span>📎 {sub.filesCount ?? 0} file(s) attached</span>
                          <span>🕒 Submitted: {sub.submittedAt}</span>
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={() => handleOpenReviewModal(sub)}
                          style={{ flex: 1, padding: '0.55rem', borderRadius: '8px', background: 'linear-gradient(135deg, #06b6d4, #0284c7)', color: '#ffffff', fontSize: '0.825rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                          className="hover:opacity-90 active:scale-95"
                        >
                          <span>👁️ View Details</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSubmission(sub.id)}
                          style={{ padding: '0.55rem 1rem', borderRadius: '8px', background: '#ef4444', color: '#ffffff', fontSize: '0.825rem', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          className="hover:bg-red-600 active:scale-95"
                        >
                          <span>🗑️ Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 4: ALL USERS (MATCHING REFERENCE SCREENSHOT 100%) */}
        {activeTab === 'users' && (
          <div className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Page Title & Total User Count Pill */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 0.35rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <Users size={32} color="#06b6d4" />
                <span>All Users</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.85rem' }}>
                Manage and view all registered users in the system
              </p>
              <span style={{ padding: '0.35rem 1.25rem', borderRadius: '9999px', backgroundColor: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800 }}>
                2636 Users
              </span>
            </div>

            {/* Top Search & Filter Toolbar matching screenshot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.25rem', padding: '1rem 1.25rem' }}>
              {/* Search input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '10px', padding: '0.5rem 0.85rem', width: '100%', maxWidth: '20rem' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search users by name, email, or CA ID..."
                  style={{ width: '100%', background: 'none', border: 'none', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              {/* Filter & Sort Dropdowns */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>Filter by Role:</span>
                  <select style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '8px', color: '#ffffff', padding: '0.45rem 0.75rem', fontSize: '0.825rem', outline: 'none' }}>
                    <option value="All">All Roles</option>
                    <option value="Ambassador">Campus Ambassador</option>
                    <option value="Organizer">Organizer</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>Sort by:</span>
                  <select style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '8px', color: '#ffffff', padding: '0.45rem 0.75rem', fontSize: '0.825rem', outline: 'none' }}>
                    <option value="Name">Name</option>
                    <option value="Points">Points</option>
                    <option value="Joined">Joined Date</option>
                  </select>
                </div>

                <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.825rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📥 Export to CSV</span>
                </button>
              </div>
            </div>

            {/* User Cards Grid matching reference screenshot 100% */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
              {caUsers.map((user) => (
                <div 
                  key={user.caId}
                  style={{
                    backgroundColor: '#0a2330',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.25rem'
                  }}
                >
                  {/* Card Header matching screenshot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(6, 182, 212, 0.15)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>{user.email}</div>
                        <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', fontWeight: 800 }}>
                          USER
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#34d399' }}>{user.points}</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase' }}>POINTS</div>
                    </div>
                  </div>

                  {/* 2-Column Info Grid matching screenshot */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.8rem' }}>
                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>📞 Phone:</span>{' '}
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.mobile || 'Not provided'}</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>🎓 College:</span>{' '}
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.collegeName ? user.collegeName.slice(0, 15) + '...' : 'Not provided'}</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>📅 Year:</span>{' '}
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>{user.yearOfStudy || 'Not provided'}</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>📚 Program:</span>{' '}
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>B.Tech</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>💳 Tech ID:</span>{' '}
                      <span style={{ color: '#38bdf8', fontWeight: 800 }}>{user.caId}</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>🕒 Joined:</span>{' '}
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>Nov 18, 2025</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>🔗 LinkedIn:</span>{' '}
                      <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Not provided</span>
                    </div>

                    <div style={{ backgroundColor: '#04151f', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>📘 Facebook:</span>{' '}
                      <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Not provided</span>
                    </div>
                  </div>

                  {/* Card Delete Button matching screenshot */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(6, 182, 212, 0.15)', paddingTop: '0.85rem' }}>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete user ${user.name}?`)) {
                          const updatedUsers = caUsers.filter((u) => u.caId !== user.caId);
                          setCaUsers(updatedUsers);
                          localStorage.setItem('techkriti_ca_users', JSON.stringify(updatedUsers));
                        }
                      }}
                      style={{ padding: '0.4rem 1rem', borderRadius: '6px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.775rem', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                      className="hover:bg-red-600 active:scale-95"
                    >
                      🗑️ Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: NOTICES */}
        {activeTab === 'notices' && (
          <div className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '44rem', margin: '0 auto' }}>
            <h2 className="font-tech-heading" style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              Broadcast Announcements
            </h2>

            <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.5rem', padding: '1.75rem' }}>
              <form onSubmit={handleAddNotice} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <textarea
                  rows={3}
                  required
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                  placeholder="Post an official notice for all Campus Ambassadors..."
                  style={{ width: '100%', padding: '0.8rem 1rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '10px', color: '#ffffff', outline: 'none' }}
                />
                <button
                  type="submit"
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #10b981)', color: '#ffffff', fontWeight: 800, border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }}
                >
                  Publish Notice
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notices.map((n) => (
                <div key={n.id} style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.25rem', padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.35rem' }}>{n.title} ({n.date})</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: REWARDS & INCENTIVES MANAGEMENT */}
        {activeTab === 'rewards' && (
          <div className="animate-portal-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-tech-heading" style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0 0 0.35rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <Gift size={32} color="#06b6d4" />
                <span>Rewards & Incentives Control</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.85rem' }}>
                Configure redemption codes, claim URLs, and points requirements for CA Portal incentives
              </p>
            </div>

            {/* Create Reward Form */}
            <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.5rem', padding: '1.75rem', maxWidth: '44rem', margin: '0 auto', width: '100%' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '0 0 1.25rem' }}>
                + Add New Reward Perk
              </h3>

              <form onSubmit={handleCreateRewardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Reward Title*
                    </label>
                    <input
                      type="text"
                      required
                      value={createRewardForm.title}
                      onChange={(e) => setCreateRewardForm({ ...createRewardForm, title: e.target.value })}
                      placeholder="e.g. Amazon Gift Card ₹500"
                      style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Required Points*
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={createRewardForm.pts}
                      onChange={(e) => setCreateRewardForm({ ...createRewardForm, pts: e.target.value })}
                      placeholder="e.g. 300"
                      style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Redemption Type
                    </label>
                    <select
                      value={createRewardForm.rewardType}
                      onChange={(e) => setCreateRewardForm({ ...createRewardForm, rewardType: e.target.value as any })}
                      style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                    >
                      <option value="code">Voucher / Promo Code</option>
                      <option value="url">Redemption Link (URL)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                      Code or Claim URL*
                    </label>
                    <input
                      type="text"
                      required
                      value={createRewardForm.codeOrUrl}
                      onChange={(e) => setCreateRewardForm({ ...createRewardForm, codeOrUrl: e.target.value })}
                      placeholder={createRewardForm.rewardType === 'url' ? 'https://techkriti.org/claim/pass' : 'AMZ-TK27-8839'}
                      style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '0.4rem' }}>
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={createRewardForm.desc}
                    onChange={(e) => setCreateRewardForm({ ...createRewardForm, desc: e.target.value })}
                    placeholder="Short description of what the user receives..."
                    style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #10b981)', color: '#ffffff', fontWeight: 800, border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }}
                >
                  + Add Reward Perk
                </button>
              </form>
            </div>

            {/* Active Rewards List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {rewardsList.map((r) => (
                <div key={r.id} style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(250, 204, 21, 0.15)', color: '#facc15', fontSize: '0.75rem', fontWeight: 900 }}>
                        🪙 {r.pts} Points
                      </span>
                      <span style={{ padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', fontSize: '0.725rem', fontWeight: 800 }}>
                        {r.rewardType.toUpperCase()}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.4rem' }}>
                      {r.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                      {r.desc}
                    </p>

                    <div style={{ backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.8rem', color: '#34d399', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                      🔑 {r.codeOrUrl}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(6, 182, 212, 0.15)', paddingTop: '0.75rem' }}>
                    <button
                      onClick={() => handleDeleteReward(r.id)}
                      style={{ padding: '0.4rem 0.85rem', borderRadius: '6px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.775rem', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                    >
                      🗑️ Delete Reward
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* TASK SUBMISSION DETAILS REVIEW MODAL (MATCHING USER SCREENSHOT 2 100% IN OUR GREENISH-BLUE THEME) */}
      {selectedReviewSub && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '38rem',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#061a25',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              borderRadius: '1.25rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="animate-portal-tab"
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, #06b6d4, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>
                Task Submission Details
              </h3>
              <button
                onClick={() => setSelectedReviewSub(null)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Section 1: User Information */}
              <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem' }}>
                  User Information
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#ffffff' }}>
                    👤
                  </div>
                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ fontWeight: 800, color: '#ffffff' }}>Name: {selectedReviewSub.userName || 'Unknown User'}</div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.75)', marginTop: '0.15rem' }}>Email: {selectedReviewSub.userEmail}</div>
                  </div>
                </div>
              </div>

              {/* Section 2: Original Task */}
              <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem', fontSize: '0.85rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem' }}>
                  Original Task
                </span>
                <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  Title: Submission for: {selectedReviewSub.taskTitle}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                  Description: {selectedReviewSub.originalTaskDescription || selectedReviewSub.taskTitle}
                </div>
                <div style={{ fontWeight: 800, color: '#38bdf8' }}>
                  Points: {selectedReviewSub.points}
                </div>
              </div>

              {/* Section 3: Submitted Work */}
              <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem', fontSize: '0.85rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem' }}>
                  Submitted Work
                </span>
                <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  Title: {selectedReviewSub.submittedWorkTitle || `Submission for: ${selectedReviewSub.taskTitle}`}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                  Description: {selectedReviewSub.submittedWorkDesc || selectedReviewSub.proofUrl}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '0.3rem' }}>
                  Files: <a href={selectedReviewSub.proofUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>View Submitted File/Link</a>
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                  Submitted: {selectedReviewSub.submittedAt}
                </div>
              </div>

              {/* Section 4: Status */}
              <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Status
                </span>
                <span style={{ padding: '0.35rem 1rem', borderRadius: '6px', backgroundColor: selectedReviewSub.status === 'Approved' ? 'rgba(16, 185, 129, 0.2)' : selectedReviewSub.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: selectedReviewSub.status === 'Approved' ? '#34d399' : selectedReviewSub.status === 'Rejected' ? '#ef4444' : '#f59e0b', fontSize: '0.85rem', fontWeight: 900 }}>
                  {selectedReviewSub.status.toUpperCase()}
                </span>
              </div>

              {/* Section 5: Review Submission */}
              <div style={{ backgroundColor: '#0a2330', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                  Review Submission
                </span>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>
                    Feedback
                  </label>
                  <textarea
                    rows={2}
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Provide feedback to the user..."
                    style={{ width: '100%', padding: '0.75rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.35rem' }}>
                    Points to Award (0-500)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={reviewPointsToAward}
                    onChange={(e) => setReviewPointsToAward(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', backgroundColor: '#04151f', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '0.85rem', outline: 'none', fontWeight: 700 }}
                  />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#04151f', borderBottomLeftRadius: '1.25rem', borderBottomRightRadius: '1.25rem', borderTop: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={handleModalApprove}
                style={{ padding: '0.6rem 1.35rem', borderRadius: '8px', backgroundColor: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                className="hover:bg-emerald-600 active:scale-95"
              >
                <span>✓ Approve</span>
              </button>
              <button
                onClick={handleModalReject}
                style={{ padding: '0.6rem 1.35rem', borderRadius: '8px', backgroundColor: '#ef4444', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                className="hover:bg-red-600 active:scale-95"
              >
                <span>✕ Reject</span>
              </button>
              <button
                onClick={() => setSelectedReviewSub(null)}
                style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
                className="hover:bg-white/20 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
