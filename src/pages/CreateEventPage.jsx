import { useState } from 'react';
import BasicEventForm from '../components/BasicEventForm';

function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Create Event
        </h1>
        <p className="text-gray-600 mb-8">
          Set up your event details
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <BasicEventForm
            title={title}
            setTitle={setTitle}
            dateTime={dateTime}
            setDateTime={setDateTime}
            location={location}
            setLocation={setLocation}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
