import { useRef } from 'react';

function FlyerUploader({ flyerPreview, setFlyerPreview }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFlyerPreview(previewUrl);
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const actionLabel = flyerPreview ? 'Change flyer' : 'Upload flyer';

  return (
    <div className="space-y-4 text-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Flyer</h3>
        {flyerPreview && (
          <button
            type="button"
            onClick={handleSelectClick}
            className="text-sm font-medium text-purple-200 hover:text-purple-100"
          >
            Change flyer
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full max-w-sm aspect-[4/3] bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
          {flyerPreview ? (
            <img
              src={flyerPreview}
              alt="Flyer preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center px-4 text-gray-400 text-sm">
              Add a flyer image to preview it here.
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleSelectClick}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
          >
            {actionLabel}
          </button>
          <p className="text-xs text-gray-400">Images stay local — no upload.</p>
        </div>
      </div>
    </div>
  );
}

export default FlyerUploader;
