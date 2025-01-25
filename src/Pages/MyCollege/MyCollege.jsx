import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewModal from "./ReviewModal";
import UseAuth from "../../Hooks/UseAuth";

const MyCollege = () => {
  const {user}=UseAuth()
  const [collegeData, setCollegeData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const userEmail = user?.email ;

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axiosPublic.get(`/my-colleges/${userEmail}`);
        setCollegeData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching college data:", err);
        toast.error("Failed to fetch college data.");
        setLoading(false);
      }
    };

    fetchColleges();
  }, [userEmail]);

  const handleReviewSubmit = async (collegeId, collegeName) => {
    const { review, rating } = reviewData[collegeId] || {};
    if (!review || !rating) {
      toast.warn("Please provide both a review and a rating!");
      return;
    }

    try {
      const response = await axiosPublic.post("/submit-review", {
        collegeId,
        review,
        rating,
        userEmail,
        collegeName,
      });

      if (response.status === 200) {
        toast.success("Review submitted successfully!");
        setReviewData({
          ...reviewData,
          [collegeId]: { review: "", rating: 0 },
        });
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleReviewChange = (collegeId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [collegeId]: {
        ...prev[collegeId],
        [field]: value,
      },
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-3xl font-bold m-6 text-center text-teal-600">
        My Colleges
      </h1>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {collegeData.length === 0 ? (
          <p className="text-center text-lg">No booked colleges found.</p>
        ) : (
          collegeData.map((college) => (
            <div key={college._id} className="p-6 rounded-lg shadow-lg bg-white">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {college.selectedCollege}
                  </h2>
                  <p>
                    <strong>Name:</strong> {college.name}
                  </p>
                  <p>
                    <strong>Subject:</strong> {college.subject}
                  </p>
                  <p>
                    <strong>Email:</strong> {college.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {college.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {college.address}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {college.dob}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg cursor-pointer font-semibold text-gray-800">
                  Add a Review
                </h3>
             

<textarea
  className="w-full p-2 mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
  placeholder="Write your review here in 100 words... "
  maxLength={100}
  value={reviewData[college._id]?.review || ""}
  onChange={(e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 100) {
      toast.error("Your review cannot exceed 300 characters!");
      return;
    }
    handleReviewChange(college._id, "review", inputValue);
  }}
/>;

                <div className="flex items-center mt-4">
                  <span className="text-lg font-semibold mr-2">Rating:</span>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        className={`cursor-pointer ${
                          currentRating <=
                          (reviewData[college._id]?.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() =>
                          handleReviewChange(college._id, "rating", currentRating)
                        }
                      />
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    handleReviewSubmit(college._id, college.selectedCollege)
                  }
                  className="mt-4 cursor-pointer px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600"
                >
                  Submit Review
                </button>
              </div>
              <button
                className="mt-4 cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={() => setSelectedCollege(college)}
              >
                View Reviews
              </button>
            </div>
          ))
        )}
        {selectedCollege && (
          <ReviewModal
            college={selectedCollege}
            onClose={() => setSelectedCollege(null)}
          />
        )}
      </div>
    </>
  );
};

export default MyCollege;
