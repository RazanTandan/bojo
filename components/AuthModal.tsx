// components/AuthModal.tsx
'use client';

import React from 'react';
import { X, Chrome, Github } from 'lucide-react';
import AuthButton from './AuthButton';
import { AuthModalProps, UserInfo } from '@/interfaces'; // Ensure UserInfo is imported if used directly for mock login

import { account } from '@/lib/appwrite'; // Import Appwrite account service
import { useAuthStore } from '../store/authStore'; // Import Zustand store

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  // We no longer need the 'login' action from Zustand here,
  // as Appwrite's OAuth handles the redirect, and the session
  // is picked up by checkAuthSession on page reload.
  // const { login } = useAuthStore(); // Can remove this if not used for mock login

  // Define your OAuth redirect URLs
  // These MUST match the URLs configured in your Appwrite Console for Google and GitHub
  const successUrl = process.env.NEXT_PUBLIC_APPWRITE_OAUTH_SUCCESS_URL || window.location.origin;
  const failureUrl = process.env.NEXT_PUBLIC_APPWRITE_OAUTH_FAILURE_URL || window.location.origin;

  const handleGoogleLogin = async () => {
    try {
      console.log('AuthModal: Initiating Google OAuth login...');
      // This will redirect the user to Google for authentication
      await account.createOAuth2Session(
        'google', // Provider ID as configured in Appwrite
        successUrl, // URL to redirect to on successful login
        failureUrl  // URL to redirect to on failed login
      );
      // No need to call onLogin or close modal here, as the page will reload after redirect
      // and AuthStore's checkAuthSession will pick up the session.
    } catch (error) {
      console.error('AuthModal: Google OAuth failed:', error);
      // Using alert for demo, use a proper modal for error messages in production
      alert('Google login failed. Please ensure Appwrite and Google Cloud Console settings are correct. Check console for details.');
    }
  };

  const handleGithubLogin = async () => {
    try {
      console.log('AuthModal: Initiating GitHub OAuth login...');
      // This will redirect the user to GitHub for authentication
      await account.createOAuth2Session(
        'github', // Provider ID as configured in Appwrite
        successUrl, // URL to redirect to on successful login
        failureUrl  // URL to redirect to on failed login
      );
      // No need to call onLogin or close modal here
    } catch (error) {
      console.error('AuthModal: GitHub OAuth failed:', error);
      alert('GitHub login failed. Please ensure Appwrite and GitHub Developer settings are correct. Check console for details.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform animate-scaleUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <AuthButton
            icon={<Chrome size={20} />}
            text="Continue with Google"
            onClick={handleGoogleLogin} // This now calls the actual OAuth function
          />
          <AuthButton
            icon={<Github size={20} />}
            text="Continue with GitHub"
            onClick={handleGithubLogin} // This now calls the actual OAuth function
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our <a href="#" className="text-cyan-600 hover:underline">Terms of Service</a> and <a href="#" className="text-cyan-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;