import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { X, CheckCheck, Bell, AlertTriangle, Megaphone, Car, HeartHandshake, Search } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  isOpen, 
  onClose,
  setActiveTab
}) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useCommunity();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'complaint': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-indigo-400" />;
      case 'pooling': return <Car className="w-4 h-4 text-cyan-400" />;
      case 'help': return <HeartHandshake className="w-4 h-4 text-emerald-400" />;
      case 'lostfound': return <Search className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-indigo-400" />;
    }
  };

  const handleNotificationClick = (id: string, type: string) => {
    markNotificationRead(id);
    switch (type) {
      case 'complaint': setActiveTab('complaints'); break;
      case 'announcement': setActiveTab('announcements'); break;
      case 'pooling': setActiveTab('pooling'); break;
      case 'help': setActiveTab('help'); break;
      case 'lostfound': setActiveTab('lostfound'); break;
      default: setActiveTab('dashboard'); break;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-slate-100">Notifications</h2>
            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-medium">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-slate-400 hover:text-indigo-400 flex items-center space-x-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No notifications available right now.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.type)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-slate-800/40 border-slate-800 text-slate-400'
                    : 'bg-slate-800/90 border-indigo-500/40 text-slate-200 shadow-md shadow-indigo-950/40'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-slate-950/60 flex-shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-200">{notif.title}</h4>
                      <span className="text-[10px] text-slate-500">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
