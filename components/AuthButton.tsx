'use client'; 

import React from 'react';
import { AuthButtonProps } from '@/interfaces'; 

const AuthButton: React.FC<AuthButtonProps> = ({ icon, text, onClick }) => (
  <button
    className="w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
    onClick={onClick}
  >
    {React.cloneElement(icon, { className: "mr-3 text-gray-600" })}
    {text}  
  </button>
);

export default AuthButton;