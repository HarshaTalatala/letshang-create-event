import { useState } from 'react';

function LinksModule() {
  const [link, setLink] = useState('');

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold text-gray-900">Links</h4>
      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://example.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}

export default LinksModule;
