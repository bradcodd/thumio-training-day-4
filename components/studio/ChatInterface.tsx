
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MessageAuthor } from '../../types';
import { SendIcon, BotIcon, UserIcon, SparklesIcon, CopyIcon } from '../common/Icons';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, isQuickAction?: boolean) => void;
  isLoading: boolean;
  isImageUploaded: boolean;
  onAddTextRequest: () => void;
  onOpenFiltersRequest: () => void;
}

const QuickActions = ({ onActionClick, onAddTextClick, onOpenFiltersClick }: { onActionClick: (prompt: string) => void; onAddTextClick: () => void; onOpenFiltersClick: () => void; }) => {
  const actions = [
    { label: 'Remove Background', prompt: "Perform an advanced, high-quality background removal on the main subject. Be extremely precise with the edges, especially around hair or complex details. The final output should be the subject on a transparent background." },
    { label: 'Apply Outer Glow', prompt: 'Identify the main subject of the image. Add a subtle but noticeable white outer glow around the contours of the subject. The glow should be clean and help the subject pop from the background, making it look like a sticker.' },
    { label: 'Apply Vignette', prompt: "Apply a subtle, dark vignette effect to the image. The edges should be gently darkened to draw the viewer's focus to the center of the thumbnail. The effect should be noticeable but not overpowering." },
    { label: 'Apply Filters', prompt: null },
    { label: 'Add Text', prompt: null },
  ];

  return (
    <div className="px-4 pb-4">
      <h3 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
        <SparklesIcon className="w-4 h-4 text-sky-400" />
        <span>Try these suggestions</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={() => {
              if (action.prompt) {
                onActionClick(action.prompt);
              } else if (action.label === 'Add Text') {
                onAddTextClick();
              } else if (action.label === 'Apply Filters') {
                onOpenFiltersClick();
              }
            }}
            className="px-3 py-1 text-xs font-medium text-sky-200 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, isImageUploaded, onAddTextRequest, onOpenFiltersRequest }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && isImageUploaded) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleQuickAction = (prompt: string) => {
    if (!isLoading && isImageUploaded) {
      onSendMessage(prompt, true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`group flex items-center gap-2 ${msg.author === MessageAuthor.USER ? 'justify-end flex-row-reverse' : 'justify-start'
                }`}
            >
              <div className="flex items-start gap-3">
                {msg.author === MessageAuthor.AI && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.author === MessageAuthor.USER
                    ? 'bg-gray-700 text-slate-50 rounded-br-none'
                    : 'bg-gray-800 text-slate-200 rounded-bl-none'
                    }`}
                >
                  {msg.text && <p className="text-sm break-words">{msg.text}</p>}
                  {msg.image && (
                    <img src={msg.image} alt="AI generated content" className="mt-2 rounded-md" />
                  )}
                </div>
                {msg.author === MessageAuthor.USER && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <UserIcon />
                  </div>
                )}
              </div>
              {msg.text && (
                <button
                  onClick={() => setInput(msg.text || '')}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-opacity opacity-0 group-hover:opacity-100"
                  aria-label="Copy prompt"
                  title="Copy prompt"
                >
                  <CopyIcon />
                </button>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.author === MessageAuthor.USER && (
            <div className="flex items-start gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <BotIcon />
              </div>
              <div className="max-w-xs lg:max-w-md p-3 rounded-lg bg-gray-800 text-slate-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-sky-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>
      {isImageUploaded && !isLoading && (
        <QuickActions onActionClick={handleQuickAction} onAddTextClick={onAddTextRequest} onOpenFiltersClick={onOpenFiltersRequest} />
      )}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isImageUploaded ? "Or type your own edit..." : "Upload an image to start chatting"}
            disabled={isLoading || !isImageUploaded}
            className="w-full bg-gray-800 text-slate-200 placeholder-slate-400 border border-gray-700 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !isImageUploaded || !input.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-sky-600 text-white rounded-full h-8 w-8 flex items-center justify-center hover:bg-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
