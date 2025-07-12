'use client';

import React, { useState } from 'react';
import { Menu, X, UserRoundPlus, Bot, Settings, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { NavbarProps } from '@/interfaces';
import { useAuthStore } from '../store/authStore';


const Navbar: React.FC<Omit<NavbarProps, 'onLogin' | 'loggedInUser' | 'onLogout'>> = ({ onOpenSettingsModal }) => {
  const { loggedInUser, logout, login } = useAuthStore(); // Access from Zustand store

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <nav className="relative w-full bg-white shadow-lg px-4 py-1 sm:px-6 lg:px-8 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Left section: Logo/Title */}
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center text-2xl font-extrabold text-teal-600 hover:text-blue-300 transition-colors duration-300">
            <span className="bg-teal-500 text-white p-2 rounded-lg mr-2 shadow-md">
              <Bot size={24} />
            </span>{' '}
            BoJo
          </a>
        </div>

        {/* Right section: Authentication and Mobile Menu Button */}
        <div className="flex items-center space-x-4 ml-auto">
          {loggedInUser ? (
            <>
              <button
                onClick={onOpenSettingsModal}
                className="hidden md:flex items-center text-gray-700 hover:text-blue-700 px-3 py-2 rounded-full font-semibold text-base transition-colors duration-300 group"
                title="View Settings"
              >
                <img
                  src={loggedInUser.avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2 border border-gray-300 group-hover:border-blue-700 transition-colors duration-300"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/32x32/cccccc/ffffff?text=U';
                  }}
                />
                {loggedInUser.email || loggedInUser.githubId || 'User'}
                <Settings size={16} className="ml-2 text-gray-500 group-hover:text-blue-700 transition-colors duration-300" />
              </button>
              <button
                onClick={logout}
                className="hidden md:flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-full font-semibold text-base transition-colors duration-300"
                title="Logout"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={openAuthModal}
              className="hidden md:flex items-center bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-5 py-2 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
            >
              <UserRoundPlus className="mr-2" size={18} />
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg py-4 border-t border-gray-200 animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {loggedInUser ? (
              <>
                <button
                  onClick={() => { onOpenSettingsModal(); toggleMobileMenu(); }}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <img
                    src={loggedInUser.avatarUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://placehold.co/32x32/cccccc/ffffff?text=U';
                    }}
                  />
                  {loggedInUser.email || loggedInUser.githubId || 'User'} Settings
                </button>
                <button
                  onClick={() => { logout(); toggleMobileMenu(); }}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { openAuthModal(); toggleMobileMenu(); }}
                className="w-full text-left flex items-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-3 py-2 rounded-md font-medium text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
              >
                <UserRoundPlus className="mr-2" size={18} />
                Create Account
              </button>
            )}
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={closeAuthModal}
          onLogin={login}
        />
      )}
    </nav>
  );
};

export default Navbar;