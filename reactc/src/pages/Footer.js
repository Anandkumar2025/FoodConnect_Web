import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          
          <div className="mb-6 md:mb-0 text-orange-500 text-2xl md:text-5xl  font-bold">
          <a href="/">Foodconnect</a>
          </div>

       
          <div className="Links_Sections grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3  md:text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase">Quick Links</h2>
              <ul className="text-gray-500">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link to="/contact" className="hover:underline">
                    Contact us
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link to="/signup" className="hover:underline">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        <hr className="line my-6 border-gray-200" />

      
        <div className="Foot_Bottom flex flex-col ">
          <span className="md:text-base text-sm text-gray-500 mb-4 md:mb-0 text-center ">
            © 2023{' '}
            <a href="http://localhost:3000/" className="hover:underline">
            foodconnect
            </a>
            . All Rights Reserved.
          </span>
          
        </div>
      </div>
    </footer>
  );
}
