import { useRef, useState } from 'react';
import { eventConfig } from '../mock/eventConfig';
import CustomizeModal from '../components/CustomizeModal';

const defaultFlyer = 'https://letshang.co/assets/event-default-bg-8jRl328f.png';

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [flyerPreview, setFlyerPreview] = useState('');
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  const availableModules = eventConfig.modulesAvailable;
  const fileInputRef = useRef(null);

  const handleFlyerChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setFlyerPreview(preview);
  };

  const flyerImage = flyerPreview || defaultFlyer;

  return (
    <div className="relative h-screen overflow-hidden text-[#e9e4f2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.12),transparent_26%),linear-gradient(180deg,#2d2435_0%,#151320_58%,#0b0a14_100%)]" aria-hidden="true" />

      <header className="relative z-10 flex items-center justify-between px-4 pt-4">
        <div className="text-lg font-semibold tracking-tight">Let's Hang</div>
        <button className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#f6f2ff] shadow-sm shadow-black/20 hover:border-white/30">
          Save Draft
        </button>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-8 pt-8 lg:flex-row lg:items-start lg:justify-between">
        <section className="w-full lg:max-w-[440px] xl:max-w-[460px] space-y-6 flex-shrink-0">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/30 aspect-square">
            <img src={flyerImage} alt="Flyer" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/35" aria-hidden="true" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-[#4b3c63] shadow-md hover:bg-white"
            >
              Edit
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFlyerChange}
            />
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/30 bg-gradient-to-b from-[#1f222d] to-[#111019] px-4 py-4 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-900/40 hover:border-emerald-200/60">
            Go live
          </button>
        </section>

        <section className="w-full lg:max-w-[520px] xl:max-w-[540px] space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name your event"
              className="w-full bg-transparent text-3xl font-bold leading-tight text-[#f6f2ff] placeholder:text-[#cfc8dd] focus:outline-none focus:ring-0"
              aria-label="Event title"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/25">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-[#cfc8dd]">Date & time</p>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-[#f6f2ff] placeholder:text-[#9b93ac] focus:border-purple-300/60 focus:outline-none"
                  placeholder="December 31 2025, 04:00 PM"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-[#cfc8dd]">Location</p>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add where it happens"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-[#f6f2ff] placeholder:text-[#9b93ac] focus:border-purple-300/60 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-[#cfc8dd]">Cost/person & ticket options</p>
                <input
                  type="text"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="Free or add ticket details"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-[#f6f2ff] placeholder:text-[#9b93ac] focus:border-purple-300/60 focus:outline-none"
                />
                <p className="mt-1 text-[10px] text-[#9b93ac]">Tickets can only be created before going live</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/25">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-[#cfc8dd]">Describe your event</p>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a short description so guests know what to expect"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 text-sm text-[#f6f2ff] placeholder:text-[#9b93ac] focus:border-purple-300/60 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2d2542] via-[#221e33] to-[#1a1828] shadow-lg shadow-black/25 px-4 py-5">
            <div className="relative">
              {/* Floating Icons */}
              <div className="absolute left-2 top-0 text-[#6b5d7a] opacity-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 11.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <div className="absolute left-8 top-5 text-[#6b5d7a] opacity-50">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div className="absolute right-2 top-0 text-[#6b5d7a] opacity-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                </svg>
              </div>
              <div className="absolute right-8 top-5 text-[#6b5d7a] opacity-50">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <div className="absolute left-5 top-2 text-[#6b5d7a] opacity-50">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>

              {/* Center Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-base font-semibold text-[#d4cfe0] leading-tight">
                  Customize your
                  <br />
                  event your way
                </h3>
                <div className="mt-2 flex justify-end pr-4">
                  <span className="text-[10px] font-medium tracking-wider text-[#8b7d9d]">RSVP</span>
                </div>
              </div>
            </div>

            {/* Customize Button */}
            <div className="mt-4">
              <button 
                onClick={() => setIsCustomizeModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#34293f]/60 px-3 py-2 text-sm font-semibold text-[#f6f2ff] backdrop-blur-sm hover:border-white/30 hover:bg-[#3d3149]/70"
              >
                <svg className="h-4 w-4 text-[#c29bff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                Customize
              </button>
            </div>
          </div>
        </section>
      </main>

      <CustomizeModal 
        isOpen={isCustomizeModalOpen} 
        onClose={() => setIsCustomizeModalOpen(false)} 
      />
    </div>
  );
}

export default CreateEventPage;
