import React, { useState } from "react";
import { toast } from "react-toastify";
import Loder from "./Loder"; // Corrected typo here
import axios from "axios";
import { FaPlus } from "react-icons/fa";

interface Medicine {
  productname: string;
  quantity: number;
  price: number;
  total: number;
  discount: number;
  paymentStatus: "PAID" | "UNPAID";
  type: string;
  paymentType: PaymentType;
  transactionId?: string;
  capacity?: string;
}

type PaymentType = "CASH" | "CARD" | "UPI";

const medicineTypes = [
  "TABLET",
  "CAPSULE",
  "POWDER",
  "GRANULES",
  "LOZENGE",
  "PILL",
  "SYRUP",
  "ELIXIR",
  "SUSPENSION",
  "EMULSION",
  "SOLUTION",
  "DROPS",
  "OINTMENT",
  "CREAM",
  "GEL",
  "PASTE",
  "FOAM",
  "INHALER",
  "NEBULIZER_SOLUTION",
  "SPRAY",
  "TRANSDERMAL_PATCH",
  "SUPPOSITORY",
  "IMPLANT",
  "MEDICATED_SHAMPOO",
  "MOUTHWASH",
  "GARGLE",
  "VIAL",
  "AMPOULE",
  "EFFERVESCENT_TABLET",
  "SUBLINGUAL_TABLET",
  "BUCCAL_TABLET",
  "CHEWABLE_TABLET",
  "DISINTEGRATING_TABLET",
  "PATCH",
];

interface MedicineFormProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ update, setUpdate }) => {  
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    productname: "",
    quantity: 0,
    price: 0,
    total: 0,
    discount: 0,
    paymentStatus: "PAID",
    type: "TABLET",
    paymentType: "CASH",
    transactionId: "",
    capacity: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewMedicineChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]:
        name === "quantity" || name === "price" || name === "discount"
          ? Number(value)
          : value,
    });
  };

  const handleAddToList = () => {
    const updatedMedicine = {
      ...newMedicine,
      total: newMedicine.quantity * newMedicine.price - newMedicine.discount,
    };
    setMedicines([...medicines, updatedMedicine]);
    setNewMedicine({
      productname: "",
      quantity: 0,
      price: 0,
      total: 0,
      discount: 0,
      paymentStatus: "PAID",
      type: "TABLET",
      paymentType: "CASH",
      transactionId: "",
      capacity: "",
    });
    toast.success("Medicine added to the list!");
  };

  const handleRemoveFromList = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (medicines.length === 0) {
      toast.error("Please add medicines to submit.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/sells_record", medicines);
      console.log("Response:", response.data);
      toast.success("Medicines submitted successfully!");
      setMedicines([]);
      setUpdate(!update);
    } catch (error) {
      console.error("Error submitting medicines:", error);
      toast.error("Failed to submit medicines.");
    }
    setLoading(false);
    setUpdate(!update);
  };

  return (
    <div className="max-w-full mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Add Medicines
      </h2>
      {/* Form to add new medicine */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 mb-4 border-b pb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productname"
              value={newMedicine.productname}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dosage/Capacity
            </label>
            <input
              type="text"
              name="capacity"
              value={newMedicine.capacity}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price per Unit (₹)
            </label>
            <input
              type="number"
              name="price"
              value={newMedicine.price}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={newMedicine.quantity}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medicine Type
            </label>
            <select
              name="type"
              value={newMedicine.type}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
            >
              {medicineTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={newMedicine.paymentStatus}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
            >
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Type
            </label>
            <select
              name="paymentType"
              value={newMedicine.paymentType}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount (₹)
            </label>
            <input
              type="number"
              name="discount"
              value={newMedicine.discount}
              onChange={handleNewMedicineChange}
              className="p-1 border rounded w-full"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToList}
          className="bg-green-500 flex items-center justify-center hover:bg-green-600 text-white text-xs py-2 px-4 rounded mt-4 space-x-2"
        >
          <FaPlus />
          <span>Add to List</span>
        </button>

      </form>

      {/* Table to display medicines */}
      <table className="table-auto w-full text-xs border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-1">Product Name</th>
            <th className="border border-gray-300 p-1">Dosage/Capacity</th>
            <th className="border border-gray-300 p-1">Price</th>
            <th className="border border-gray-300 p-1">Quantity</th>
            <th className="border border-gray-300 p-1">Total</th>
            <th className="border border-gray-300 p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-1">{medicine.productname}</td>
              <td className="border border-gray-300 p-1">{medicine.capacity}</td>
              <td className="border border-gray-300 p-1">{medicine.price}</td>
              <td className="border border-gray-300 p-1">{medicine.quantity}</td>
              <td className="border border-gray-300 p-1">{medicine.total}</td>
              <td className="border border-gray-300 p-1">
                <button
                  onClick={() => handleRemoveFromList(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded "
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit button */}
      {loading ? (
        <div className="text-center">
          <Loder />
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primaryhover text-white py-2 px-4 rounded w-full text-xs"
        >
          Submit All Medicines
        </button>
      )}
    </div>
  );
};

export default MedicineForm;
