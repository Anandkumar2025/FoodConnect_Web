import { React, useEffect } from 'react';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  return (
    <div className="min-h-screen bg-gray-50- text-gray-800">
      <div className="container mx-auto  px-6 py-16 ">

    

        



        <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8">
          About Food Connect
        </h1>
        <p className="text-lg text-gray-700  max-w-2xl mx-auto ">
          <strong>Food Connect</strong> is a platform dedicated to reducing food waste by connecting food suppliers such as restaurants and caterers with non-profit organizations. Our mission is to rescue surplus food and ensure it reaches communities in need. By utilizing cutting-edge technology, we streamline the process of food donation, ensuring real-time communication, optimized logistics, and a simple, user-friendly interface for all participants.
        </p>


        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Food Connect, our goal is to minimize food waste while providing a valuable resource to those in need. We believe that by connecting food suppliers with non-profit organizations, we can make a real impact in fighting hunger and food insecurity.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">What We Do</h2>
            <p className="text-gray-700">
              We provide an easy-to-use platform where restaurants, catering services, and other food suppliers can donate their surplus food to NGOs. Our system ensures that food is picked up and redistributed to those in need in a timely and efficient manner, reducing food waste and helping communities thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
