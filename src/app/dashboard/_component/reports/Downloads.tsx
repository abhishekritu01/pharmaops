import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { AiOutlinePercentage } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaCloudDownloadAlt, FaShoppingCart } from "react-icons/fa";
import { MdClear, MdDateRange } from "react-icons/md";
import * as XLSX from 'xlsx';
import Loader from '../Loder';
import Pagination from '../Pagination';
import TableComponent from '../Table';

interface Record {
  productname: string;
  quantity: number;
  price: number;
  total: number;
  discount: number;
  paymentStatus: string;
  type: string;
  paymentType: string;
  createdAt: string;
  deletedAt: string;
  capacity: string;
}



const Downloads = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/sells_record');
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredRecords(records);
      return;
    }

    const filtered = records.filter((record) => {
      const recordDate = new Date(record.createdAt);
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    });

    setFilteredRecords(filtered);
    setPage(1);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredRecords(records);
  };

  const exportToExcel = () => {
    const dataToExport = filteredRecords.length > 0 ? filteredRecords : records;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Records');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `Records_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const totalOrders = filteredRecords.length;
  const totalItemsSold = filteredRecords.reduce((sum, record) => sum + record.quantity, 0);
  const totalRevenue = filteredRecords.reduce((sum, record) => sum + record.total, 0);
  const avgRevenuePerOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Downloads</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded shadow-md flex items-center gap-2 hover:shadow-lg transition-shadow">
          <FaShoppingCart className="text-xl text-blue-800" />
          <div>
            <h2 className="text-sm font-semibold text-blue-800">Total Items Sold</h2>
            <p className="text-lg font-bold">{totalItemsSold}</p>
          </div>
        </div>
        <div className="p-3 bg-green-100 rounded shadow-md flex items-center gap-2 hover:shadow-lg transition-shadow">
          {/* <MdAttachMoney className="text-xl text-green-800" /> */}
          ₹
          <div>
            <h2 className="text-sm font-semibold text-green-800">Total Revenue</h2>
            <p className="text-lg font-bold">₹ {totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="p-3 bg-purple-100 rounded shadow-md flex items-center gap-2 hover:shadow-lg transition-shadow">
          <BsFillBarChartFill className="text-xl text-purple-800" />
          <div>
            <h2 className="text-sm font-semibold text-purple-800">Total Orders</h2>
            <p className="text-lg font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="p-3 bg-yellow-100 rounded shadow-md flex items-center gap-2 hover:shadow-lg transition-shadow">
          <AiOutlinePercentage className="text-xl text-yellow-800" />
          <div>
            <h2 className="text-sm font-semibold text-yellow-800">Avg Revenue/Order</h2>
            <p className="text-lg font-bold">₹ {avgRevenuePerOrder}</p>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Start Date Filter */}
        <div className="flex flex-col -mt-4">
          <label htmlFor="startDate" className="text-xs text-primary mb-1">Start Date</label>
          <div className="flex items-center gap-2">
            <MdDateRange className="text-xl text-gray-600" />
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
        </div>

        {/* End Date Filter */}
        <div className="flex flex-col -mt-4">
          <label htmlFor="endDate" className="text-xs text-primary mb-1">End Date</label>
          <div className="flex items-center gap-2">
            <MdDateRange className="text-xl text-gray-600" />
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <button
          onClick={handleFilter}
          className="px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 flex items-center gap-2"
        >
          <MdDateRange className="text-xl" /> Apply
        </button>

        {/* Clear Filter Button */}
        <button
          onClick={clearFilter}
          className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 flex items-center gap-2"
        >
          <MdClear className="text-xl" /> Clear
        </button>

        {/* Download Button (aligned to the end) */}
        <div className="ml-auto">
          <button
            onClick={exportToExcel}
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FaCloudDownloadAlt className="text-xl" /> Download Report
          </button>
        </div>
      </div>


      {/* Download Button */}


      {loading ? (
        <Loader />
      ) : (
        <>
          <TableComponent
            data={paginatedRecords}
            columns={[
              { header: 'Product Name', accessor: 'productname' },
              { header: 'Quantity', accessor: 'quantity' },
              { header: 'Price', accessor: 'price' },
              { header: 'Total', accessor: 'total' },
              { header: 'Discount', accessor: 'discount' },
              { header: 'Payment Status', accessor: 'paymentStatus' },
              { header: 'Type', accessor: 'type' },
              { header: 'Payment Type', accessor: 'paymentType' },
              { header: 'Created At', accessor: 'createdAt' },
              { header: 'Deleted At', accessor: 'deletedAt' },
              { header: 'Capacity', accessor: 'capacity' },
            ]}
            noDataMessage="No records found"
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Downloads;
