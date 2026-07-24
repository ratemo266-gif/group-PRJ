import React from 'react';
import { useQuery } from 'react-query';
import { getUserTickets } from '../services/ticketService';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

function MyTickets() {
  const { data, isLoading, error } = useQuery('tickets', getUserTickets);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-500">
          Error loading tickets. Please try again.
        </div>
      </div>
    );
  }

  const tickets = data?.tickets || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Ticket className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Yet</h3>
          <p className="text-gray-500 mb-6">You haven't purchased any tickets yet.</p>
          <Link
            to="/events"
            className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {ticket.event?.title || 'Event'}
                    </h3>
                    <p className="text-sm text-gray-500">Ticket #{ticket.ticket_number}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ticket.is_valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {ticket.is_valid ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Valid
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        Used
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : 'Date TBD'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{ticket.event?.venue || 'Venue TBD'}</span>
                  </div>
                </div>

                {ticket.seat_number && (
                  <div className="mt-2 text-sm text-gray-500">
                    Seat: {ticket.seat_number}
                    {ticket.section && `, Section: ${ticket.section}`}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Purchased: {new Date(ticket.purchase_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
