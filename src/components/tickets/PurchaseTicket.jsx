import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { purchaseTicket } from '../../services/ticketService';
import toast from 'react-hot-toast';

function PurchaseTicket({ eventId, availableTickets, price }) {
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    () => purchaseTicket(eventId, quantity),
    {
      onSuccess: (data) => {
        toast.success(`Successfully purchased ${quantity} ticket(s)!`);
        queryClient.invalidateQueries(['event', eventId]);
        queryClient.invalidateQueries('tickets');
        queryClient.invalidateQueries('events');
      },
      onError: (error) => {
        const message = error.response?.data?.error || 'Failed to purchase tickets';
        toast.error(message);
      }
    }
  );

  const handlePurchase = () => {
    if (quantity > availableTickets) {
      toast.error(`Only ${availableTickets} tickets available`);
      return;
    }
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <h3 className="text-xl font-semibold mb-4">Purchase Tickets</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-600">Price per ticket</span>
          <span className="font-semibold">${price.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-600">Available</span>
          <span className={`font-semibold ${availableTickets === 0 ? 'text-red-500' : 'text-green-600'}`}>
            {availableTickets} tickets
          </span>
        </div>
        
        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-gray-600">Quantity</span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={availableTickets}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0 && val <= availableTickets) {
                  setQuantity(val);
                }
              }}
              className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={() => setQuantity(Math.min(availableTickets, quantity + 1))}
              disabled={quantity >= availableTickets}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
        
        <button
          type="button"
          onClick={handlePurchase}
          disabled={mutation.isLoading || availableTickets === 0}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
            mutation.isLoading || availableTickets === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600'
          }`}
        >
          {mutation.isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : availableTickets === 0 ? (
            'Sold Out'
          ) : (
            'Purchase Tickets'
          )}
        </button>
        
        {availableTickets > 0 && availableTickets < 10 && (
          <p className="text-sm text-orange-500 text-center">
            Only {availableTickets} tickets remaining!
          </p>
        )}
      </div>
    </div>
  );
}

export default PurchaseTicket;
