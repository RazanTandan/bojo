// components/ContextMenu.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { ContextMenuProps } from '@/interfaces';

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Prevent menu from closing when clicking inside
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={menuRef}
      className="context-menu absolute"
      style={{ top: y, left: x }}
      onClick={handleMenuClick}
    >
      {children}
    </div>
  );
};

export default ContextMenu;