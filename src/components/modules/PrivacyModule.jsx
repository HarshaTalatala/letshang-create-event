import { useState } from 'react';

function PrivacyModule() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold text-gray-900">Privacy</h4>
      <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsPublic(true)}
          className={`px-4 py-2 text-sm ${isPublic ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Public
        </button>
        <button
          type="button"
          onClick={() => setIsPublic(false)}
          className={`px-4 py-2 text-sm ${!isPublic ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Private
        </button>
      </div>
    </div>
  );
}

export default PrivacyModule;
