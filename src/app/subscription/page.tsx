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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subscription/subscriptions');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subscription/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchSubscriptions();
    fetchHistory();
  }, []);

  const handleSearch = async () => {
    //TODO: add search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleFilter = async () => {
    //TODO: add filter logic here
    console.log('Filtering by:', filter);
  };

  const handleSort = async (e: any) => {
    const selectedSort = e.target.value;
    setSortOrder(selectedSort);
    //TODO: add sort logic here
    console.log('Sorting by:', selectedSort);
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
            <label className="font-medium text-adpro-900 mr-2">Sort by:</label>
            <select 
              value={sortOrder} 
              onChange={handleSort} 
              className="p-2 border border-gray-400 rounded-lg"
            >
              <option value="">Select</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-4">
            {history.map((record: any) => (
              <div 
                key={record.id} 
                className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg flex flex-col gap-3 text-lg"
              >
                <span className="font-medium text-adpro-900">ID:</span> {record.code}
                <span className="font-medium text-adpro-900">Type:</span> {record.type}
                <span className="font-medium text-adpro-900">Date:</span> {record.date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
