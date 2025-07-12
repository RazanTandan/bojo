// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SettingsModal from '@/components/SettingsModal';
import AuthModal from '@/components/AuthModal';
import ChatInput from '@/components/ChatInput';
import { UserInfo, ChatItem, ChatMessage } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Bot } from 'lucide-react';


import { useAuthStore } from '../store/authStore';


export default function Home() {

  // Use Zustand store for authentication state and actions
  const { loggedInUser, cairoCoderApiKey, login, logout, saveCairoCoderApiKey, loadingAuth, checkAuthSession } = useAuthStore();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([
    { id: uuidv4(), title: 'Cairo Contract Review' },
    { id: uuidv4(), title: 'Next.js Debugging Session' },
    { id: uuidv4(), title: 'Project Planning' },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>(chatHistory[0]?.id || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  // --- Initial Auth Check with Zustand ---
  useEffect(() => {
    checkAuthSession(); // This should be called once on component mount
  }, [checkAuthSession]); // Dependency array ensures it runs only when checkAuthSession changes (which is usually never for a store action)


  // Initial dummy message when app loads or active chat changes (and auth is loaded)
  useEffect(() => {
    if (!loadingAuth && activeChatId) {
      setMessages([
        {
          id: uuidv4(),
          sender: 'bot',
          text: `Hello! I am your Cairo Pilot. How can I help you with '${chatHistory.find(c => c.id === activeChatId)?.title}' today?`,
          timestamp: new Date(),
        },
      ]);
    } else if (!loadingAuth && !activeChatId && chatHistory.length > 0) {
        setActiveChatId(chatHistory[0].id);
    }
  }, [activeChatId, chatHistory, loadingAuth]);


  // Sidebar Handlers
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    const newChat: ChatItem = { id: uuidv4(), title: 'New Chat ' + (chatHistory.length + 1) };
    setChatHistory((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setMessages([]); // Clear messages for new chat
    setIsSidebarOpen(false); // Close sidebar after new chat
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, title: newTitle } : chat))
    );
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(chatHistory.filter((chat) => chat.id !== id)[0]?.id || null);
    }
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setIsSidebarOpen(false);
  };

  // Message Sending Logic
  const handleSendMessage = async (messageText: string) => {
    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsBotTyping(true);

    // Simulate API call and bot response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const botResponseText = `I received your message: "${messageText}". I can help you with Cairo contracts. For example, a simple counter contract looks like this:

\`\`\`cairo
// A simple counter contract
#[contract]
mod Counter {
    use super::InternalTrait;

    struct Storage {
        value: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, initial_value: felt252) {
        self.value.write(initial_value);
    }

    #[external(v0)]
    fn get_value(self: @ContractState) -> felt252 {
        self.value.read()
    }

    #[external(v0)]
    fn increment(ref self: ContractState) {
        let value = self.value.read();
        self.value.write(value + 1);
    }

    #[external(v0)]
    fn decrement(ref self: ContractState) {
        let value = self.value.read();
        self.value.write(value - 1);
    }
}
\`\`\`
How else can I assist you?`;

    const newBotMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'bot',
      text: botResponseText,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    setIsBotTyping(false);
  };


  // Render a loading state while authentication is being checked
  // --- UNCOMMENT THIS BLOCK ---
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        <p className="text-xl text-gray-700">Loading application...</p>
        {/* You could add a spinner or more elaborate loading screen here */}
      </div>
    );
  }
  // --- END UNCOMMENT ---


  return (
    <div className="flex min-h-screen bg-gray-100 font-inter text-gray-900">
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
      />

      {/* Main Content Area - Shifts based on sidebar state */}
      <div
        className={`flex flex-col flex-grow min-h-screen ${isSidebarOpen ? 'ml-64 md:ml-72' : 'ml-20'} main-content-shift`}
      >
        {/* Navbar Component */}
        <Navbar
          loggedInUser={loggedInUser}
          onLogin={login}
          onLogout={logout}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        />

        <main className="flex-grow flex flex-col p-8 w-full max-w-full mx-auto">
          {/* Chat Display Area */}
          <div className="flex-grow overflow-y-auto p-4 bg-white rounded-xl shadow-md mb-4 border border-gray-200">
            {messages.length === 0 && !isBotTyping ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bot size={64} className="mb-4 text-teal-400" />
                <p className="text-lg">Start a conversation with Bojo!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <Bot size={24} className="flex-shrink-0 mr-3 mt-1 text-teal-500" />
                  )}
                  <div className={`p-3 rounded-lg max-w-[70%]
                    ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-xs mt-1 block opacity-75">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {msg.sender === 'user' && loggedInUser && (
                    <img
                      src={loggedInUser.avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full ml-3 flex-shrink-0 mt-1 border border-gray-300"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/32x32/cccccc/ffffff?text=U';
                      }}
                    />
                  )}
                </div>
              ))
            )}
            {isBotTyping && (
              <div className="flex items-center justify-start mb-4">
                <Bot size={24} className="flex-shrink-0 mr-3 text-teal-500" />
                <div className="bg-gray-200 text-gray-900 p-3 rounded-lg max-w-[70%]">
                  <div className="dot-typing"></div> {/* Typing indicator */}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Component */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isBotTyping} />
        </main>
      </div>

      {/* Render Modals (conditionally, outside the main flow to ensure z-index) */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={login}
        />
      )}

      {isSettingsModalOpen && loggedInUser && (
        <SettingsModal
          onClose={() => setIsSettingsModalOpen(false)}
          onSaveApiKey={saveCairoCoderApiKey}
          initialApiKey={cairoCoderApiKey}
          loggedInUser={loggedInUser}
        />
      )}
    </div>
  );
}