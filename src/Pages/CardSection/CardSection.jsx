import { useEffect, useState } from "react";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const CardSection = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegesDetails = async () => {
      try {
        const response = await axiosPublic.get(`/colleges-6`);
        setColleges(response.data); // Store the API response data
        console.log("API Response:", response.data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchCollegesDetails();
  }, []);

  if (loading) {
    return <div className="text-center text-xl my-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Admission Date:</strong> {college.admissionDate}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Events:</strong> Various academic and cultural events
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Research History:</strong> {college.researchCount} papers
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Sports:</strong> Football, Cricket, Basketball, and more
            </p>
            <Link
            to={`college/${college._id}`}
      
              className="mt-4 bg-[#6b9080] text-white px-4 py-2 rounded hover:bg-[#5e8b78] transition"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
