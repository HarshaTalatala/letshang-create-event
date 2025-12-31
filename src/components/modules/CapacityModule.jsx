import { useState } from 'react';

function CapacityModule() {
  const [capacity, setCapacity] = useState('');

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold text-gray-900">Capacity</h4>
      <input
        type="number"
        min="0"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        placeholder="Max attendees"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
}

export default CapacityModule;
