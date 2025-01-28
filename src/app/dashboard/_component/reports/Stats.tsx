import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loder";

interface Stat {
  name: string;
  value: number;
}

const Stats = () => {
  const [stats, setStats] = useState<Stat[]>([]); // Store the stats data 
  const [loading, setLoading] = useState<boolean>(true); // Handle the loading state
  const [startDate, setStartDate] = useState<string>(""); // Start date for filter
  const [endDate, setEndDate] = useState<string>(""); // End date for filter

  useEffect(() => {
    fetchStats(); // Fetch stats when the component is mounted
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/statscount', {
        params: {
          startDate,
          endDate,
        },
      }); // Pass date filters as query parameters
      setStats(response.data); // Store the response data
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleFilter = () => {
    fetchStats(); // Refetch stats with the updated date range
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Date Filter Section */}
      <div className="flex justify-end items-center gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={handleFilter}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Filter
        </button>
      </div>

      {/* Stats Display */}
      <dl className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border border-gray-200 rounded-lg shadow-sm p-3 text-center text-white"
          >
            <dt className="text-primary font-medium truncate w-full">{stat.name}</dt>
            <dd className="text-lg font-semibold text-primary mt-1">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
