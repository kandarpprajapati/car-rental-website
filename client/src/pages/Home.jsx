import React from "react";
import CarImage from "../../public/car-images/van.jpg";

const Home = () => {
  return (
    <div className="relative bg-orange-500 rounded-lg shadow-md overflow-hidden max-w-7xl mx-auto mt-8">
      {/* Image Section */}
      <div className="relative">
        <img
          src={CarImage} // Replace with your car image
          alt="Car"
          className="w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        {/* <h1 className="text-3xl font-bold uppercase tracking-wider">
          Helsinki
        </h1>
        <p className="text-lg mt-2">
          Luotettavat palvelut <br /> Edulliseen hintaan.
        </p> */}
      </div>
    </div>
  );
};

export default Home;
