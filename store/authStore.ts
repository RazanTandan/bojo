// store/authStore.ts
'use client';

import { create } from 'zustand';
import { account, endpoint } from '@/lib/appwrite'; // <-- Import 'endpoint' here
import {AuthActions, AuthState, UserInfo} from '@/interfaces';

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  loggedInUser: null,
  cairoCoderApiKey: '',
  loadingAuth: true,

  login: (userInfo) => {
    console.log('Zustand: login action called with:', userInfo);
    set({ loggedInUser: userInfo });
  },

  logout: async () => {
    try {
      console.log('Zustand: Attempting to log out...');
      await account.deleteSession('current');
      set({ loggedInUser: null, cairoCoderApiKey: '' });
      console.log('Zustand: User logged out successfully!');
    } catch (error) {
      console.error('Zustand: Logout failed:', error);
    }
  },

  saveCairoCoderApiKey: (key) => {
    console.log('Zustand: Saving API key:', key);
    set({ cairoCoderApiKey: key });
  },

  checkAuthSession: async () => {
    console.log('Zustand: checkAuthSession started. Setting loadingAuth to true.');
    set({ loadingAuth: true });
    try {
      const appwriteUser = await account.get(); // THIS IS THE KEY CALL
      console.log('Zustand: Appwrite account.get() result:', appwriteUser); // <-- CRITICAL LOG

      if (appwriteUser) {
        const mappedUser: UserInfo = {
          id: appwriteUser.$id,
          email: appwriteUser.email,
          // --- FIX IS HERE: Use the imported 'endpoint' variable ---
          avatarUrl: `${endpoint}/avatars/initials?name=${appwriteUser.name || 'User'}`,
          // --- END FIX ---
          githubId: appwriteUser.name?.includes('github.com') ? appwriteUser.name : undefined
        };
        console.log('Zustand: User found, setting loggedInUser:', mappedUser); // <-- CRITICAL LOG
        set({ loggedInUser: mappedUser });
      } else {
        console.log('Zustand: No active user session found.'); // <-- CRITICAL LOG
        set({ loggedInUser: null });
      }
    } catch (error) {
      console.error('Zustand: Failed to get user session:', error); // <-- CRITICAL LOG
      set({ loggedInUser: null });
    } finally {
      console.log('Zustand: checkAuthSession finished. Setting loadingAuth to false.');
      set({ loadingAuth: false });
    }
  },
}));