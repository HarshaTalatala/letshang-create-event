function BasicEventForm({ title, setTitle, dateTime, setDateTime, location, setLocation }) {
  return (
    <div className="space-y-5 text-gray-100">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your event"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Date & Time</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Add a location"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
        />
      </div>
    </div>
  );
}

export default BasicEventForm;
