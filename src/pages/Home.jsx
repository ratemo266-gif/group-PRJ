import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getEvents } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import { Calendar, Ticket, Users, Star } from 'lucide-react';

function Home() {
  const { data, isLoading } = useQuery(['events', '', '', 1], () => getEvents('', '', 1));

  const featuredEvents = data?.events?.slice(0, 6) || [];

  const stats = [
    { icon: Calendar, label: 'Events', value: '500+' },
    { icon: Ticket, label: 'Tickets Sold', value: '10K+' },
    { icon: Users, label: 'Happy Users', value: '5K+' },
    { icon: Star, label: 'Rating', value: '4.8/5' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find and book tickets for concerts, sports, theater, and more. 
              Your next experience starts here.
            </p>
            <Link
              to="/events"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto text-primary-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <Link to="/events" className="text-primary-500 hover:text-primary-600 font-semibold">
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {!isLoading && featuredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No events available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
