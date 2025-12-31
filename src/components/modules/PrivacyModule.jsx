import { useState } from 'react';

function PrivacyModule() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="space-y-2 text-gray-100">
      <h4 className="text-base font-semibold">Privacy</h4>
      <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsPublic(true)}
          className={`px-4 py-2 text-sm ${isPublic ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-100'}`}
        >
          Public
        </button>
        <button
          type="button"
          onClick={() => setIsPublic(false)}
          className={`px-4 py-2 text-sm ${!isPublic ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-100'}`}
        >
          Private
        </button>
      </div>
    </div>
  );
}

export default PrivacyModule;
