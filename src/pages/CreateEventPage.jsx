import { useState } from 'react';
import BasicEventForm from '../components/BasicEventForm';
import FlyerUploader from '../components/FlyerUploader';

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [flyerPreview, setFlyerPreview] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Event</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Set up your event details and add a flyer preview for quick sharing.
          </p>
        </header>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-10">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            <BasicEventForm
              title={title}
              setTitle={setTitle}
              dateTime={dateTime}
              setDateTime={setDateTime}
              location={location}
              setLocation={setLocation}
            />

            <FlyerUploader
              flyerPreview={flyerPreview}
              setFlyerPreview={setFlyerPreview}
            />
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
