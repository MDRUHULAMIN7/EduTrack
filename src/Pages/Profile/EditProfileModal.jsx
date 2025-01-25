import { useState } from "react";
import axios from "axios";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth";

const EditProfileModal = ({ user, onClose }) => {
  const cloudinary_api = import.meta.env.VITE_Cloudinary_API_KEY;
  const upload_preset = "bycj1ok9";
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    university: user.university || "",
    address: user.address || "",
    image: user.photo || "",
  });
  const {updateuserprofile} = UseAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For showing error messages
  const [successMessage, setSuccessMessage] = useState(""); // For showing success message

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset); 

      try {
        const response = await axios.post(cloudinary_api, formData);

        setFormData((prev) => ({
          ...prev,
          image: response.data.secure_url, 
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axiosPublic.post('/update-profile', {
        email: user.email, 
      
        name: formData.name,
        university: formData.university,
        address: formData.address,
        image: formData.image,
      });
      await updateuserprofile(formData.name,formData?.image,);
        console.log(response,user)
        if (response.status === 200) {
            toast("Profile updated successfully")
        }
      setSuccessMessage("Profile updated successfully!"); 
      onClose();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update profile.");
    }
  };

  // Close modal when clicked outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 backdrop-blur-md  flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        {/* Show success or error messages */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <form onSubmit={(e) => e.preventDefault()}>
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
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
            <label className="block text-gray-700">Profile Image</label>
            <div className="flex gap-2">
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 h-16 border border-gray-300 rounded-md mt-2"
              />
              <div>
                {loading && <div className="mt-2 text-gray-500">Uploading image...</div>}
                {formData.image && !loading && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
