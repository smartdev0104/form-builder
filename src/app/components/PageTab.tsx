"use client";
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Image from 'next/image';
import React from 'react';

export interface PageTabProps {
  page: { id: string; name: string; icon?: string };
  isActive: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onMenuClick: (e: React.MouseEvent) => void;
  index: number;
  onDropTab: (dragIndex: number, dropIndex: number) => void;
  showMenu: boolean;
  tabIndex?: number;
}

export const PageTab = React.memo(function PageTab({ page, isActive, onClick, onContextMenu, onMenuClick, index, onDropTab, showMenu, tabIndex }: PageTabProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'PAGE_TAB',
    item: { index, page },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index, page]);

  React.useEffect(() => {
    if (ref.current) {
      preview(getEmptyImage());
      drag(ref);
    }
  }, [drag, preview, ref]);

  const [, drop] = useDrop(() => ({
    accept: 'PAGE_TAB',
    drop: (item: { index: number }) => {
      if (item.index !== index) onDropTab(item.index, index);
    },
  }), [index, onDropTab]);
  drop(ref);

  return (
    <div
      ref={ref}
      role="tab"
      aria-selected={isActive}
      className={`flex items-center gap-[0.375rem] px-[10px] py-[6px] transition-all cursor-pointer select-none relative font-semibold rounded-lg border
        ${isActive
          ? 'text-slate-500 shadow-sm bg-slate-50 border-slate-200'
          : 'border-transparent text-slate-400 bg-slate-alpha-15 hover:bg-slate-alpha-35'}
        focus:outline-none focus:ring-2 focus:ring-blue-400
        min-w-max
      `}
      tabIndex={tabIndex}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Image src={page.icon || '/file.svg'} alt="Page" width={20} height={20}
        className={isActive ? 'filter-yellow' : 'filter-gray'}
        style={{ filter: isActive ? 'invert(62%) sepia(98%) saturate(749%) hue-rotate(359deg) brightness(102%) contrast(101%)' : 'grayscale(1) opacity(0.6)' }}
      />
      <span>{page.name}</span>
      <button
        className="ml-2 p-1 rounded-md hover:bg-gray-200 focus:outline-none"
        onClick={onMenuClick}
        aria-label={`Options for ${page.name} page`}
      >
        <svg className="rotate-90" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="#bbb" /><circle cx="12" cy="12" r="2" fill="#bbb" /><circle cx="19" cy="12" r="2" fill="#bbb" /></svg>
      </button>
    </div>
  );
});
