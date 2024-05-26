// pages/subscriptions.tsx
'use client' // 👈 use it here

import { useEffect, useState } from 'react';
import axios from 'axios';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subscription');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subscription/subscription-history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchSubscriptions();
    fetchHistory();
  }, []);

  const handleSearch = async () => {
    console.log('Searching for:', searchTerm);
  };
  

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/subscription/subscriptions/{status}`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error filtering subscriptions:', error);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);
    try {
      if (status) {
        const response = await axios.get(`http://localhost:8080/api/subscription/subscriptions/${status}`);
        setSubscriptions(response.data);
      } else {
        const response = await axios.get('http://localhost:8080/api/subscription');
        setSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions by status:', error);
    }
  };
  

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'SUBSCRIBED':
        return 'bg-green-100 text-green-900';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-900';
      case 'CANCELLED':
        return 'bg-red-100 text-red-900';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen w-screen p-[40px] bg-[#f4f4f9]">
      <div className="absolute inset-0 blur-sm overflow-hidden"></div>

      <div className="h-full border-[3px] border-adpro-000 rounded-lg overflow-hidden relative flex flex-col justify-start bg-[#e7f5fb] p-10">
        <h1 className="font-light text-7xl font-cormorant text-adpro-900 mb-6 text-center">Subscriptions</h1>
        
        <div className="mb-8">
          <h2 className="text-3xl font-cormorant text-adpro-900 mb-4">Available Subscriptions</h2>
          <div className="flex mb-4">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search..." 
              className="flex-grow p-2 border border-gray-400 rounded-lg"
            />
            <button 
              onClick={handleSearch} 
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Search
            </button>
            <button 
              onClick={handleFilter} 
              className="ml-2 p-2 bg-green-500 text-white rounded-lg"
            >
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscriptions.map((subscription: any) => (
              <div 
                key={subscription.id} 
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3 text-lg"
              >
                <span className="font-medium text-adpro-900">ID:</span> {subscription.code}
                <span className="font-medium text-adpro-900">Type:</span> {subscription.type}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-cormorant text-adpro-900 mb-4">Subscription History</h2>
          <div className="mb-4">
            <label className="font-medium text-adpro-900 mr-2">Filter by status:</label>
            <select 
              value={selectedStatus} 
              onChange={handleStatusChange} 
              className="p-2 border border-gray-400 rounded-lg"
            >
              <option value="">All</option>
              <option value="SUBSCRIBED">Subscribed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {subscriptions.map((subscription: any) => (
              <div 
                key={subscription.id} 
                className="relative p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3 text-lg"
              >
                <div>
                  <span className="font-medium text-adpro-900">ID:</span> {subscription.code}
                </div>
                <div>
                  <span className="font-medium text-adpro-900">Type:</span> {subscription.type}
                </div>
                <div>
                  <span className="font-medium text-adpro-900">Start Date:</span> {subscription.startDate}
                </div>
                <div>
                  <span className="font-medium text-adpro-900">End Date:</span> {subscription.endDate}
                </div>
                <div className={`absolute bottom-4 right-4 p-2 rounded-lg ${getStatusStyles(subscription.statusString)}`}>
                  {subscription.statusString}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
