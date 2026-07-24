import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getEvents } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Search } from 'lucide-react';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data, isLoading, error } = useQuery(
    ['events', debouncedSearch, category, 1],
    () => getEvents(debouncedSearch, category, 1)
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-12">Error loading events</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="concert">Concerts</option>
            <option value="sports">Sports</option>
            <option value="theater">Theater</option>
            <option value="conference">Conferences</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {data?.events?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Events;
