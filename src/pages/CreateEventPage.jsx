import { useState } from 'react';
import BasicEventForm from '../components/BasicEventForm';
import FlyerUploader from '../components/FlyerUploader';
import BackgroundSelector from '../components/BackgroundSelector';
import ModuleRenderer from '../components/ModuleRenderer';
import { eventConfig } from '../mock/eventConfig';

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [flyerPreview, setFlyerPreview] = useState('');
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [enabledModules, setEnabledModules] = useState(() =>
    eventConfig.modulesAvailable.filter((module) => module.enabled)
  );

  const availableModules = eventConfig.modulesAvailable;

  const containerStyle = backgroundUrl
    ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  const handleToggleModule = (moduleId) => {
    const moduleToToggle = availableModules.find((module) => module.id === moduleId);
    if (!moduleToToggle) return;

    setEnabledModules((prev) => {
      const exists = prev.some((module) => module.id === moduleId);
      if (exists) {
        return prev.filter((module) => module.id !== moduleId);
      }
      return [...prev, { ...moduleToToggle, enabled: true }];
    });
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-[#2b2438] via-[#1c1a28] to-[#0f0d16] p-6 sm:p-10 text-gray-100"
      style={containerStyle}
    >
      {backgroundUrl && <div className="absolute inset-0 bg-black/45" aria-hidden="true" />}
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <header className="space-y-2 text-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold">Create Event</h1>
          <p className="text-sm sm:text-base text-gray-200/80 max-w-3xl">
            Build your event with a flyer, background, core details, and optional modules. All previews stay local.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[340px,1fr]">
          <div className="space-y-6">
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-md backdrop-blur-0">
              <FlyerUploader
                flyerPreview={flyerPreview}
                setFlyerPreview={setFlyerPreview}
              />
            </div>

            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-md backdrop-blur-0">
              <BackgroundSelector
                backgroundUrl={backgroundUrl}
                setBackgroundUrl={setBackgroundUrl}
              />
            </div>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-md space-y-10 backdrop-blur-0">
            <BasicEventForm
              title={title}
              setTitle={setTitle}
              dateTime={dateTime}
              setDateTime={setDateTime}
              location={location}
              setLocation={setLocation}
            />

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                <p className="text-sm text-gray-300">Enable optional modules for this event.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {availableModules.map((module) => {
                  const isEnabled = enabledModules.some((item) => item.id === module.id);
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => handleToggleModule(module.id)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                        isEnabled
                          ? 'bg-purple-700/20 border-purple-500/50 text-purple-100'
                          : 'border-white/10 text-gray-100 hover:border-white/30'
                      }`}
                    >
                      {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                {enabledModules.length === 0 ? (
                  <p className="text-sm text-gray-300">No modules enabled yet.</p>
                ) : (
                  enabledModules.map((module) => (
                    <div key={module.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
                      <ModuleRenderer module={module} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold shadow-sm">
                Save Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
