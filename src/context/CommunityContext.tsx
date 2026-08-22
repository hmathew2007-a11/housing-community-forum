import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, UserProfile, Resident, Worker, Complaint, Announcement, 
  RidePool, HelpPost, LostFoundItem, NotificationItem, CommunityPulse, 
  HistoryItem, AnalyticsFilter, ComplaintStatus 
} from '../types';
import { 
  initialUserProfile, initialResidents, initialWorkers, initialComplaints, 
  initialAnnouncements, initialRidePools, initialHelpPosts, initialLostFoundItems, 
  initialNotifications, initialCommunityPulse, initialHistoryLogs 
} from '../data/initialSeedData';

interface CommunityContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userProfile: UserProfile;
  residents: Resident[];
  workers: Worker[];
  complaints: Complaint[];
  announcements: Announcement[];
  ridePools: RidePool[];
  helpPosts: HelpPost[];
  lostFoundItems: LostFoundItem[];
  notifications: NotificationItem[];
  communityPulse: CommunityPulse;
  historyLogs: HistoryItem[];
  analyticsFilters: AnalyticsFilter;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Actions
  addComplaint: (complaint: Omit<Complaint, 'id' | 'reportedAt' | 'updatedAt' | 'status' | 'reportedBy' | 'flatNumber'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus, workerId?: string, workerName?: string, resolutionNote?: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  addRidePool: (ride: Omit<RidePool, 'id' | 'status' | 'requests' | 'driverName' | 'flatNumber'>) => void;
  requestRideSeat: (rideId: string, seatsRequested: number) => void;
  addHelpPost: (post: Omit<HelpPost, 'id' | 'date' | 'upvotes' | 'comments' | 'isResolved' | 'author' | 'flatNumber'>) => void;
  addHelpComment: (postId: string, content: string) => void;
  markHelpfulComment: (postId: string, commentId: string) => void;
  addLostFoundItem: (item: Omit<LostFoundItem, 'id' | 'date' | 'status' | 'postedBy' | 'flatNumber'>) => void;
  updateLostFoundStatus: (id: string, status: 'Open' | 'Claimed' | 'Returned') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setAnalyticsFilters: (filters: Partial<AnalyticsFilter>) => void;
  resetDemoData: () => void;
  awardContributionPoints: (points: number) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading initial state from localStorage or seed fallback
  const [userRole, setUserRole] = useState<UserRole>('resident');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [ridePools, setRidePools] = useState<RidePool[]>(initialRidePools);
  const [helpPosts, setHelpPosts] = useState<HelpPost[]>(initialHelpPosts);
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(initialLostFoundItems);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [communityPulse, setCommunityPulse] = useState<CommunityPulse>(initialCommunityPulse);
  const [historyLogs, setHistoryLogs] = useState<HistoryItem[]>(initialHistoryLogs);
  
  const [analyticsFilters, setAnalyticsFiltersState] = useState<AnalyticsFilter>({
    dateRange: 'month',
    block: 'all',
    category: 'all'
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const awardContributionPoints = (points: number) => {
    setUserProfile(prev => ({
      ...prev,
      contributionScore: prev.contributionScore + points
    }));
  };

  const setAnalyticsFilters = (filters: Partial<AnalyticsFilter>) => {
    setAnalyticsFiltersState(prev => ({ ...prev, ...filters }));
  };

  // Add Complaint
  const addComplaint = (data: Omit<Complaint, 'id' | 'reportedAt' | 'updatedAt' | 'status' | 'reportedBy' | 'flatNumber'>) => {
    const newId = `CMP-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    const newComplaint: Complaint = {
      ...data,
      id: newId,
      status: 'Reported',
      reportedBy: userProfile.name,
      flatNumber: userProfile.flatNumber,
      reportedAt: now,
      updatedAt: now
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Create system notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Complaint Filed',
      message: `${newId}: ${data.title} has been logged in ${data.block}.`,
      time: 'Just now',
      read: false,
      type: 'complaint'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Update User score
    setUserProfile(prev => ({
      ...prev,
      complaintsCount: prev.complaintsCount + 1,
      contributionScore: prev.contributionScore + 10
    }));

    // Update pulse
    setCommunityPulse(prev => ({
      ...prev,
      activeRequestsCount: prev.activeRequestsCount + 1
    }));
  };

  // Update Complaint Status (Admin/Worker Action)
  const updateComplaintStatus = (
    id: string, 
    status: ComplaintStatus, 
    workerId?: string, 
    workerName?: string, 
    resolutionNote?: string
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updated: Complaint = {
          ...c,
          status,
          updatedAt: now,
          ...(workerId && { assignedWorkerId: workerId }),
          ...(workerName && { assignedWorkerName: workerName }),
          ...(resolutionNote && { resolutionNote })
        };
        return updated;
      }
      return c;
    }));

    // If resolved, push to history
    if (status === 'Resolved') {
      const target = complaints.find(c => c.id === id);
      if (target) {
        const hist: HistoryItem = {
          id: `HIST-${Math.floor(100 + Math.random() * 900)}`,
          title: `Complaint #${target.id}: ${target.title}`,
          category: target.category,
          type: 'Complaint',
          date: now.split(' ')[0],
          block: target.block,
          status: 'Resolved',
          summary: resolutionNote || target.description
        };
        setHistoryLogs(prev => [hist, ...prev]);

        setCommunityPulse(prev => ({
          ...prev,
          recentlyResolved: {
            title: `${target.title} (${target.block})`,
            timeAgo: 'Just now'
          }
        }));
      }
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Complaint Status Updated',
      message: `Complaint ${id} is now ${status}.`,
      time: 'Just now',
      read: false,
      type: 'complaint'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Add Announcement
  const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newId = `ANC-${Math.floor(10 + Math.random() * 90)}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newNotice: Announcement = {
      ...data,
      id: newId,
      date: today
    };

    setAnnouncements(prev => [newNotice, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: '📢 New Announcement',
      message: `${data.title} (${data.category})`,
      time: 'Just now',
      read: false,
      type: 'announcement'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Ride Pooling
  const addRidePool = (data: Omit<RidePool, 'id' | 'status' | 'requests' | 'driverName' | 'flatNumber'>) => {
    const newId = `RIDE-${Math.floor(10 + Math.random() * 90)}`;
    const newRide: RidePool = {
      ...data,
      id: newId,
      driverName: userProfile.name,
      flatNumber: userProfile.flatNumber,
      status: 'Active',
      requests: []
    };
    setRidePools(prev => [newRide, ...prev]);

    awardContributionPoints(20);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: '🚗 Ride Offer/Request Posted',
      message: `${userProfile.name} posted a ride to ${data.destination}.`,
      time: 'Just now',
      read: false,
      type: 'pooling'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const requestRideSeat = (rideId: string, seatsRequested: number) => {
    setRidePools(prev => prev.map(ride => {
      if (ride.id === rideId && ride.availableSeats >= seatsRequested) {
        return {
          ...ride,
          availableSeats: ride.availableSeats - seatsRequested,
          requests: [
            ...ride.requests,
            {
              id: `REQ-${Date.now()}`,
              residentName: userProfile.name,
              flatNumber: userProfile.flatNumber,
              seatsRequested,
              status: 'Accepted'
            }
          ]
        };
      }
      return ride;
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Seat Reserved',
      message: `Your ride seat request was confirmed for Ride #${rideId}.`,
      time: 'Just now',
      read: false,
      type: 'pooling'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Neighborhood Help
  const addHelpPost = (data: Omit<HelpPost, 'id' | 'date' | 'upvotes' | 'comments' | 'isResolved' | 'author' | 'flatNumber'>) => {
    const newId = `HLP-${Math.floor(10 + Math.random() * 90)}`;
    const newPost: HelpPost = {
      ...data,
      id: newId,
      author: userProfile.name,
      flatNumber: userProfile.flatNumber,
      date: new Date().toISOString().split('T')[0],
      upvotes: 1,
      comments: [],
      isResolved: false
    };

    setHelpPosts(prev => [newPost, ...prev]);
    awardContributionPoints(15);
  };

  const addHelpComment = (postId: string, content: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newCmt = {
      id: `CMT-${Date.now()}`,
      author: userProfile.name,
      flatNumber: userProfile.flatNumber,
      content,
      date: now,
      isMarkedHelpful: false
    };

    setHelpPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCmt]
        };
      }
      return post;
    }));

    awardContributionPoints(10);
  };

  const markHelpfulComment = (postId: string, commentId: string) => {
    setHelpPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isResolved: true,
          comments: post.comments.map(c => 
            c.id === commentId ? { ...c, isMarkedHelpful: true } : c
          )
        };
      }
      return post;
    }));
    awardContributionPoints(25);
  };

  // Lost & Found
  const addLostFoundItem = (data: Omit<LostFoundItem, 'id' | 'date' | 'status' | 'postedBy' | 'flatNumber'>) => {
    const newId = `LF-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: LostFoundItem = {
      ...data,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      postedBy: userProfile.name,
      flatNumber: userProfile.flatNumber
    };

    setLostFoundItems(prev => [newItem, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `🔎 Item ${data.type}`,
      message: `${data.title} posted in Lost & Found.`,
      time: 'Just now',
      read: false,
      type: 'lostfound'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateLostFoundStatus = (id: string, status: 'Open' | 'Claimed' | 'Returned') => {
    setLostFoundItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));

    if (status === 'Returned') {
      const target = lostFoundItems.find(i => i.id === id);
      if (target) {
        const hist: HistoryItem = {
          id: `HIST-${Math.floor(100 + Math.random() * 900)}`,
          title: `Returned Item: ${target.title}`,
          category: 'LostFound',
          type: 'LostFound',
          date: new Date().toISOString().split('T')[0],
          block: target.flatNumber.split('-')[0] || 'Community',
          status: 'Returned',
          summary: `${target.title} claimed and safely returned to owner.`
        };
        setHistoryLogs(prev => [hist, ...prev]);
      }
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    setResidents(initialResidents);
    setWorkers(initialWorkers);
    setComplaints(initialComplaints);
    setAnnouncements(initialAnnouncements);
    setRidePools(initialRidePools);
    setHelpPosts(initialHelpPosts);
    setLostFoundItems(initialLostFoundItems);
    setNotifications(initialNotifications);
    setCommunityPulse(initialCommunityPulse);
    setHistoryLogs(initialHistoryLogs);
    setUserProfile(initialUserProfile);
    setUserRole('resident');
  };

  return (
    <CommunityContext.Provider value={{
      userRole,
      setUserRole,
      userProfile,
      residents,
      workers,
      complaints,
      announcements,
      ridePools,
      helpPosts,
      lostFoundItems,
      notifications,
      communityPulse,
      historyLogs,
      analyticsFilters,
      theme,
      toggleTheme,
      addComplaint,
      updateComplaintStatus,
      addAnnouncement,
      addRidePool,
      requestRideSeat,
      addHelpPost,
      addHelpComment,
      markHelpfulComment,
      addLostFoundItem,
      updateLostFoundStatus,
      markNotificationRead,
      markAllNotificationsRead,
      setAnalyticsFilters,
      resetDemoData,
      awardContributionPoints
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
