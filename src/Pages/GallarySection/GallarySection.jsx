
import {  useState } from "react";


const GallarySection = () => {
  const [galleryData, setGalleryData] = useState([
    {
      image: "https://www.shutterstock.com/image-photo/dhaka-bangladesh-december-08-2019-600nw-1582486417.jpg",
      collegeName: "Dhaka College",
      graduationYear: 2020,
      description: "A memorable graduation day at Dhaka College."
    },
    {
      image: "https://c8.alamy.com/comp/PG9J78/a-group-of-graduates-gather-during-the-46th-convocation-of-the-students-of-dhaka-university-dhaka-bangladesh-PG9J78.jpg",
      collegeName: "University of Dhaka",
      graduationYear: 2021,
      description: "Graduates celebrating their success at University of Dhaka."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSwbqozz-B8sLp190v4C4t82Z1WH6XUiFA6A&s",
      collegeName: "Bangladesh University of Engineering",
      graduationYear: 2019,
      description: "Engineering graduates at BUET after a long journey."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK_5MmEBvlz6-3zUVU7Ycv8EKue9y5DEq8Yw&s",
      collegeName: "Chittagong University",
      graduationYear: 2022,
      description: "Graduates of 2022 from Chittagong University."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1N3tAyvWUJF7rpksy20o0p0a4X3kNp2mYKg&s",
      collegeName: "Rajshahi University",
      graduationYear: 2020,
      description: "Class of 2020 at Rajshahi University."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9EtmYViM7Fq4nzoYoh9SYbpveQyzu6tqN-w&s",
      collegeName: "Jahangirnagar University",
      graduationYear: 2021,
      description: "The vibrant group photo from Jahangirnagar University."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbh_aSM3nPZgr3_HS60ii0gtIm2W0JO28tJg&s",
      collegeName: "Khulna University",
      graduationYear: 2022,
      description: "Graduates from Khulna University ready to step into the world."
    },
    {
      image: "https://www.sau.ac.bd/uploads/news/news_banner_2790_1709529501.jpg",
      collegeName: "Sylhet Agricultural University",
      graduationYear: 2019,
      description: "Celebrating the graduation at Sylhet Agricultural University."
    }
  ]);

  return (
    <div className="container mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">College Graduate Group Photos</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {galleryData.map((item, index) => (
        <div key={index} className="relative group rounded-lg overflow-hidden">
      
          <div
            className="h-72 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>

        
          <div className="absolute bottom-[-100%] left-0 right-0 transition-all duration-500 ease-in-out group-hover:bottom-0 bg-[#6b9080] bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-xl font-semibold">{item.collegeName}</h3>
            <p className="text-lg">{item.graduationYear}</p>
            <p className="text-sm mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>




  );
};

export default GallarySection;
