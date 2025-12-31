import { useRef } from 'react';

function BackgroundSelector({ backgroundUrl, setBackgroundUrl }) {
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setBackgroundUrl(preview);
  };

  const handleSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 text-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Background</h3>
        {backgroundUrl && (
          <button
            type="button"
            onClick={handleSelect}
            className="text-sm font-medium text-purple-200 hover:text-purple-100"
          >
            Change background
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="w-full max-w-sm aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
          {backgroundUrl ? (
            <img
              src={backgroundUrl}
              alt="Background preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">No background selected</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleSelect}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
          >
            {backgroundUrl ? 'Change background' : 'Select background'}
          </button>
          <p className="text-xs text-gray-400">Local preview only; not uploaded.</p>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSelector;
