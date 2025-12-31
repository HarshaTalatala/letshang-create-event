import { useRef, useState, useEffect } from 'react';
import CustomizeModal from '../components/CustomizeModal';
import DateTimePicker from '../components/DateTimePicker';
// Use mock API abstraction to fetch initial configuration instead of importing raw config
import { fetchInitialEventConfig } from '../mock/api';

const defaultFlyer = 'https://letshang.co/assets/event-default-bg-8jRl328f.png';

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [flyerPreview, setFlyerPreview] = useState('');
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  // Initialize customizations from the mock API boundary (localStorage overrides)
  const [customizations, setCustomizations] = useState(() => {
    try {
      const saved = localStorage.getItem('customizations');
      return saved ? JSON.parse(saved) : fetchInitialEventConfig().customizationOptions;
    } catch {
      return fetchInitialEventConfig().customizationOptions;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('customizations', JSON.stringify(customizations));
    } catch {}
  }, [customizations]);
  // Accent colors extracted from flyer; format: [r, g, b]
  const [accentTopRGB, setAccentTopRGB] = useState([124, 58, 237]);
  const [accentBottomRGB, setAccentBottomRGB] = useState([29, 23, 34]);

  // Mirror accents to :root so components rendered outside the page tree (eg. datepicker popper appended to body)
  // can still inherit the theme variables.
  useEffect(() => {
    try {
      document.documentElement.style.setProperty('--accent-top', accentTopRGB.join(','));
      document.documentElement.style.setProperty('--accent-bottom', accentBottomRGB.join(','));
    } catch {}
  }, [accentTopRGB, accentBottomRGB]);

  const fileInputRef = useRef(null);

  const handleFlyerChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setFlyerPreview(preview);
  };

  const flyerImage = flyerPreview || defaultFlyer;

  // Extract subtle top and bottom accents from the flyer for a top->bottom gradient flow
  useEffect(() => {
    let canceled = false;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = flyerImage;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const w = 64;
        const h = 64;
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;

        const sampleRegion = (y0, y1) => {
          let r = 0, g = 0, b = 0, weightSum = 0;
          for (let y = y0; y < y1; y++) {
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              const a = data[idx + 3];
              if (a < 125) continue;
              const rr = data[idx], gg = data[idx + 1], bb = data[idx + 2];
              const lum = 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
              if (lum < 18) continue; // ignore very dark
              const mx = Math.max(rr, gg, bb), mn = Math.min(rr, gg, bb);
              const sat = mx === 0 ? 0 : (mx - mn) / mx;
              const weight = 1 + sat * 2; // give more weight to saturated pixels
              r += rr * weight; g += gg * weight; b += bb * weight; weightSum += weight;
            }
          }
          if (weightSum === 0) return null;
          return [Math.round(r / weightSum), Math.round(g / weightSum), Math.round(b / weightSum)];
        };

        const top = sampleRegion(0, Math.floor(h / 3)) || sampleRegion(0, Math.floor(h / 2));
        const bottom = sampleRegion(Math.floor(h * 2 / 3), h) || sampleRegion(Math.floor(h / 2), h);

        if (!canceled) {
          if (top) setAccentTopRGB(top);
          if (bottom) setAccentBottomRGB(bottom);
        }
      } catch {
        // keep defaults on error
      }
    };

    img.onerror = () => { /* ignore */ };
    return () => { canceled = true; };
  }, [flyerImage]);

  return (
    <div className="relative h-screen overflow-hidden text-[#e9e4f2]" style={{ '--accent-top': accentTopRGB.join(','), '--accent-bottom': accentBottomRGB.join(',') }}>
      <div className="absolute inset-0" aria-hidden="true">
        {/* Layered background: subtle accent gradient on top of the original dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.12), rgba(var(--accent-bottom),0.06)), radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03), transparent 18%), linear-gradient(180deg,#2d2435 0%,#151320 58%,#0b0a14 100%)',
          }}
          aria-hidden="true"
        />
        {/* Optional subtle overlay to soften the effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.06), rgba(var(--accent-bottom), 0.03))',
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 pt-4">
        <div className="text-2xl lg:text-3xl font-semibold tracking-tight">Let's Hang</div>
        <button className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#f6f2ff] shadow-sm shadow-black/20 hover:border-white/30">
          Save Draft
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-8">
        {/* Glass wrapper: removable - delete this div to remove glassmorphism */}
        <div
          className="w-full rounded-3xl relative backdrop-blur-md shadow-xl shadow-black/30 p-6 lg:p-8"
          style={{
            '--accent-top': accentTopRGB.join(','),
            '--accent-bottom': accentBottomRGB.join(','),
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(var(--accent-top), 0.08)',
          }}
        >
          {/* Accent overlay (subtle top->bottom) */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.06), rgba(var(--accent-bottom), 0.03))',
              opacity: 0.9,
            }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <section className="w-full lg:max-w-[440px] xl:max-w-[460px] space-y-6 flex-shrink-0">
              <div
            className="relative overflow-hidden rounded-3xl shadow-xl shadow-black/30 aspect-square"
            style={{
              border: '1px solid rgba(var(--accent-top),0.18)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/35" aria-hidden="true" />
            {/* Color tint overlay for flyer image (subtle) */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top),0.12), rgba(var(--accent-bottom),0.03))', mixBlendMode: 'overlay', opacity: 0.9 }}
              aria-hidden="true"
            />
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

              <div className="relative w-full">
                {/* Subtle go-live tile tint overlay */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top),0.10), rgba(var(--accent-bottom),0.04))', opacity: 0.9 }} aria-hidden="true" />
                <button
                  className="relative z-10 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-900/40"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top),0.10), rgba(var(--accent-bottom),0.04)), linear-gradient(to bottom, #1f222d, #111019)',
                    border: '1px solid rgba(var(--accent-bottom),0.12)'
                  }}
                >
                  Go live
                </button>
              </div>
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

              <div
            className="overflow-hidden rounded-2xl shadow-lg shadow-black/25"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.06), rgba(var(--accent-bottom),0.03))',
              border: '1px solid rgba(var(--accent-top),0.08)',
            }}
          >
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-[#cfc8dd]">Date & time</p>
                    <DateTimePicker
                      selected={dateTime}
                      onChange={setDateTime}
                      placeholderText="December 31 2025, 04:00 PM"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-[#f6f2ff] placeholder:text-[#9b93ac] focus:border-purple-300/60 focus:outline-none"
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

              <div
            className="rounded-2xl shadow-lg shadow-black/25"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.05), rgba(var(--accent-bottom),0.03))',
              border: '1px solid rgba(var(--accent-top),0.08)',
            }}
          >
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

              <div
            className="relative overflow-hidden rounded-2xl shadow-lg shadow-black/25 px-4 py-5"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top), 0.06), rgba(var(--accent-bottom),0.03)), linear-gradient(to bottom right, #2d2542, #221e33, #1a1828)',
              border: '1px solid rgba(var(--accent-top),0.08)',
            }}
          >
            {/* Subtle in-panel tint overlay */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top),0.10), rgba(var(--accent-bottom),0.05))', opacity: 0.9 }} aria-hidden="true" />
                <div className="relative z-10">
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
                    <h3 className="text-base font-semibold text-[#d4cfe0] truncate">
                      Customize your event your way
                    </h3>
                    <div className="mt-1 flex justify-end pr-2">
                      <span className="text-[10px] font-medium tracking-wider text-[#8b7d9d]">RSVP</span>
                    </div>
                  </div>
                </div>

                {/* Customize Button */}
                <div className="mt-2">
                  <div className="flex flex-col items-center gap-1">
                    <button 
                      onClick={() => setIsCustomizeModalOpen(true)}
                      className="flex items-center justify-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-[#f6f2ff] backdrop-blur-sm"
                      style={{
                        border: '1px solid rgba(var(--accent-top),0.10)',
                        backgroundImage: 'linear-gradient(180deg, rgba(var(--accent-top),0.04), rgba(255,255,255,0.02))'
                      }}
                    >
                      <svg className="h-4 w-4 text-[#c29bff]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                      Customize
                    </button>
                    <span className="text-[11px] text-[#cfc8dd]">{customizations.length} items</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <CustomizeModal 
        isOpen={isCustomizeModalOpen} 
        onClose={() => setIsCustomizeModalOpen(false)} 
        options={customizations}
        onSave={(newOptions) => { setCustomizations(newOptions); setIsCustomizeModalOpen(false); }}
      />
    </div>
  );
}

export default CreateEventPage;
