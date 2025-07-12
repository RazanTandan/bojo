// components/ChatListItem.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Edit, Trash2 } from 'lucide-react'; // No MoreVertical needed
import { ChatListItemProps } from '../interfaces';

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onSelect, onRename, onDelete, isSidebarOpen }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(chat.title);
  const [isHovered, setIsHovered] = useState<boolean>(false); // To track hover state for icons
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      const input = itemRef.current?.querySelector('input');
      input?.focus();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    if (!isEditing) {
      onSelect(chat.id);
    }
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting chat when clicking icon
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting chat when clicking icon
    onDelete(chat.id);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newTitle !== chat.title) {
      onRename(chat.id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(chat.title); // Revert to original title
    }
  };

  const showIcons = isSidebarOpen && isHovered && !isEditing;

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center p-3 rounded-lg cursor-pointer group // Added 'group' for hover effects
        ${isActive ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-gray-700'} // Adjusted for dark theme
        transition-colors duration-200`}
      onClick={handleTitleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageSquare size={20} className="flex-shrink-0" /> {/* Always visible chat icon */}

      {isSidebarOpen && ( // Only show text and action icons when sidebar is open
        <>
          {isEditing ? (
            <form onSubmit={handleRenameSubmit} className="flex-grow ml-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400"
              />
            </form>
          ) : (
            <span className="flex-grow text-sm font-medium truncate ml-3">{chat.title}</span>
          )}

          {/* Rename and Delete Icons - visible on hover when sidebar is open */}
          {showIcons && (
            <div className="flex items-center ml-2 space-x-2 flex-shrink-0">
              <button
                onClick={handleRenameClick}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors duration-200"
                title="Rename chat"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-1 rounded-full text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors duration-200"
                title="Delete chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatListItem;