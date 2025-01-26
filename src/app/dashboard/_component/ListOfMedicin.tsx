import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import Loder from "./Loder";

interface Medicine {
  id: string;
  productname: string;
  createdAt: string;
  price: number;
  quantity: number;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

// Helper function to compare only the date part, ignoring time
const isSameDay = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Strip the time part from both dates to ensure only the date part is compared
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  return d1.getTime() === d2.getTime(); // Compare the time (after setting it to 00:00:00)
};


interface update {
  update: boolean;
}

const ListOfMedicin: React.FC<update> = ({ update }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Adjust as per your preference
  const [dateFilter, setDateFilter] = useState<string | null>(null); // 'today', 'week', 'month', 'year'

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        let endpoint = "/api/sells_record";
        const today = new Date();
        const todayISOString = today.toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

        // Example of dynamic endpoint based on date filter
        if (dateFilter === "today") {
          endpoint += `?date=${todayISOString}`;
        } else if (dateFilter === "week") {
          // Add logic for filtering by week
        } else if (dateFilter === "month") {
          // Add logic for filtering by month
        } else if (dateFilter === "year") {
          // Add logic for filtering by year
        }

        const response = await axios.get(endpoint);
        const filteredMedicines = response.data.filter((medicine: Medicine) => {
          if (dateFilter === "today") {
            return isSameDay(medicine.createdAt, todayISOString); // Compare without time
          }
          // Add additional filters for week, month, or year here
          return true; // For other filters, return all items
        });
        setMedicines(filteredMedicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
      setLoading(false);
    };

    fetchMedicines();
  }, [dateFilter, update]);

  // Pagination
  const totalItems = medicines.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicines.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/deletemedicine/${id}`);
      setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
      toast.success("Medicine deleted successfully");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      toast.error("Failed to delete medicine");
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-1">
      <h2 className="text-xs text-gray-800 text-center mb-4">List of Medicines</h2>
      <div className="flex justify-center mb-4 space-x-4">
        <button className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-200" onClick={() => setDateFilter("today")}>Today</button>
        <button className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-200" onClick={() => setDateFilter("week")}>This Week</button>
        <button className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-200" onClick={() => setDateFilter("month")}>This Month</button>
        <button className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-200" onClick={() => setDateFilter("year")}>This Year</button>
      </div>
      {loading ? (
        <Loder />
      ) : (
        <div>
          <table className="min-w-full text-xs table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-1 py-2 border">Name</th>
                <th className="px-1 py-2 border">Date</th>
                <th className="px-1 py-2 border">Price (₹)</th>
                <th className="px-1 py-2 border">Quantity</th>
                <th className="px-1 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((medicine, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{medicine.productname}</td>
                  <td className="px-4 py-2 border">{formatDate(medicine.createdAt)}</td>
                  <td className="px-4 py-2 border">{medicine.price}</td>
                  <td className="px-4 py-2 border">{medicine.quantity}</td>
                  <td className="px-4 py-2 border flex justify-center items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit size={16} />
                    </button>
                    <button 
                    onClick={() => {handleDelete(medicine.id)}}
                    className="text-red-600 hover:text-red-800">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default ListOfMedicin;
