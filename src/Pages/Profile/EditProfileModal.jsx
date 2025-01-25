import { useState } from "react";
import axios from "axios";

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    university: user.university || "",
    address: user.address || "",
    suggestedData: "", // A new field for suggested data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/users/${user.email}`, formData);
      if (response.status === 200) {
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">University</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Suggested Data</label>
          <input
            type="text"
            name="suggestedData"
            value={formData.suggestedData}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            placeholder="Add any suggested data..."
          />
        </div>
        <div className="modal-actions flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
