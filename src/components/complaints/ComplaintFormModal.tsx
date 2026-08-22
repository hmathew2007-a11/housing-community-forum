import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { ComplaintCategory, ComplaintPriority } from '../../types';
import { AlertTriangle, X, Upload, Sparkles } from 'lucide-react';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintFormModal: React.FC<ComplaintFormModalProps> = ({ isOpen, onClose }) => {
  const { addComplaint, userProfile } = useCommunity();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Water');
  const [block, setBlock] = useState(userProfile.block || 'Block B');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      title,
      description,
      category,
      block,
      location: location || `${block} Hallway`,
      priority,
      image: imageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
    });
    onClose();
    // reset
    setTitle('');
    setDescription('');
    setLocation('');
    setImageUrl('');
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Report a Community Complaint</h2>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Submit issue details. Management will be alerted immediately and can assign a worker.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Issue Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Water dripping from hallway ceiling"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Parking">Parking</option>
                <option value="Security">Security</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Noise">Noise</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Block & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Residential Block *</label>
              <select
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
                <option value="Block D">Block D</option>
                <option value="Villa Sector">Villa Sector</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Specific Location</label>
              <input
                type="text"
                placeholder="e.g. 4th floor elevator lobby"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Detailed Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Provide relevant context or safety instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Simulated Photo Attachment */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Attach Image (Optional)</label>
            <div className="flex items-center space-x-2">
              {sampleImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="sample" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all mt-2"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};
