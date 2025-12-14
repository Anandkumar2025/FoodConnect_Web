// import { useEffect, useState } from 'react';
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Restdash() {
//   const username = localStorage.getItem("username");
//   const [totalDonations, setTotalDonations] = useState(localStorage.getItem('totalDonations') || 0);
//   const useraddress=localStorage.getItem("address");
//   const [donations, setDonations] = useState([]);

//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);


//   useEffect(() => {
//     if (donations.length > 0) {
//       const total = donations.length;  
//       localStorage.setItem('totalDonations', total);  
//     }
//   }, [donations]);


//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const UserId = localStorage.getItem('UserId'); 
//         if (!UserId) {
//           console.error('No UserId found');
//           return;
//         }

//         const response = await fetch(`http://localhost:3001/restdash?userId=${UserId}`);
//         const data = await response.json();

//         if (response.ok) {
//           const formattedDonations = data.map(donation => ({
//             date: new Date(donation.createdAt).toLocaleDateString(),
//             items: `${donation.quantity} ${donation.food}`,
//             cook: new Date(donation.time).toLocaleDateString(),
//             expiry:new Date(donation.expiry).toLocaleDateString()
//           }));


//           setDonations(formattedDonations);  
//           const total = formattedDonations.length; 
//           setTotalDonations(total);
//           localStorage.setItem('totalDonations', total);
//         } else {
//           console.error('Error fetching donations:', data.message);
//         }

//       } catch (error) {
//         console.error('Error fetching recent donations:', error);
//       }
//     };
//     fetchDonations(); 
//   }, []);


//   const handleShowAll = () => {
//     setShowAll(true);
//   };
//   const donationsToShow = showAll ? donations : donations.slice(0, 3);


//   return (
//     <div className="min-h-screen bg-gray-500">
//       <header className="bg-white shadow p-6 flex justify-between">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Restaurant Dashboard</h1>
//           <p className="text-gray-600 mt-2">Welcome, {username}</p>
//         </div>
//         <div className="flex items-center">
//           <Link to="/donate">
//             <button className='bg-orange-500 rounded-md px-6 py-2 md:px-10 md:py-2  text-xl font-semibold active:bg-orange-600'>
//               Donate
//             </button>
//           </Link>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         <section className="sm:grid-cols-2 md:flex justify-between">
//         <div className="bg-white  p-4 md:p-6 rounded-lg shadow ">
//             <h3 className="text-gray-500 md:text-xl  text-lg font-medium ">Total Donation</h3>
//             <p className="mt-3 md:text-3xl text-2xl font-semibold text-gray-600">{totalDonations}</p>
//           </div>
//           <div className='md:w-80 mt-5 md:mt-0 bg-white  p-4 md:p-6 rounded-lg shadow '>
//             <div className="text-lg  md:text-xl font-medium text-gray-500">Address:</div>
//             <p className="text-gray-600 mt-2 text-base  md:text-xl">{useraddress} </p>
//           </div>
//         </section>

//         {donations.length > 0 ? (
//           <section className="mt-8 ">
//             <h2 className="text-xl font-semibold text-gray-800">Recent Donations</h2>
//             <div className="<RecentDonations bg-white shadow sm:rounded-lg mt-4 overflow-x-auto ">
//               <table className="min-w-full divide-y divide-gray-200 ">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                     <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Cook ON</th>
//                     <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Expiry ON</th>
//                     <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {donationsToShow
//                     .map((donation, index) => (
//                       <tr key={index}>
//                         <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
//                         <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
//                         <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
//                         <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
//                         <td className="px-3 md:px-6 py-4 whitespace-nowrap">Delivered</td>
//                       </tr>
//                     ))}

//                 </tbody>
//               </table>
//               <hr />
//               {!showAll && donations.length > 3 && (
//                <div className="text-center text-gray-600 px-6 pt-5 w-full hover:text-gray-800 hover:underline  ">
//                  <button
//                   onClick={handleShowAll}
//                 >
//                   Show All
//                 </button>
//                 </div>
//               )}
//             </div>
//           </section>
//         ):<div className='text-center mt-20 text-5xl text-gray-700'>
//           You have not Donate yet !! 
//           </div>}
//       </main>
//     </div>
//   );

// };

// export default Restdash;


import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Restdash() {
  const username = localStorage.getItem("username");
  const [totalDonations, setTotalDonations] = useState(localStorage.getItem('totalDonations') || 0);
  const useraddress = localStorage.getItem("address");
  const [donations, setDonations] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (donations.length > 0) {
      const total = donations.length;  
      localStorage.setItem('totalDonations', total); 
    }
  }, [donations]);

  
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const UserId = localStorage.getItem('UserId');  
        const token = localStorage.getItem('token');    

        if (!UserId || !token) {
          console.error('No UserId or token found');
          navigate('/signin');  
          return;
        }

  
        const response = await axios.get('http://localhost:3001/restdash', {
          headers: {
            'Authorization': token 
          }
        });

        const data = response.data;

        if (response.status === 200) {
         
          const formattedDonations = data.map(donation => ({
            date: new Date(donation.createdAt).toLocaleDateString(),
            items: `${donation.quantity} ${donation.food}`,
            cook: new Date(donation.time).toLocaleDateString(),
            expiry:new Date(donation.expiry).toLocaleDateString()
          }));

          setDonations(formattedDonations);  
          const total = formattedDonations.length;  
          setTotalDonations(total);
          localStorage.setItem('totalDonations', total);
        } else {
          console.error('Error fetching donations:', response.data.message);
        }

      } catch (error) {
        console.error('Error fetching recent donations:', error);
        if (error.response && error.response.status === 403) {
         
          alert('Session expired. Please login again.');
          localStorage.clear();
          navigate('/signin');
        }
      }
    };

    fetchDonations();  
  }, [navigate]);

  const handleShowAll = () => {
    setShowAll(true);
  };
  
  const donationsToShow = showAll ? donations : donations.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-6 flex justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Restaurant Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {username}</p>
        </div>
        <div className="flex items-center">
          <Link to="/donate">
            <button className='bg-orange-500 rounded-md px-6 py-2 md:px-10 md:py-2  text-xl font-semibold active:bg-orange-600'>
              Donate
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="sm:grid-cols-2 md:flex justify-between">
        <div className="bg-white  p-4 md:p-6 rounded-lg shadow ">
            <h3 className="text-gray-500 md:text-xl  text-lg font-medium ">Total Donation</h3>
            <p className="mt-3 md:text-3xl text-2xl font-semibold text-gray-600">{totalDonations}</p>
          </div>
          <div className='md:w-80 mt-5 md:mt-0 bg-white  p-4 md:p-6 rounded-lg shadow '>
            <div className="text-lg  md:text-xl font-medium text-gray-500">Address:</div>
            <p className="text-gray-600 mt-2 text-base  md:text-xl">{useraddress} </p>
          </div>
        </section>

        {donations.length > 0 ? (
          <section className="mt-8 ">
            <h2 className="text-xl font-semibold text-gray-800">Recent Donations</h2>
            <div className="<RecentDonations bg-white shadow-md sm:rounded-lg mt-4 overflow-x-auto ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Cook ON</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Expiry ON</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm md:text-md font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donationsToShow
                    .map((donation, index) => (
                      <tr key={index}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">Delivered</td>
                      </tr>
                    ))}

                </tbody>
              </table>
              <hr />
              {!showAll && donations.length > 3 && (
               <div className="text-center text-gray-600 px-6 pt-5 w-full hover:text-gray-800 hover:underline  ">
                 <button
                  onClick={handleShowAll}
                >
                  Show All
                </button>
                </div>
              )}
            </div>
          </section>
        ):<div className='text-center mt-20 text-5xl text-gray-700'>
          You have not Donate yet !! 
          </div>}
      </main>
    </div>
  );
}

export default Restdash;
