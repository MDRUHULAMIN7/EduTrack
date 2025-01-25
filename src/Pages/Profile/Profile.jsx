import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaUniversity} from "react-icons/fa";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${email}`);
        console.log("API Response:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="profile-container max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      {user ? (
        <div>
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md">
              <img
                src={user.photo}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
              {user.name}{" "}
              <span className="text-sm text-gray-500">({user.role})</span>
            </h2>
          </div>

        
          <div className="space-y-4 ">

            <div className="flex-col items-center">
          <div className="flex">    <MdEmail className="text-[#3a9970] text-xl mr-3" />
          <span className="text-sm text-gray-500">Email</span></div>

              <div>
                   <p className="text-gray-700 ml-6">{user.email}</p>
            
              </div>
            </div>
            <div className="flex-col items-center">
          <div className="flex">    <FaUniversity className="text-[#3a9970] text-xl mr-3" />
          <span className="text-sm text-gray-500">University</span></div>

              <div>
                   <p className="text-gray-700 ml-6"> {user.university || "Not provided"}</p>
            
              </div>
            </div>
            <div className="flex-col items-center">
          <div className="flex">    <MdLocationOn className="text-[#3a9970] text-xl mr-3" />
          <span className="text-sm text-gray-500">Address</span></div>

              <div>
                   <p className="text-gray-700 ml-6"> {user.address || "Not provided"}</p>
            
              </div>
            </div>


            
       
           
          </div>

          {/* Edit Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-[#3a9970] text-white font-medium rounded-md hover:bg-teal-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Modal for Editing */}
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
