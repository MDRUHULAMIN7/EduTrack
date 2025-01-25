import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { toast } from "react-toastify";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get("/reviews");
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
       Reviews
      </h2>
      {reviews?.length > 0 ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {review.collegeName}
                </h3>
                <p className="text-gray-600 italic mb-4">{review.review}</p>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)]?.map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.716 5.287h5.551c.969 0 1.371 1.24.588 1.81l-4.49 3.232 1.716 5.287c.3.921-.755 1.688-1.54 1.11l-4.49-3.232-4.49 3.232c-.784.578-1.839-.19-1.54-1.11l1.716-5.287-4.49-3.232c-.783-.57-.381-1.81.588-1.81h5.551l1.716-5.287z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 flex gap-2">
                <h1>  <img className="h-12 w-12 rounded-full" src={review.userPhoto} alt="" /></h1>  <h1 className="flex-col"><h3 className="text-left"> {review.userName}</h3> <h3> {review.date}</h3><span></span> </h1>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-600">No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewSlider;
