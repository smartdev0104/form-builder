"use client";

import path from "path";

export function ContextMenu({ x, y, onSetFirst, onRename, onCopy, onDuplicate, onDelete, onClose, className }: {
  x: number;
  y: number;
  onSetFirst: () => void;
  onRename: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      className={`fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] ${className || ''}`}
      style={{ top: y, left: x }}
      onMouseLeave={onClose}
    >
      <div className="flex flex-col w-full">
        <div className="border-b border-gray-200 w-full p-2">
          <div className="px-2 py-1 text-lg font-bold">Settings</div>
        </div>
        <div className="p-2">
          <button className="flex items-center w-full text-left p-2 rounded hover:bg-blue-50 text-blue-600" onClick={onSetFirst}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag-icon lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
            <span className="ml-2">Set as first page</span>
          </button>
          <button className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100" onClick={onRename}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            <span className="ml-2">Rename</span>
          </button>
          <button className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100" onClick={onCopy}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            <span className="ml-2">Copy</span>
          </button>
          <button className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100" onClick={onDuplicate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /><path d="M8 2h10c1.1 0 2 .9 2 2v10" /></svg>
            <span className="ml-2">Duplicate</span>
          </button>
          <div className="border-t my-2 border-gray-200" />
          <button className="flex items-center w-full text-left p-2 rounded hover:bg-red-50 text-red-600" onClick={onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
            <span className="ml-2">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
} 