


const Footer = () => {
  return (
    <footer className="bg-[#eaf4f4] text-black py-10 px-6 mt-5">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
  
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">EduTrack</h2>
          <p className="text-sm">
            Your go-to platform for exploring and booking college services, admissions, and more.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="hover:text-blue-500">
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a href="https://www.instagram.com" className="hover:text-pink-500">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com" className="hover:text-blue-700">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>


        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/colleges" className="hover:text-gray-400">Colleges</a></li>
            <li><a href="/admission" className="hover:text-gray-400">Admission</a></li>
            <li><a href="/my-college" className="hover:text-gray-400">My College</a></li>
          </ul>
        </div>

     
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-sm">Feel free to reach out to us for inquiries or support!</p>
          <ul className="space-y-2">
            <li><a href="mailto:info@techwave.com" className="hover:text-gray-400">info@edu-track.com</a></li>
            <li><a href="tel:+1234567890" className="hover:text-gray-400" >+88 01903001637</a></li>
            <li> Nowhata, Rajshahi, Bangladesh</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Subscribe to our Newsletter</h3>
          <p className="text-sm">Get updates on new colleges, admissions, events, and more directly in your inbox.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-3/4 rounded-l-lg bg-gray-600 text-white focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-[#3a9970] text-white rounded-r-lg hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

    
      <div className="mt-10 border-t border-gray-600 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} EduTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
