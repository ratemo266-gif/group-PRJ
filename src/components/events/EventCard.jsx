import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={event.image_url || 'https://via.placeholder.com/400x200'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
          {event.available_tickets > 0 ? `${event.available_tickets} left` : 'Sold Out'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            <span>${event.price.toFixed(2)}</span>
          </div>
        </div>
        
        <Link
          to={`/events/${event.id}`}
          className="block w-full text-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
