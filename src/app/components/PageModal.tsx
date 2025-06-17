"use client";
import React, { useRef, useEffect } from 'react';

export function PageModal({ isOpen, mode, currentName, onClose, onSubmit }: {
  isOpen: boolean;
  mode: 'rename' | 'create';
  currentName?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xs"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={e => { e.preventDefault(); if (inputRef.current?.value) onSubmit(inputRef.current.value); }}>
          <label className="block mb-2 font-medium text-gray-700">
            {mode === 'rename' ? 'Rename Page' : 'Add Page'}
          </label>
          <input
            ref={inputRef}
            type="text"
            name="pageName"
            defaultValue={currentName || ''}
            placeholder="Page name"
            className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-yellow-400 text-white font-semibold hover:bg-yellow-500">
              {mode === 'rename' ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 