import React from 'react';
import { 
  AlertTriangle, HeartHandshake, Search, Car, Megaphone, Wrench, X, Sparkles 
} from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onOpenComplaintForm?: () => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({ 
  isOpen, 
  onClose,
  setActiveTab,
  onOpenComplaintForm
}) => {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'report-complaint',
      title: 'Report a Complaint',
      description: 'Water, maintenance, noise, or security issues',
      icon: AlertTriangle,
      color: 'from-rose-500 to-amber-500',
      action: () => {
        onClose();
        if (onOpenComplaintForm) {
          onOpenComplaintForm();
        } else {
          setActiveTab('complaints');
        }
      }
    },
    {
      id: 'ask-help',
      title: 'Ask for Help',
      description: 'Seek recommendations, assistance or borrow tools',
      icon: HeartHandshake,
      color: 'from-emerald-500 to-teal-500',
      action: () => {
        onClose();
        setActiveTab('help');
      }
    },
    {
      id: 'post-lost',
      title: 'Post Lost/Found Item',
      description: 'Report lost keys, pets, or claim found items',
      icon: Search,
      color: 'from-purple-500 to-indigo-500',
      action: () => {
        onClose();
        setActiveTab('lostfound');
      }
    },
    {
      id: 'offer-ride',
      title: 'Offer or Request a Ride',
      description: 'Share commutes to tech parks, airport or downtown',
      icon: Car,
      color: 'from-cyan-500 to-blue-500',
      action: () => {
        onClose();
        setActiveTab('pooling');
      }
    },
    {
      id: 'announcements',
      title: 'View Announcements',
      description: 'Check latest community notices and emergency alerts',
      icon: Megaphone,
      color: 'from-amber-500 to-orange-500',
      action: () => {
        onClose();
        setActiveTab('announcements');
      }
    },
    {
      id: 'find-worker',
      title: 'Find a Worker',
      description: 'Browse verified plumbers, electricians, cleaners',
      icon: Wrench,
      color: 'from-indigo-500 to-violet-500',
      action: () => {
        onClose();
        setActiveTab('workers');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Community Quick Actions</h2>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Select an action to launch real-time community services instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 hover:border-indigo-500/50 text-left transition-all group"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${act.color} text-white shadow-md group-hover:scale-105 transition-all`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    {act.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
