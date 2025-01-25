import { useEffect, useState } from 'react';
import { axiosPublic } from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';  // Import the toast module
import 'react-toastify/dist/ReactToastify.css';  // Import the required styles
import UseAuth from '../../Hooks/UseAuth';

const Admission = () => {
  const {user}=UseAuth()
  const [selectedCollege, setSelectedCollege] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const [colleges, setColleges] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const cloudinary_api = import.meta.env.VITE_Cloudinary_API_KEY;
  const upload_preset = 'bycj1ok9';
  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      email:user?.email ,
      phone: '',
      address: '',
      dob: '',
      image: imageUrl,
    });
    setSelectedCollege('');
    setImageUrl(null);
  };

  useEffect(() => {
    
    const fetchColleges = async () => {
      try {
        const response = await axiosPublic.get('/colleges-name');
        setColleges(response.data);  // Set the college names from the response
      } catch (err) {
        console.error('Error fetching colleges:', err);
      }
    };

    fetchColleges();  
  }, []);

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formDataToUpload = new FormData();
    formDataToUpload.append('file', file);
    formDataToUpload.append('upload_preset', upload_preset);

    try {
      const response = await fetch(cloudinary_api, {
        method: 'POST',
        body: formDataToUpload,
      });
      const result = await response.json();
      setImageUrl(result.secure_url); 
      setFormData({ ...formData, image: result.secure_url });
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    const dataToSubmit = {
      ...formData,
      email: formData.email || user?.email,
      selectedCollege,
    };

   


 
    try {
setLoading(true);
      const response = await axiosPublic.post('/submit', dataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

   
      if (response.data.message) {
        toast.success(response.data.message);
        setLoading(false)
        resetForm()
      }
    } catch (err) {
        setLoading(false)
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        setLoading(false)
        toast.error('Error submitting form. Please try again.');
      }
    }
  };

  return (
    <div className="p-8 h-[80vh]  flex items-center justify-center">
      {colleges && colleges.length ? <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Admission Form</h1>

        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700">Select College For Applay</h3>
          <select
            value={selectedCollege}
            onChange={handleCollegeChange}
            className="w-full p-2 mt-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">Choose a College</option>
            {colleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>

        {selectedCollege && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-medium text-gray-800 text-center">
              Apply for {selectedCollege}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

           

              <div>
                <label htmlFor="phone" className="text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="address" className="text-gray-700">Your Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Your Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="dob" className="text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              
            <div className="">
              <h3 className=" text-gray-700">Upload Your Image</h3>
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className="w-full p-2 mt-1 bg-gray-100 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
           
            </div>
            </div>


            <button
              type="submit"
              className="w-full p-2 mt-4 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600"
            >
           { loading ? 'Application on Proccess': ` Submit Application`}
            </button>
          </form>
        )}
      </div> :<h1 className='mt-10 text-center text-xl'> Loading Colleges ...</h1>}

  
    </div>
  );
};

export default Admission;
