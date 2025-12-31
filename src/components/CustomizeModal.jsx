import { useState } from 'react';

const customizationOptions = [
  {
    id: 'questionnaires',
    title: 'Questionnaires',
    description: 'Create questionnaires for your event. Hosts can create questions and view respon...',
    free: true,
    eventCount: 446,
    userCount: 406,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
  },
  {
    id: 'new-section',
    title: 'New section',
    description: 'Add a custom section to showcase anything you want on your event page.',
    free: true,
    eventCount: 817,
    userCount: 277,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
  },
  {
    id: 'invite',
    title: 'Invite',
    description: 'Personally invite each and every guest within seconds',
    paid: true,
    eventCount: 340,
    userCount: 150,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10h-2V8h2v2zm0-4h-2V1h2v5zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96 19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"/>
      </svg>
    ),
  },
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    description: 'Add photos for guests to view and relive the vibe.',
    free: true,
    eventCount: 342,
    userCount: 302,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
    ),
  },
  {
    id: 'links',
    title: 'Links',
    description: 'Share links to event guides, menus, playlists, and more.',
    free: true,
    eventCount: 832,
    userCount: 292,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
    ),
  },
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Post updates & messages to keep your guests informed.',
    free: true,
    eventCount: 686,
    userCount: 146,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
      </svg>
    ),
  },
  {
    id: 'text-blasts',
    title: 'Text blasts',
    description: 'Send text messages directly to your guest\'s phone number to keep your guests inf...',
    free: true,
    eventCount: 565,
    userCount: 25,
    icon: (
      <svg className="h-4 w-4 text-[#9b8ab3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
      </svg>
    ),
  },
];

function CustomizeModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredOptions = customizationOptions.filter(
    option =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-xl rounded-2xl border border-white/10 bg-[#1f1a2e] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#e9e4f2]">Customize</h2>
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

        {/* Options List */}
        <div className="px-5 py-1">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="group flex items-center gap-3 border-b border-white/5 py-2.5 last:border-b-0"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                {option.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-[#e9e4f2]">{option.title}</h3>
                <p className="text-[10px] text-[#9b93ac] line-clamp-1 leading-tight">{option.description}</p>

                <div className="mt-1 flex items-center gap-2.5 text-[10px] text-[#6b5d7a]">
                  <span className="flex items-center gap-0.5">
                    {option.free ? 'Free' : option.paid ? '$ Paid' : ''}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    {option.eventCount}k events
                  </span>
                  <span className="flex items-center gap-0.5">
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {option.userCount}k
                  </span>
                </div>
              </div>

              <button className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#9b93ac] transition-all hover:border-white/30 hover:bg-white/10 hover:text-[#e9e4f2]">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomizeModal;
