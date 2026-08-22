import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { HelpPost } from '../../types';
import { 
  HeartHandshake, Search, Plus, ThumbsUp, MessageSquare, 
  CheckCircle2, Star, Sparkles, X, User 
} from 'lucide-react';

export const NeighborhoodHelp: React.FC = () => {
  const { helpPosts, addHelpPost, addHelpComment, markHelpfulComment, userProfile } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  // New Post Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<HelpPost['category']>('Question');

  // Comment input state per post
  const [commentInputMap, setCommentInputMap] = useState<Record<string, string>>({});

  const categories = ['All', 'Question', 'Service Recommendation', 'Borrowing', 'Assistance'];

  const filteredPosts = helpPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    addHelpPost({
      title,
      content,
      category
    });
    setIsAskModalOpen(false);
    setTitle('');
    setContent('');
  };

  const handleAddCommentSubmit = (postId: string) => {
    const text = commentInputMap[postId];
    if (text && text.trim()) {
      addHelpComment(postId, text.trim());
      setCommentInputMap(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Neighborhood Assistance & Q&A</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ask for recommendations, borrow tools, seek advice, or help fellow neighbors.
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ask for Help (+15 Pts)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search help topics or recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-6 shadow-xl space-y-4 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs mb-1">
                  <span className="font-bold text-slate-200">{post.author}</span>
                  <span className="text-indigo-400">({post.flatNumber})</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 text-[11px]">{post.date}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{post.title}</h3>
              </div>

              {post.isResolved && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-2xl border border-slate-700/50">
              {post.content}
            </p>

            {/* Comments Thread */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Responses & Neighbor Recommendations ({post.comments.length})</span>
              </h4>

              {post.comments.map((cmt) => (
                <div 
                  key={cmt.id}
                  className={`p-3 rounded-2xl border text-xs space-y-1.5 transition-all ${
                    cmt.isMarkedHelpful
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-200">{cmt.author} ({cmt.flatNumber})</span>
                    {cmt.isMarkedHelpful ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-emerald-400" /> Marked as Best Helpful Answer
                      </span>
                    ) : (
                      <button
                        onClick={() => markHelpfulComment(post.id, cmt.id)}
                        className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Helpful (+25 Pts)
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs">{cmt.content}</p>
                </div>
              ))}

              {/* Reply Box */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  placeholder="Offer advice or respond to neighbor..."
                  value={commentInputMap[post.id] || ''}
                  onChange={(e) => setCommentInputMap({ ...commentInputMap, [post.id]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddCommentSubmit(post.id); }}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleAddCommentSubmit(post.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                >
                  Reply (+10 Pts)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsAskModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-400" />
              <span>Ask for Community Help</span>
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need recommendation for a trusted plumber or electrician"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="Question">Question</option>
                  <option value="Service Recommendation">Service Recommendation</option>
                  <option value="Borrowing">Borrowing Tools/Items</option>
                  <option value="Assistance">Neighborhood Assistance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what you need help with..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                Post Q&A Thread (+15 Pts)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
