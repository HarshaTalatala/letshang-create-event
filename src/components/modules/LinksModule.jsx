import { useState } from 'react';

function LinksModule() {
  const [link, setLink] = useState('');

  return (
    <div className="space-y-2 text-gray-100">
      <h4 className="text-base font-semibold">Links</h4>
      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://example.com"
        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
      />
    </div>
  );
}

export default LinksModule;
