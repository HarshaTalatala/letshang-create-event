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

  const handleEnableModule = (moduleId) => {
    const moduleToAdd = availableModules.find((module) => module.id === moduleId);
    if (!moduleToAdd) return;

    setEnabledModules((prev) => {
      const exists = prev.some((module) => module.id === moduleId);
      if (exists) return prev;
      return [...prev, { ...moduleToAdd, enabled: true }];
    });
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8"
      style={containerStyle}
    >
      {backgroundUrl && <div className="absolute inset-0 bg-black/25" aria-hidden="true" />}
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Event</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Set up your event details and add a flyer preview for quick sharing.
          </p>
        </header>

        <div className="relative bg-white border border-gray-100 rounded-2xl shadow-xl p-10">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            <BasicEventForm
              title={title}
              setTitle={setTitle}
              dateTime={dateTime}
              setDateTime={setDateTime}
              location={location}
              setLocation={setLocation}
            />

            <div className="space-y-8">
              <FlyerUploader
                flyerPreview={flyerPreview}
                setFlyerPreview={setFlyerPreview}
              />

              <BackgroundSelector
                backgroundUrl={backgroundUrl}
                setBackgroundUrl={setBackgroundUrl}
              />
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                <p className="text-sm text-gray-500">Enable optional modules for this event.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {availableModules.map((module) => {
                const isEnabled = enabledModules.some((item) => item.id === module.id);
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => handleEnableModule(module.id)}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      isEnabled
                        ? 'bg-purple-50 border-purple-200 text-purple-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {enabledModules.length === 0 ? (
                <p className="text-sm text-gray-500">No modules enabled yet.</p>
              ) : (
                enabledModules.map((module) => (
                  <div key={module.id} className="p-4 border border-gray-200 rounded-lg">
                    <ModuleRenderer module={module} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end">
            <button className="px-9 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold shadow-sm">
              Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
