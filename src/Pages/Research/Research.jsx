import { useState } from "react";
import { ImCross } from "react-icons/im";

export const Research = () => {
  const researchData = [
    {
      title: "Artificial Intelligence in Education",
      image:"https://i.ibb.co.com/tm1zDzm/download.jpg",
      author: "John Doe",
      description:
        "This paper explores the use of Artificial Intelligence to enhance learning experiences and improve education systems.",
    },
    {
      title: "Quantum Computing and Its Applications",
      image:"https://i.ibb.co.com/n1rXnDZ/download-1.jpg",
      author: "Jane Smith",
      description:
        "An in-depth study of quantum computing and its revolutionary applications in various fields, including cryptography and optimization.",
    },
    {
      title: "Blockchain Technology for Secure Transactions",
      image:"https://i.ibb.co.com/Wn2ch2T/download-2.jpg",
      author: "Alice Brown",
      description:
        "This research paper discusses how blockchain technology ensures secure and transparent transactions across industries.",
    },
    {
      title: "Climate Change and Sustainable Energy",
      image:"https://i.ibb.co.com/DkN5mnD/download-3.jpg",
      author: "David Wilson",
      description:
        "Analyzing the impact of climate change and exploring sustainable energy solutions for a greener future.",
    },
  ];

  const [selectedPaper, setSelectedPaper] = useState(null); 

  const handleOpenModal = (paper) => {
    setSelectedPaper(paper); 
  };

  const handleCloseModal = () => {
    setSelectedPaper(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Research Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchData.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-[#2c3e57]">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">Author: {item.author}</p>
            <button
              onClick={() => handleOpenModal(item)}
              className="mt-2 inline-block text-[#6b9080] hover:underline"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

 
      {selectedPaper && (
        <div
          className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50 "
          onClick={handleCloseModal} 
        >
          <div
            className="bg-white pt-8 pb-6 px-6 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <ImCross className=""></ImCross>
            </button>
            <h3 className="text-xl font-semibold text-[#2c3e57] mb-2 mt-3">
                <img src={selectedPaper.image} className="h-32 w-full  rounded-md" alt={selectedPaper.title}/>
              {selectedPaper.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Author:</strong> {selectedPaper.author}
            </p>
            <p className="text-gray-700">{selectedPaper.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
