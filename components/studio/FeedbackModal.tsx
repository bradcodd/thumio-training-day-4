
import React, { useState, useEffect } from 'react';
import { CloseIcon, PersonIcon, TagIcon, DocumentIcon } from '../common/Icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedbackData: any) => void;
}

const ROLES = ["YouTuber", "Editor", "Designer", "Developer", "Hobbyist"];
const TOPICS = ["Feature Request", "Bug Report", "General Feedback", "Usability Issue"];

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [role, setRole] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const resetForm = () => {
    setRole(null);
    setTopic(TOPICS[0]);
    setFeedbackText('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    onSubmit({
      role,
      topic,
      feedback: feedbackText,
    });
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-lg border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-100">Share Your Feedback</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <PersonIcon />
              <span>Who are you?</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    role === r
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="topic-select" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <TagIcon />
              <span>What's this about?</span>
            </label>
            <div className="relative">
              <select
                id="topic-select"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full appearance-none bg-gray-800 text-slate-200 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="feedback-text" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <DocumentIcon />
              <span>Your feedback</span>
            </label>
            <textarea
              id="feedback-text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full h-32 bg-gray-800 text-slate-200 placeholder-slate-500 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!feedbackText.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
