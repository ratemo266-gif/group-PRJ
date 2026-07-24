import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getEvent } from '../services/eventService';
import PurchaseTicket from '../components/tickets/PurchaseTicket';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => getEvent(id)
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-500">
          <p className="text-xl">Event not found</p>
          <button
            onClick={() => navigate('/events')}
            className="mt-4 text-primary-500 hover:text-primary-600"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={event.image_url || 'https://via.placeholder.com/800x400'}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-primary-500" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-primary-500" />
                  <span>{new Date(event.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-primary-500" />
                  <span>{event.venue} - {event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-primary-500" />
                  <span>{event.available_tickets} tickets available</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About this event</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
              </div>

              {event.category && (
                <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                  {event.category}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {isAuthenticated ? (
            <PurchaseTicket
              eventId={event.id}
              availableTickets={event.available_tickets}
              price={event.price}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 mb-4">Please login to purchase tickets</p>
              <button
                onClick={() => navigate('/login', { state: { from: `/events/${id}` } })}
                className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Login to Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
