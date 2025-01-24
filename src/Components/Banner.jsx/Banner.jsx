import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi"; 
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function Banner() {
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleSearch = async (event) => {
    const query = event.target.value.trim();

    if (query.length > 0) {
      try {

        const { data } = await axiosPublic.get(`/colleges?search=${query}`);
        setSearchResults(data); 
        setShowModal(true); 
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
     
      setSearchResults([]);
      setShowModal(false);
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false); 
      }
    };

   
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f7f8fc] to-[#fff] pb-12 relative">
  
      <div className="bg-[#cce3de] py-4 px-8 flex justify-center">
        <div className="flex items-center w-full max-w-2xl relative">
          <input
            type="text"
            placeholder="Search Colleges..."
            className="flex-grow px-4 py-2 bg-white rounded-l-md text-sm focus:outline-[#6b9080]"
            onChange={handleSearch}
          />
          <button className="flex items-center bg-[#6b9080] text-white px-4 py-[6px] rounded-r-md font-medium hover:bg-[#79b89b]">
            <BiSearch className="mr-2" /> Search
          </button>

      
          {showModal && (
            <div
              ref={modalRef} 
              className="absolute top-12 left-0 w-full max-h-64 bg-white shadow-lg rounded-md z-50 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                msOverflowStyle: "auto",
                scrollbarColor: "#6b9080 #ffffff",
              }}
            >
              {searchResults.length > 0 ? (
                searchResults.map((college) => (
                  <Link to={`college/${college._id}`}
                    key={college._id}
                    className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      console.log(college); 
                    }}
                  >
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-16 h-16 rounded-md object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-[#001f4f]">{college.name}</h4>
                      <p className="text-sm text-gray-600">
                        {college.description.substring(0, 50)}...
                      </p>
                      <p className="text-sm text-[#6b9080]">
                        Admission: {college.admissionDate}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-center text-gray-600">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>

     
      <div className="text-center mx-auto max-w-screen-lg mt-12 py-8">
        <h2 className="text-[#001f4f] font-medium">
          DISCOVER QUALITY EDUCATION ANYTIME, ANYWHERE
        </h2>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff6600] to-[#7b3bff] mt-4">
          Empower Your Future with <br /> EduTrack
        </h1>
        <div className="mt-8 flex justify-center gap-2">
          <button className="bg-[#6b9080] text-white px-2 md:px-6 py-2 rounded-md font-semibold hover:bg-[#618d7a]">
            Book Your College Now
          </button>
          <button className="border border-[#001f4f] text-[#001f4f] px-6 py-2 rounded-md font-semibold hover:bg-[#6b9080] hover:text-white">
            All Colleges
          </button>
        </div>
      </div>
      <div className="mt-12 grid md:grid-cols-4 grid-cols-2 gap-6 px-4 py-8 max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6">
          <h4 className="text-lg font-bold text-[#001f4f]">40 Courses</h4>
        </div>
        <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6">
          <h4 className="text-lg font-bold text-[#001f4f]">90 Online Courses</h4>
        </div>
        <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6">
          <h4 className="text-lg font-bold text-[#001f4f]">200 Students</h4>
        </div>
        <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6">
          <h4 className="text-lg font-bold text-[#001f4f]">900+ Hours</h4>
        </div>
      </div>
    </div>
  );
}

export default Banner;
