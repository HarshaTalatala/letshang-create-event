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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Background</h3>
        {backgroundUrl && (
          <button
            type="button"
            onClick={handleSelect}
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Change background
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="w-full max-w-xs aspect-video bg-gray-50 border border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
          {backgroundUrl ? (
            <img
              src={backgroundUrl}
              alt="Background preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500">No background selected</span>
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
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            {backgroundUrl ? 'Change background' : 'Select background'}
          </button>
          <p className="text-xs text-gray-500">Local preview only; not uploaded.</p>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSelector;
