import React,{useEffect,useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from '../component/Carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Home() {
  const navigate=useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const Org = localStorage.getItem("Org");


  const handleUser = (e) => {

    if (isLoggedIn) {
      if (Org === "ngo") {
        navigate('/ngodash');
        
      } else if (Org === "restaurant") {
        navigate('/restdash'); 
        
      } else {
        alert("Invalid organization type");
      }
    } else {
      navigate('/signin');
    }
  }


  const [ngUser, setNgUser] = useState(0);
  const [restUser, setRestUser] = useState(0);
  const [meal,setMeal]=useState(0);

  
  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home'); 
        setNgUser(response.data.ngUserCount);
        setRestUser(response.data.restUserCount);
        setMeal(response.data.meals);
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

  return (
    <div className="App contain-inline-size m-0 relative">
      <main className="main">
        <div className="sub flex w-full  flex-col gap-2">
          <div className="cont1 flex justify-center   md:pb-2 lg:pb-2  justify-items-center ">
            <Carousel />
            
          </div>
  
          <section className="bg-orange-600 text-white text-center py-20">
            <h1 className="md:text-5xl text-3xl font-bold mb-4 ">Save Food, Save Lives</h1>
            <p className="md:text-lg text-base mb-6">Join us in reducing food wastage and feeding communities in need.</p>
            <div className="flex justify-center space-x-6"> 
              <a href="#how-it-works" className="bg-orange-700 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-orange-800">
                Learn More
              </a>
            </div>
          </section>

          <section id="how-it-works" className="container mx-auto py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">1. Suppliers Register</h3>
                <p className="text-gray-700">Food suppliers like restaurants and caterers sign up to donate surplus food.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">2. NGOs Connect</h3>
                <p className="text-gray-700">Non-profits register on the platform to receive food donations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">3. Food Rescued</h3>
                <p className="text-gray-700">Food is collected and redistributed to communities in need.</p>
              </div>
            </div>
          </section>

          <section className="bg-orange-600 text-white py-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
            <p className="text-lg mb-6">
              Whether you’re a food supplier looking to reduce waste or an NGO seeking to feed your community, Food Connect makes it easy to help.
            </p>
            <button onClick={handleUser} className="bg-white text-orange-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100">
              Get Started
            </button>
          </section>

          <section className="bg-gray-50 py-20 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">Making an Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3  md:gap-7  py-4 px-5" >
              <div className='shadow-md py-4'>
                <h1 className="text-orange-600 text-5xl font-bold ">{meal}</h1>
                <p className="text-gray-700 mt-4">Meals Rescued and Distributed</p>
              </div>

              <div className='shadow-md py-4'>
                <h1 className="text-orange-600 text-5xl font-bold">{ngUser}</h1>
                <p className="text-gray-700 mt-4">NGOs Partnered With</p>
              </div>

              <div className='shadow-md py-4  '>
                <h1 className="text-orange-600 text-5xl font-bold">{restUser}</h1>
                <p className="text-gray-700 mt-4">Food Suppliers Joined</p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Home;

