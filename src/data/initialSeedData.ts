import { 
  UserProfile, Resident, Worker, Complaint, Announcement, 
  RidePool, HelpPost, LostFoundItem, NotificationItem, CommunityPulse, HistoryItem 
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr-402',
  name: 'Alex Rivers',
  flatNumber: 'B-402',
  block: 'Block B',
  role: 'resident',
  occupancyType: 'Owner',
  moveInDate: '2022-03-15',
  email: 'alex.rivers@homecircle.community',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  contributionScore: 420,
  complaintsCount: 3,
  helpProvidedCount: 7,
  ridesSharedCount: 4
};

export const initialResidents: Resident[] = [
  {
    id: 'res-1',
    flatNumber: 'A-101',
    block: 'Block A',
    name: 'Eleanor Vance',
    ownerStatus: 'Owner',
    occupancyStatus: 'Occupied',
    moveInDate: '2019-06-10',
    emergencyContactName: 'Robert Vance (Spouse)',
    emergencyContactPhone: '+1 (555) 891-2345',
    phone: '+1 (555) 321-7654',
    email: 'eleanor.v@crestview.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'res-2',
    flatNumber: 'B-402',
    block: 'Block B',
    name: 'Alex Rivers',
    ownerStatus: 'Owner',
    occupancyStatus: 'Occupied',
    moveInDate: '2022-03-15',
    emergencyContactName: 'Sarah Rivers (Sister)',
    emergencyContactPhone: '+1 (555) 777-8899',
    phone: '+1 (555) 234-5678',
    email: 'alex.rivers@homecircle.community',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'res-3',
    flatNumber: 'B-205',
    block: 'Block B',
    name: 'David Chen',
    ownerStatus: 'Tenant',
    occupancyStatus: 'Occupied',
    moveInDate: '2023-01-10',
    emergencyContactName: 'Mei Chen (Mother)',
    emergencyContactPhone: '+1 (555) 998-1122',
    phone: '+1 (555) 456-7890',
    email: 'd.chen@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'res-4',
    flatNumber: 'C-301',
    block: 'Block C',
    name: 'Priya Sharma',
    ownerStatus: 'Owner',
    occupancyStatus: 'Occupied',
    moveInDate: '2020-11-20',
    emergencyContactName: 'Rajesh Sharma (Father)',
    emergencyContactPhone: '+1 (555) 334-4556',
    phone: '+1 (555) 654-3210',
    email: 'priya.sharma@designhub.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'res-5',
    flatNumber: 'D-504',
    block: 'Block D',
    name: 'Marcus Sterling',
    ownerStatus: 'Tenant',
    occupancyStatus: 'Occupied',
    moveInDate: '2023-08-01',
    emergencyContactName: 'Amanda Sterling (Wife)',
    emergencyContactPhone: '+1 (555) 443-3221',
    phone: '+1 (555) 876-5432',
    email: 'm.sterling@lawfirm.net',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'res-6',
    flatNumber: 'V-04',
    block: 'Villa Sector',
    name: 'Sophia Martinez',
    ownerStatus: 'Owner',
    occupancyStatus: 'Occupied',
    moveInDate: '2018-04-12',
    emergencyContactName: 'Carlos Martinez (Husband)',
    emergencyContactPhone: '+1 (555) 112-2334',
    phone: '+1 (555) 987-6543',
    email: 'smartinez@architects.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250'
  }
];

export const initialWorkers: Worker[] = [
  {
    id: 'wrk-1',
    name: 'Marcus Vance',
    category: 'Plumber',
    status: 'Available',
    rating: 4.9,
    reviewsCount: 84,
    verificationStatus: 'Verified',
    completedJobs: 142,
    phone: '+1 (555) 432-1098',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$35/hr',
    assignedTaskCount: 1
  },
  {
    id: 'wrk-2',
    name: 'Carlos Ruiz',
    category: 'Electrician',
    status: 'Available',
    rating: 4.8,
    reviewsCount: 112,
    verificationStatus: 'Verified',
    completedJobs: 210,
    phone: '+1 (555) 543-2109',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$40/hr',
    assignedTaskCount: 2
  },
  {
    id: 'wrk-3',
    name: 'Elena Rostova',
    category: 'Cleaner',
    status: 'Busy',
    rating: 5.0,
    reviewsCount: 165,
    verificationStatus: 'Verified',
    completedJobs: 340,
    phone: '+1 (555) 654-3210',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$25/hr',
    assignedTaskCount: 1
  },
  {
    id: 'wrk-4',
    name: 'James O’Connor',
    category: 'Carpenter',
    status: 'Available',
    rating: 4.7,
    reviewsCount: 56,
    verificationStatus: 'Verified',
    completedJobs: 95,
    phone: '+1 (555) 765-4321',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$38/hr',
    assignedTaskCount: 0
  },
  {
    id: 'wrk-5',
    name: 'Anita Patel',
    category: 'Technician',
    status: 'Available',
    rating: 4.9,
    reviewsCount: 92,
    verificationStatus: 'Verified',
    completedJobs: 178,
    phone: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$45/hr',
    assignedTaskCount: 1
  },
  {
    id: 'wrk-6',
    name: 'Robert Miller',
    category: 'Gardener',
    status: 'On Call',
    rating: 4.6,
    reviewsCount: 48,
    verificationStatus: 'Verified',
    completedJobs: 88,
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    hourlyRate: '$30/hr',
    assignedTaskCount: 0
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 'CMP-101',
    title: 'Water Leakage in Main Corridor',
    description: 'Significant water dripping from the ceiling near Flat B-402 corridor. Might cause slipping hazards.',
    category: 'Water',
    location: '4th Floor Hallway near B-402',
    block: 'Block B',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'Alex Rivers',
    flatNumber: 'B-402',
    reportedAt: '2026-08-22 09:15',
    updatedAt: '2026-08-22 10:30',
    assignedWorkerId: 'wrk-1',
    assignedWorkerName: 'Marcus Vance (Plumber)',
    resolutionNote: 'Inspected main pipe joint. Replacement valve on order.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'CMP-102',
    title: 'Elevator B2 Humming Noise & Jerk',
    description: 'Elevator B2 makes a harsh grinding vibration when ascending past the 3rd floor.',
    category: 'Maintenance',
    location: 'Elevator B2',
    block: 'Block B',
    priority: 'Critical',
    status: 'Acknowledged',
    reportedBy: 'David Chen',
    flatNumber: 'B-205',
    reportedAt: '2026-08-21 18:40',
    updatedAt: '2026-08-21 19:15',
    assignedWorkerId: 'wrk-5',
    assignedWorkerName: 'Anita Patel (Technician)',
    resolutionNote: 'Scheduled for technician inspection tomorrow 9 AM.'
  },
  {
    id: 'CMP-103',
    title: 'Visitor Parking Gate Sensor Unresponsive',
    description: 'RFID automatic scanner at Visitor Parking Entrance fails to read authorized tags.',
    category: 'Parking',
    location: 'North Gate Entrance',
    block: 'Block A',
    priority: 'Medium',
    status: 'Reported',
    reportedBy: 'Eleanor Vance',
    flatNumber: 'A-101',
    reportedAt: '2026-08-22 11:00',
    updatedAt: '2026-08-22 11:00'
  },
  {
    id: 'CMP-104',
    title: 'Loud Music After Hours at Clubhouse Pool',
    description: 'Disturbance late at night past 11 PM near the central swimming pool gazebo.',
    category: 'Noise',
    location: 'Central Clubhouse',
    block: 'Villa Sector',
    priority: 'Low',
    status: 'Resolved',
    reportedBy: 'Sophia Martinez',
    flatNumber: 'V-04',
    reportedAt: '2026-08-20 23:30',
    updatedAt: '2026-08-21 08:00',
    resolutionNote: 'Security guard warned visitors and pool lights were turned off at 11 PM.'
  },
  {
    id: 'CMP-105',
    title: 'Trash Bin Overflowing near Block C Entry',
    description: 'Organic waste collection bin overflowing and attracting pests near Block C lobby.',
    category: 'Cleanliness',
    location: 'Ground Floor Lobby',
    block: 'Block C',
    priority: 'Medium',
    status: 'In Progress',
    reportedBy: 'Priya Sharma',
    flatNumber: 'C-301',
    reportedAt: '2026-08-22 08:00',
    updatedAt: '2026-08-22 09:30',
    assignedWorkerId: 'wrk-3',
    assignedWorkerName: 'Elena Rostova (Cleaner)'
  },
  {
    id: 'CMP-106',
    title: 'Corridor Light Flicker on 5th Floor',
    description: 'Light fixture outside D-504 flickers constantly causing eye strain.',
    category: 'Electricity',
    location: '5th Floor Corridor',
    block: 'Block D',
    priority: 'Low',
    status: 'Reported',
    reportedBy: 'Marcus Sterling',
    flatNumber: 'D-504',
    reportedAt: '2026-08-22 12:10',
    updatedAt: '2026-08-22 12:10'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ANC-01',
    title: 'Scheduled Water Supply Pipeline Maintenance',
    description: 'Main overhead tank cleaning and pressure pump maintenance scheduled for Block B and C. Water supply will be paused between 10:00 AM and 2:00 PM on Sunday.',
    category: 'Water Supply',
    priority: 'Emergency',
    date: '2026-08-23',
    publishedBy: 'HOA Management Board',
    isPinned: true
  },
  {
    id: 'ANC-02',
    title: 'Annual General Community Meeting & Eco-Initiatives',
    description: 'All residents are invited to join our Q3 Townhall at the Central Community Clubhouse. Agenda includes solar panel installation, EV charging docks, and security upgrades.',
    category: 'Community Meeting',
    priority: 'Important',
    date: '2026-08-26',
    publishedBy: 'Sarah Jenkins (President)',
    isPinned: true
  },
  {
    id: 'ANC-03',
    title: 'New RFID Speed Barrier Gates Activated',
    description: 'Please ensure your vehicle windshield RFID tag is registered with the Security Desk to prevent delays at North and South entry gates.',
    category: 'Security Alert',
    priority: 'Important',
    date: '2026-08-20',
    publishedBy: 'Chief Security Officer',
    isPinned: false
  },
  {
    id: 'ANC-04',
    title: 'Grand Cultural Evening & Food Carnival',
    description: 'Get ready for our annual Autumn Cultural Fest! Live music, food stalls, kid games, and talent show on Saturday, Sept 2nd.',
    category: 'Festival Event',
    priority: 'Normal',
    date: '2026-09-02',
    publishedBy: 'Events Committee',
    isPinned: false
  }
];

export const initialRidePools: RidePool[] = [
  {
    id: 'RIDE-1',
    type: 'Offer',
    driverName: 'David Chen',
    flatNumber: 'B-205',
    startLocation: 'Crestview Heights Gate',
    destination: 'Tech City Campus / Metro Station',
    date: '2026-08-23',
    time: '08:30 AM',
    availableSeats: 3,
    totalSeats: 4,
    notes: 'Non-smoker, quiet ride. Leaving sharply at 8:30 AM.',
    status: 'Active',
    requests: [
      {
        id: 'REQ-101',
        residentName: 'Priya Sharma',
        flatNumber: 'C-301',
        seatsRequested: 1,
        status: 'Accepted'
      }
    ]
  },
  {
    id: 'RIDE-2',
    type: 'Offer',
    driverName: 'Alex Rivers',
    flatNumber: 'B-402',
    startLocation: 'Block B Parking',
    destination: 'International Airport (Terminal 2)',
    date: '2026-08-24',
    time: '05:00 AM',
    availableSeats: 2,
    totalSeats: 3,
    notes: 'Heading to airport. Space for 2 medium luggage bags.',
    status: 'Active',
    requests: []
  },
  {
    id: 'RIDE-3',
    type: 'Request',
    driverName: 'Eleanor Vance',
    flatNumber: 'A-101',
    startLocation: 'Crestview Heights',
    destination: 'Downtown Financial Center',
    date: '2026-08-23',
    time: '09:00 AM',
    availableSeats: 1,
    totalSeats: 1,
    notes: 'Looking to split cab fare or ride-share for morning commute.',
    status: 'Active',
    requests: []
  }
];

export const initialHelpPosts: HelpPost[] = [
  {
    id: 'HLP-1',
    title: 'Can anyone recommend a reliable inverter/UPS technician?',
    content: 'Our unit power backup trips whenever the AC turns on. Looking for someone trusted who can diagnose the circuit breaker inside the flat.',
    category: 'Question',
    author: 'Priya Sharma',
    flatNumber: 'C-301',
    date: '2026-08-21',
    upvotes: 8,
    isResolved: true,
    comments: [
      {
        id: 'CMT-1',
        author: 'Alex Rivers',
        flatNumber: 'B-402',
        content: 'I highly recommend Carlos Ruiz from our House Workers directory! He fixed our distribution box last month within 30 minutes.',
        date: '2026-08-21 14:20',
        isMarkedHelpful: true
      },
      {
        id: 'CMT-2',
        author: 'David Chen',
        flatNumber: 'B-205',
        content: 'Agreed! Carlos is super reliable and verified on HomeCircle.',
        date: '2026-08-21 15:00',
        isMarkedHelpful: false
      }
    ]
  },
  {
    id: 'HLP-2',
    title: 'Borrowing a lawn mower or hedge trimmer for Sunday morning?',
    content: 'Doing some gardening in Villa V-04 lawn. Will return by 1 PM cleaned and refueled!',
    category: 'Borrowing',
    author: 'Sophia Martinez',
    flatNumber: 'V-04',
    date: '2026-08-22',
    upvotes: 4,
    isResolved: false,
    comments: [
      {
        id: 'CMT-3',
        author: 'Marcus Sterling',
        flatNumber: 'D-504',
        content: 'I have an electric Bosch trimmer you can pick up from D-504 anytime after 9 AM!',
        date: '2026-08-22 10:15',
        isMarkedHelpful: false
      }
    ]
  }
];

export const initialLostFoundItems: LostFoundItem[] = [
  {
    id: 'LF-101',
    type: 'Lost',
    title: 'Black BMW Car Smart Key Fob',
    description: 'Lost key fob with a blue leather keychain. Likely dropped near Central Park walking track around 7:30 PM.',
    location: 'Central Park / Jogging Track',
    date: '2026-08-21',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
    postedBy: 'Marcus Sterling',
    flatNumber: 'D-504',
    contactPhone: '+1 (555) 876-5432'
  },
  {
    id: 'LF-102',
    type: 'Found',
    title: 'Apple AirPods Pro in White MagSafe Case',
    description: 'Found on bench near Kid’s Play Area Block A. Handed over to main security office.',
    location: 'Kid Play Area Block A',
    date: '2026-08-22',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    postedBy: 'Security Guard Office',
    flatNumber: 'Gate 1',
    contactPhone: '+1 (555) 900-0000'
  },
  {
    id: 'LF-103',
    type: 'Found',
    title: 'Red Kid’s Balance Scooter',
    description: 'Left near Block C Visitor Parking entrance.',
    location: 'Block C Visitor Bay',
    date: '2026-08-19',
    status: 'Returned',
    postedBy: 'Priya Sharma',
    flatNumber: 'C-301',
    contactPhone: '+1 (555) 654-3210'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Complaint Update',
    message: 'Your complaint CMP-101 (Water Leakage) has been assigned to Marcus Vance (Plumber).',
    time: '10 min ago',
    read: false,
    type: 'complaint'
  },
  {
    id: 'notif-2',
    title: 'New Announcement',
    message: 'Water Supply Pipeline Maintenance scheduled for Sunday 10 AM.',
    time: '2 hours ago',
    read: false,
    type: 'announcement'
  },
  {
    id: 'notif-3',
    title: 'Ride Request Accepted',
    message: 'Priya Sharma joined your airport ride share for Aug 24.',
    time: '1 day ago',
    read: true,
    type: 'pooling'
  }
];

export const initialCommunityPulse: CommunityPulse = {
  urgentIssue: {
    title: 'Water Pressure Drop & Leakage in Main Pipe',
    location: 'Block B — 4th Floor Corridor',
    level: 'Critical'
  },
  mostDiscussedTopic: {
    topic: 'Solar Panel Docks & EV Charging Station Installation',
    commentsCount: 38
  },
  trendingProblem: {
    problem: 'Corridor Lighting & Common Area Electricity Maintenance',
    percentageIncrease: 18
  },
  recentlyResolved: {
    title: 'Elevator B1 Safety Inspection & Cable Lubrication',
    timeAgo: '4 hours ago'
  },
  activeRequestsCount: 7
};

export const initialHistoryLogs: HistoryItem[] = [
  {
    id: 'HIST-201',
    title: 'Main Clubhouse Swimming Pool Filter Replacement',
    category: 'Maintenance',
    type: 'Maintenance',
    date: '2026-08-18',
    block: 'Clubhouse',
    status: 'Completed',
    summary: 'Dual filtration pump replaced. Water quality certified clean.'
  },
  {
    id: 'HIST-202',
    title: 'Complaint #CMP-089: Main Security Gate RFID Sensor Failure',
    category: 'Security',
    type: 'Complaint',
    date: '2026-08-16',
    block: 'Block A',
    status: 'Resolved',
    summary: 'Optical sensor recalibrated by Technician Anita Patel.'
  },
  {
    id: 'HIST-203',
    title: 'Returned Item: Brown Leather Wallet',
    category: 'LostFound',
    type: 'LostFound',
    date: '2026-08-14',
    block: 'Block D',
    status: 'Returned',
    summary: 'Found in Gym locker room and returned to owner in D-201.'
  },
  {
    id: 'HIST-204',
    title: 'Annual Fire Extinguisher Refill & Drill',
    category: 'Security',
    type: 'Maintenance',
    date: '2026-08-10',
    block: 'All Blocks',
    status: 'Completed',
    summary: '120 fire extinguishers inspected across Block A-D and Villas.'
  }
];
