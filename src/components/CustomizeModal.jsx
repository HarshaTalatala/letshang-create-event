import { useState, useEffect } from 'react';

// Modal is now controlled by parent via props: options + onSave
function CustomizeModal({ isOpen, onClose, options = [], onSave }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(options.map((o) => ({ ...o })));
  const [view, setView] = useState('list'); // 'list' or 'edit'
  const [editingItemId, setEditingItemId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Defer state updates to avoid synchronous setState inside effect
    Promise.resolve().then(() => {
      if (cancelled) return;
      setItems(options.map((o) => ({ ...o })));
      setView('list');
      setEditingItemId(null);
      setEditDraft(null);
    });
    return () => { cancelled = true; };
  }, [options, isOpen]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOptions = items.filter(
    option =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (option.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNew = () => {
    const newItem = {
      id: `custom-${Date.now()}`,
      title: 'New item',
      description: '',
      free: true,
      eventCount: 0,
      userCount: 0,
    };
    setItems([newItem, ...items]);
    // open item into edit page
    setEditingItemId(newItem.id);
    setEditDraft(newItem);
    setView('edit');
  };

  // Inline field updates are handled by editing flow; remove unused helper

  const openEditPage = (id) => {
    const target = items.find(it => it.id === id);
    if (!target) return;
    setEditingItemId(id);
    setEditDraft({ ...target });
    setView('edit');
  };

  const removeItem = (id) => setItems(items.filter(it => it.id !== id));

  const handleCancel = () => {
    // reset edits and close
    setItems(options.map((o) => ({ ...o, isEditing: false })));
    onClose?.();
  };

  const handleSaveAll = () => {
    // strip isEditing flags by creating a shallow copy and deleting the flag
    const cleaned = items.map((item) => {
      const copy = { ...item };
      delete copy.isEditing;
      return copy;
    });
    onSave?.(cleaned);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-xl rounded-2xl border border-white/10 bg-[#1f1a2e] shadow-2xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#e9e4f2]">Customize</h2>
            <button onClick={addNew} className="ml-2 rounded-md px-2 py-1 text-xs font-medium text-[#c29bff] hover:bg-white/5">+ Add</button>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#9b93ac] transition-colors hover:bg-white/10 hover:text-[#e9e4f2]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="border-b border-white/10 px-5 py-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9b93ac]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for settings"
              className="w-full rounded-lg border border-white/10 bg-[#2a2438] py-2 pl-9 pr-3 text-sm text-[#e9e4f2] placeholder:text-[#6b5d7a] focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/30"
            />
          </div>
        </div>

        <div className="relative px-5 py-1">
          {/* LIST PANEL */}
          <div className={`transition-all duration-200 ${view === 'list' ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-4 absolute inset-0 pointer-events-none'}`}>
            <div className="max-h-[80vh] overflow-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="group flex items-start gap-3 border-b border-white/5 py-3 last:border-b-0"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-[#4b3c63]">
                    {option.title ? option.title.slice(0,2).toUpperCase() : 'O'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-[#e9e4f2]">{option.title}</h3>
                    <p className="text-[10px] text-[#9b93ac] line-clamp-2 leading-tight">{option.description}</p>
                    <div className="mt-1 flex items-center gap-2.5 text-[10px] text-[#6b5d7a]">
                      <span className="flex items-center gap-0.5">{option.free ? 'Free' : option.paid ? '$ Paid' : ''}</span>
                      <span className="flex items-center gap-0.5">{option.eventCount}k events</span>
                      <span className="flex items-center gap-0.5">{option.userCount}k</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button title={`Edit ${option.title}`} onClick={() => openEditPage(option.id)} aria-label={`Edit ${option.title}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 p-1 text-[#9b93ac] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDIT PANEL */}
          <div className={`transition-all duration-200 ${view === 'edit' ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'}`}>
            {editDraft && (
              <div className="px-0 py-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => { setView('list'); setEditingItemId(null); setEditDraft(null); }} className="rounded-md px-2 py-1 text-sm text-[#9b93ac]">Back</button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => {
                      // discard changes and go back
                      const orig = items.find(it => it.id === editingItemId);
                      if (orig) setEditDraft({ ...orig });
                      setView('list');
                      setEditingItemId(null);
                    }} className="rounded-md px-3 py-1 text-sm text-[#9b93ac]">Cancel</button>
                    <button onClick={() => {
                      // save draft into items
                      setItems(prev => prev.map(it => it.id === editDraft.id ? { ...editDraft } : it));
                      setView('list');
                      setEditingItemId(null);
                      setEditDraft(null);
                    }} className="rounded-md bg-purple-600 px-3 py-1 text-sm font-semibold text-white">Save</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <input value={editDraft.title} onChange={(e) => setEditDraft(prev => ({ ...prev, title: e.target.value }))} className="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 text-sm text-[#e9e4f2]" />
                  <textarea value={editDraft.description} onChange={(e) => setEditDraft(prev => ({ ...prev, description: e.target.value }))} rows={4} className="w-full rounded-md border border-white/10 bg-transparent px-2 py-2 text-xs text-[#cfc8dd]" />
                  <div className="flex gap-3 items-center text-[11px] text-[#9b93ac]">
                    <label className="flex items-center gap-1"><input type="checkbox" checked={!!editDraft.free} onChange={(e) => setEditDraft(prev => ({ ...prev, free: e.target.checked }))} /> Free</label>
                    <label className="flex items-center gap-1">Events <input type="number" value={editDraft.eventCount} onChange={(e) => setEditDraft(prev => ({ ...prev, eventCount: Number(e.target.value) }))} className="w-24 rounded-md border border-white/10 bg-transparent px-1 py-0.5 text-xs text-[#e9e4f2]" /></label>
                    <label className="flex items-center gap-1">Users <input type="number" value={editDraft.userCount} onChange={(e) => setEditDraft(prev => ({ ...prev, userCount: Number(e.target.value) }))} className="w-24 rounded-md border border-white/10 bg-transparent px-1 py-0.5 text-xs text-[#e9e4f2]" /></label>
                  </div>
                  <div>
                    <button onClick={() => removeItem(editDraft.id)} className="rounded-md bg-red-600/20 px-2 py-1 text-sm text-red-400">Delete item</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer (only in list view) */}
        {view === 'list' && (
          <div className="flex items-center justify-end gap-3 border-t border-white/10 px-5 py-3">
            <button onClick={handleCancel} className="rounded-md px-3 py-1 text-sm text-[#9b93ac]">Cancel</button>
            <button onClick={handleSaveAll} className="rounded-md bg-purple-600 px-3 py-1 text-sm font-semibold text-white">Save changes</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomizeModal;
