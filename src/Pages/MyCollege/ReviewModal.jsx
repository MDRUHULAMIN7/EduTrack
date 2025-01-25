import { useEffect, useState } from "react";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ReviewModal = ({ college, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [expandedReview, setExpandedReview] = useState(null); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get(`/reviews/${college._id}`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        toast.error("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, [college._id]);

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axiosPublic.delete(`/reviews/${reviewId}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  const handleCloseModal = (e) => {

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.716 5.287h5.551c.969 0 1.371 1.24.588 1.81l-4.49 3.232 1.716 5.287c.3.921-.755 1.688-1.54 1.11l-4.49-3.232-4.49 3.232c-.784.578-1.839-.19-1.54-1.11l1.716-5.287-4.49-3.232c-.783-.57-.381-1.81.588-1.81h5.551l1.716-5.287z" />
      </svg>
    ));
  };

  const toggleReview = (reviewId) => {
   
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  return (
    <div
      className="fixed inset-0  flex items-center justify-center backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 z-10"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-bold mb-4">
          Reviews for {college.selectedCollege}
        </h2>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="mb-4 border-b pb-2">
              <p
                className="cursor-pointer text-blue-500"
                onClick={() => toggleReview(review._id)} // Toggle review visibility
              >
                {expandedReview === review._id ? "Hide Review" : "Show Review"}
              </p>
              {expandedReview === review._id && (
                <>
                  <p>{review.review}</p>
                  <p className="flex items-center">
                    <strong>Rating:</strong>
                    <span className="ml-2 flex">{renderRatingStars(review.rating)}</span>
                  </p>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-500 text-sm mt-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 cursor-pointer bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
