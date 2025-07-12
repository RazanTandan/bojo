'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SettingsModalProps } from '@/interfaces';
import { useAuthStore } from '../store/authStore'; 

const SettingsModal: React.FC<Omit<SettingsModalProps, 'initialApiKey' | 'loggedInUser' | 'onSaveApiKey'>> = ({ onClose }) => {
  const { loggedInUser, cairoCoderApiKey, saveCairoCoderApiKey } = useAuthStore(); // Access from Zustand store
  const [apiKey, setApiKey] = useState<string>(cairoCoderApiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCairoCoderApiKey(apiKey); // Call Zustand's action
    onClose();
  };

  if (!loggedInUser) {
    // Should theoretically not happen if opened only when logged in, but good for safety
    return null;
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform animate-scaleUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info Display in Settings Modal */}
        <div className="flex flex-col items-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <img
            src={loggedInUser.avatarUrl}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mb-3 border-4 border-teal-500 shadow-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/64x64/cccccc/ffffff?text=User';
            }}
          />
          <p className="text-xl font-semibold text-gray-800">
            {loggedInUser.email || loggedInUser.githubId || 'Logged-in User'}
          </p>
          <p className="text-sm text-gray-600 mt-1">ID: {loggedInUser.id}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cairoApiKey" className="block text-lg font-medium text-gray-700 mb-2">
              Cairo-Coder API Key
            </label>
            <input
              type="text"
              id="cairoApiKey"
              name="cairoApiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Cairo-Coder API Key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              This key is required to continue.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full text-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
            >
              Save API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;