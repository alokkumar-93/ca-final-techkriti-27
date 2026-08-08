export interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  whatsapp: string;
  postalAddress: string;
  gender: string;
  collegeName: string;
  collegeCity: string;
  yearOfStudy: string;
  facebookProfile?: string;
  instagramProfile?: string;
  xProfile?: string;
  referrerCaId?: string;
  caId: string;
  isRegistered: boolean;
  isAdmin?: boolean;
  avatarUrl?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  deadline: string;
  instructions: string;
  isExpired?: boolean;
  isUrgent?: boolean;
  taskLink?: string;
  difficulty?: string;
  createdAt?: string;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  userName?: string;
  userEmail?: string;
  points: number;
  submittedAt: string;
  proofUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
  filesCount?: number;
  submittedWorkTitle?: string;
  submittedWorkDesc?: string;
  originalTaskDescription?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pts: number;
  desc: string;
  codeOrUrl: string;
  rewardType: 'code' | 'url';
}
