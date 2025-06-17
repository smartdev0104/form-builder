"use client";
import React, { useState } from 'react';

export function AddPageButton({ onClick, ariaLabel }: {
  onClick: () => void;
  ariaLabel?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center w-20 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={-1}
    >
      <div className={`h-0.5 border-t-2 border-dashed border-gray-300 transition-all duration-200 w-1/2`} />
      <button
        className={`z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow transition-all absolute left-1/2 -translate-x-1/2 ${hovered ? 'opacity-100 scale-110' : 'opacity-0 pointer-events-none'}`}
        onClick={onClick}
        aria-label={ariaLabel || 'Add page'}
        type="button"
        tabIndex={-1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
      </button>
      <div className={`h-0.5 border-t-2 border-dashed border-gray-300 transition-all duration-200 w-1/2`} />
    </div>
  );
} 