"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PageTab } from './PageTab';
import { AddPageButton } from './AddPageButton';
import { ContextMenu } from './ContextMenu';
import { PageModal } from './PageModal';
import { useDragLayer } from 'react-dnd';
import Image from 'next/image';

interface Page {
  id: string;
  name: string;
  icon?: string;
}

// Custom drag layer component for rendering the drag preview
function CustomDragLayer({ pages }: { pages: Page[] }) {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item || typeof item.index !== 'number') {
    return null;
  }

  // Directly use the page data passed in the drag item
  const draggedPage = item.page;
  if (!draggedPage) return null;

  return (
    <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      left: 0,
      top: 0,
      zIndex: 9999,
      transform: currentOffset ? `translate(${currentOffset.x}px, ${currentOffset.y}px)` : 'none',
    }}>
      <div className="flex items-center gap-[0.375rem] px-[10px] py-[6px] border-2 border-blue-400 bg-white rounded-full shadow-lg z-50 min-w-max box-border">
        <Image src={draggedPage.icon || '/file.svg'} alt="Page" width={20} height={20} style={{ filter: 'grayscale(1) opacity(0.6)' }} />
        <span>{draggedPage.name}</span>
      </div>
    </div>
  );
}

const initialPages: Page[] = [
  { id: '1', name: 'Info', icon: '/file.svg' },
  { id: '2', name: 'Details', icon: '/file.svg' },
  { id: '3', name: 'Other', icon: '/file.svg' },
  { id: '4', name: 'Ending', icon: '/file.svg' },
];

export default function PageNavigation() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePage, setActivePage] = useState<string>('1');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; pageId: string } | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; pageId?: string; currentName?: string; mode: 'rename' | 'create'; insertIndex?: number } | null>(null);

  // Ref for the tablist container to manage focus
  const tabListRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for tabs
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(tabListRef.current?.querySelectorAll('[role="tab"]') || []) as HTMLElement[];
    const currentActiveIndex = pages.findIndex(page => page.id === activePage);

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentActiveIndex + 1) % pages.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentActiveIndex - 1 + pages.length) % pages.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = pages.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== -1 && nextIndex !== currentActiveIndex) {
      event.preventDefault(); // Prevent scrolling with arrow keys
      setActivePage(pages[nextIndex].id);
      // Focus the newly active tab
      tabs[nextIndex]?.focus();
    }
  }, [activePage, pages]);

  // Drag and drop logic
  const handleDropTab = useCallback((from: number, to: number) => {
    setPages(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  }, []);

  // Add page modal
  const openCreateModal = useCallback((insertIndex: number) => setModal({ isOpen: true, mode: 'create', insertIndex }), []);
  const openRenameModal = useCallback((pageId: string, currentName: string) => setModal({ isOpen: true, pageId, currentName, mode: 'rename' }), []);

  // Context menu
  const handleContextMenu = useCallback((e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, pageId });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu && !(event.target as Element).closest('.context-menu')) {
        closeContextMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu, closeContextMenu]);

  // Context menu actions
  const handleRename = useCallback(() => {
    if (!contextMenu) return;
    const page = pages.find(p => p.id === contextMenu.pageId);
    if (page) openRenameModal(page.id, page.name);
    closeContextMenu();
  }, [contextMenu, pages, openRenameModal, closeContextMenu]);

  const handleCopy = useCallback(() => {
    if (!contextMenu) return;
    const pageToCopy = pages.find(p => p.id === contextMenu.pageId);
    if (pageToCopy) {
      const newPage: Page = { id: Date.now().toString(), name: `${pageToCopy.name} (Copy)`, icon: pageToCopy.icon };
      const newPages = [...pages];
      const index = newPages.findIndex(p => p.id === contextMenu.pageId);
      newPages.splice(index + 1, 0, newPage);
      setPages(newPages);
    }
    closeContextMenu();
  }, [contextMenu, pages, closeContextMenu]);

  const handleDuplicate = handleCopy;
  const handleDelete = useCallback(() => {
    if (!contextMenu) return;
    const currentIndex = pages.findIndex(p => p.id === contextMenu.pageId);
    const isActivePage = contextMenu.pageId === activePage;

    setPages(pages.filter(p => p.id !== contextMenu.pageId));

    // If we're deleting the active page, navigate to the previous page
    if (isActivePage && pages.length > 1) {
      const newActiveIndex = currentIndex === 0 ? 0 : currentIndex - 1;
      setActivePage(pages[newActiveIndex].id);
    }

    closeContextMenu();
  }, [contextMenu, pages, activePage, closeContextMenu]);

  const handleSetFirst = useCallback(() => {
    if (!contextMenu) return;
    const idx = pages.findIndex(p => p.id === contextMenu.pageId);
    if (idx > 0) {
      const newPages = [...pages];
      const [page] = newPages.splice(idx, 1);
      newPages.unshift(page);
      setPages(newPages);
    }
    closeContextMenu();
  }, [contextMenu, pages, closeContextMenu]);

  // Modal submit
  const handleModalSubmit = useCallback((name: string) => {
    if (!modal) return;
    if (modal.mode === 'rename' && modal.pageId) {
      setPages(pages.map(p => p.id === modal.pageId ? { ...p, name } : p));
    } else if (modal.mode === 'create' && typeof modal.insertIndex === 'number') {
      const newPage: Page = { id: Date.now().toString(), name, icon: '/file.svg' };
      const newPages = [...pages];
      newPages.splice(modal.insertIndex, 0, newPage);
      setPages(newPages);
      // Set the newly added page as active
      setActivePage(newPage.id);
    }
    setModal(null);
  }, [modal, pages]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer pages={pages} />
      <div className="w-full flex justify-center py-4 sm:py-8">
        <div
          ref={tabListRef}
          className="bg-white border-2 border-gray-200 rounded-lg px-2 sm:px-6 py-2 sm:py-4 flex items-center shadow-sm w-full max-w-full overflow-x-auto scrollbar-hide whitespace-nowrap"
          role="tablist"
          aria-label="Form Pages"
          onKeyDown={handleKeyDown}
        >
          {pages.map((page, idx) => (
            <React.Fragment key={page.id}>
              <div className="relative flex items-center group min-w-max">
                <PageTab
                  page={page}
                  isActive={activePage === page.id}
                  onClick={() => setActivePage(page.id)}
                  onContextMenu={e => handleContextMenu(e, page.id)}
                  onMenuClick={e => handleContextMenu(e, page.id)}
                  index={idx}
                  onDropTab={handleDropTab}
                  showMenu={contextMenu?.pageId === page.id}
                  tabIndex={activePage === page.id ? 0 : -1}
                />
                {idx < pages.length - 1 && (
                  <div className="min-w-max"><AddPageButton onClick={() => openCreateModal(idx + 1)} /></div>
                )}
              </div>
            </React.Fragment>
          ))}
          <div className="min-w-max"><AddPageButton onClick={() => openCreateModal(pages.length)} /></div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-[#1A1A1A] cursor-pointer hover:bg-slate-alpha-35 transition-all font-medium shadow-sm font-semibold hover:bg-[#9DA4B259]"
            onClick={() => openCreateModal(pages.length)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            Add page
          </button>
          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onSetFirst={handleSetFirst}
              onRename={handleRename}
              onCopy={handleCopy}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onClose={closeContextMenu}
              className="context-menu"
            />
          )}
          <PageModal
            isOpen={!!modal}
            mode={modal?.mode || 'create'}
            currentName={modal?.currentName}
            onClose={() => setModal(null)}
            onSubmit={handleModalSubmit}
          />
        </div>
      </div>
    </DndProvider>
  );
} 