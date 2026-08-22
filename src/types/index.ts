export type UserRole = 'resident' | 'admin' | 'worker';

export interface UserProfile {
  id: string;
  name: string;
  flatNumber: string;
  block: string;
  role: UserRole;
  occupancyType: 'Owner' | 'Tenant';
  moveInDate: string;
  email: string;
  phone: string;
  avatar: string;
  contributionScore: number;
  complaintsCount: number;
  helpProvidedCount: number;
  ridesSharedCount: number;
}

export interface Resident {
  id: string;
  flatNumber: string;
  block: string;
  name: string;
  ownerStatus: 'Owner' | 'Tenant';
  occupancyStatus: 'Occupied' | 'Vacant' | 'Rented';
  moveInDate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface Worker {
  id: string;
  name: string;
  category: 'Plumber' | 'Electrician' | 'Carpenter' | 'Cleaner' | 'Gardener' | 'Technician' | 'Security' | 'Other';
  status: 'Available' | 'On Call' | 'Busy';
  rating: number;
  reviewsCount: number;
  verificationStatus: 'Verified' | 'Pending';
  completedJobs: number;
  phone: string;
  avatar: string;
  hourlyRate: string;
  assignedTaskCount: number;
}

export type ComplaintCategory = 'Water' | 'Electricity' | 'Parking' | 'Security' | 'Maintenance' | 'Cleanliness' | 'Noise' | 'Other';
export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ComplaintStatus = 'Reported' | 'Acknowledged' | 'In Progress' | 'Resolved';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  block: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  reportedBy: string;
  flatNumber: string;
  reportedAt: string;
  updatedAt: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  resolutionNote?: string;
  image?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: 'Water Supply' | 'Security Alert' | 'Maintenance' | 'Community Meeting' | 'Festival Event' | 'General Notice';
  priority: 'Normal' | 'Important' | 'Emergency';
  date: string;
  publishedBy: string;
  isPinned: boolean;
}

export interface RideRequest {
  id: string;
  residentName: string;
  flatNumber: string;
  seatsRequested: number;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface RidePool {
  id: string;
  type: 'Offer' | 'Request';
  driverName: string;
  flatNumber: string;
  startLocation: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  notes: string;
  status: 'Active' | 'Booked' | 'Completed';
  requests: RideRequest[];
}

export interface HelpComment {
  id: string;
  author: string;
  flatNumber: string;
  content: string;
  date: string;
  isMarkedHelpful: boolean;
}

export interface HelpPost {
  id: string;
  title: string;
  content: string;
  category: 'Question' | 'Service Recommendation' | 'Borrowing' | 'Assistance';
  author: string;
  flatNumber: string;
  date: string;
  upvotes: number;
  comments: HelpComment[];
  isResolved: boolean;
}

export interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  description: string;
  location: string;
  date: string;
  status: 'Open' | 'Claimed' | 'Returned';
  image?: string;
  postedBy: string;
  flatNumber: string;
  contactPhone: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'complaint' | 'announcement' | 'pooling' | 'help' | 'lostfound' | 'system';
}

export interface CommunityPulse {
  urgentIssue: {
    title: string;
    location: string;
    level: 'Critical' | 'High';
  };
  mostDiscussedTopic: {
    topic: string;
    commentsCount: number;
  };
  trendingProblem: {
    problem: string;
    percentageIncrease: number;
  };
  recentlyResolved: {
    title: string;
    timeAgo: string;
  };
  activeRequestsCount: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  category: string;
  type: 'Complaint' | 'Maintenance' | 'Announcement' | 'LostFound' | 'NeighborhoodHelp';
  date: string;
  block: string;
  status: string;
  summary: string;
}

export interface AnalyticsFilter {
  dateRange: 'today' | 'week' | 'month' | '3months' | 'custom';
  block: string; // 'all' or 'Block A', 'Block B', etc.
  category: string; // 'all' or specific category
}
