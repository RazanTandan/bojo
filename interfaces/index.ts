export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

export interface AuthButtonProps {
  icon: React.ReactElement;
  text: string;
  onClick: () => void;
}

export interface UserInfo {
  id: string;
  avatarUrl: string;
  email?: string;
  githubId?: string;
}

export interface NavbarProps {
  loggedInUser: UserInfo | null;
  onLogin: (userInfo: UserInfo) => void;
  onLogout: () => void;
  onOpenAuthModal: () => void;
  onOpenSettingsModal: () => void;
}

export interface AuthModalProps { // New interface for AuthModal
  onClose: () => void;
  onLogin: (userInfo: UserInfo) => void;
}


export interface SettingsModalProps {
  onClose: () => void;
  onSaveApiKey: (key: string) => void;
  initialApiKey: string;
  loggedInUser: UserInfo; // User must be logged in to access settings
}




// --- Interfaces for Sidebar ---

export interface ChatItem {
  id: string;
  title: string;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  chatHistory: ChatItem[];
  onNewChat: () => void;
  onRenameChat: (id: string, newTitle: string) => void;
  onDeleteChat: (id: string) => void;
  onSelectChat: (id: string) => void;
  activeChatId: string | null;
}

export interface ChatListItemProps {
  chat: ChatItem;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  isSidebarOpen: boolean; // Added to control icon visibility based on sidebar state
}


// --- chatbox interface ---
export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean; // Optional prop to show loading state on button
}


// Define message types (user or bot)
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}




// --- authStore interface ---

// Define the shape of your Zustand store's actions
export interface AuthActions {
  login: (userInfo: UserInfo) => void;
  logout: () => Promise<void>;
  saveCairoCoderApiKey: (key: string) => void;
  // This action will be responsible for checking the initial user session
  checkAuthSession: () => Promise<void>;
}


// Define the shape of your Zustand store's state
export interface AuthState {
  loggedInUser: UserInfo | null;
  cairoCoderApiKey: string;
  loadingAuth: boolean;
}
