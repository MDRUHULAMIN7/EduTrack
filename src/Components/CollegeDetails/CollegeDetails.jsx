import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../Hooks/useAxiosPublic';

const CollegeDetails = () => {
  const { id } = useParams(); // get the 'id' from the URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      if (id) {
        try {
          const response = await axiosPublic.get(`/colleges/${id}`);
          setCollege(response.data);
          console.log('API Response:', response.data); // Log to verify
        } catch (err) {
          setError('Error fetching college details');
          console.error('API Error:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCollegeDetails();
  }, [id]); // re-run when 'id' changes

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center mb-6">
       
          <img
            src={college?.image}
            alt={college?.name}
            className="w-full md:w-72 h-64 object-cover rounded-lg shadow-md mb-4 md:mb-0"
          />

          <div className="md:ml-6 flex flex-col justify-center">
          
            <p className="text-lg text-gray-600 mt-2">{college?.description.slice(90)}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-yellow-500">Rating:</span>
              <span className="text-lg font-semibold">{college?.rating} / 5</span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Admission Date: <span className="text-[#6b9080]">{college?.admissionDate}</span></p>
              <p>Research Count: <span className="text-[#6b9080]">{college?.researchCount}</span></p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#001f4f] mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f0f8ff] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#6b9080]">Events</h3>
              <p>{college?.details?.events}</p>
            </div>
            <div className="bg-[#f0f8ff] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#6b9080]">Sports</h3>
              <p>{college?.details?.sports}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollegeDetails;
