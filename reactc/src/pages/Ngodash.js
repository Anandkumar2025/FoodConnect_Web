// import React, { useState, useEffect } from 'react';

// function Ngodash() {
//   const username = localStorage.getItem("username");
//   const initialMealsReceived = parseInt(localStorage.getItem(`${username}_mealsReceived`)) || 0;
//   const storedClaimedDonations = JSON.parse(localStorage.getItem(`${username}_claimedDonations`)) || [];
//   const useraddress=localStorage.getItem("address");
//   const [mealsReceived, setMealsReceived] = useState(initialMealsReceived);
//   const [donations, setDonations] = useState([]);
//   const [claimedDonations, setClaimedDonations] = useState(storedClaimedDonations);
//   const [showAll, setShowAll] = useState(false);
//   const [claimed, setClaimed] = useState([]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/ngodash');
//         const data = await response.json();

//         const formattedDonations = data.map(donation => ({
//           id: donation._id,
//           date: new Date(donation.createdAt).toLocaleDateString(),
//           items: `${donation.quantity} ${donation.food}`,
//           cook: new Date(donation.time).toLocaleDateString(),
//           expiry: new Date(donation.expiry).toLocaleDateString(),
//           claimed: donation.claimed,
//           user: donation.userId
//         }));

//         setDonations(formattedDonations);
//         setClaimed(formattedDonations.map(donation => donation.claimed));

//       } catch (error) {
//         console.error('Error fetching recent donations:', error);
//       }
//     };

//     fetchDonations();
//   }, []);

//   const handleClaim = async (index, donationId) => {
//     if (!claimed[index]) {
//       try {
//         const response = await fetch(`http://localhost:3001/ngodash/${donationId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           setClaimed(prevClaimed => {
//             const newClaimed = [...prevClaimed];
//             newClaimed[index] = true;
//             return newClaimed;
//           });

//           setMealsReceived(prevMeals => {
//             const newMealsReceived = prevMeals + 1;
//             localStorage.setItem(`${username}_mealsReceived`, newMealsReceived);
//             return newMealsReceived;
//           });

//           const claimedDonation = donations[index];
//           setClaimedDonations(prevClaimedDonations => {
//             const updatedClaimedDonations = [...prevClaimedDonations, claimedDonation];
//             localStorage.setItem(`${username}_claimedDonations`, JSON.stringify(updatedClaimedDonations));
//             return updatedClaimedDonations;
//           });
//         }
//       } catch (error) {
//         console.error('Error claiming the donation:', error);
//       }
//     }
//   };

//   const donationsToShow = showAll ? donations : donations.slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow py-7 px-10  items-start">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">NGO Dashboard</h1>
//           <p className="text-gray-600 mt-2">Welcome, {username}</p>
//         </div>
        
//       </header>

//       <main className="container mx-auto p-4 md:p-6">

        
//         <section className=" sm:grid-cols-2   md:flex justify-between" >
          
//           <div className="bg-white  p-4 md:p-6 rounded-lg shadow">
//             <h3 className="text-gray-500 md:text-xl  text-lg font-medium">Meals Received</h3>
//             <p className="mt-3 md:text-3xl text-2xl font-semibold text-gray-600">{mealsReceived}</p>
//           </div>
//           <div className='md:w-80  mt-5 md:mt-0 bg-white  p-4 md:p-6 rounded-lg shadow '>
//           <div className="md:text-xl  text-lg  font-medium text-gray-500">Address:</div>
//           <p className="text-gray-600 mt-2 text-base  md:text-xl">{useraddress}  </p>
//         </div>
          
//         </section>
      

       
//         {claimedDonations.length > 0 && (
//           <section className="mt-8 ">
//             <h2 className="text-xl font-semibold text-gray-800">Donations Received</h2>
//             <div className="bg-white overflow-x-auto sm:rounded-lg shadow-md mt-4">
//               <table className="min-w-full divide-y">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                     <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooked on</th>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry on</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {claimedDonations.map((donation, index) => (
//                     <tr key={index}>
//                       <td className="px-4 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
//                       <td className="px-4 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
//                       <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}

       
//         {claimed.length >0 &&(
//           <section className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">Donations Available to Claim</h2>
//           <div className="bg-white shadow-md overflow-x-auto sm:rounded-lg mt-4">
//             <table className="min-w-full divide-y">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooked on</th>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry on</th>
//                   <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {donationsToShow.map((donation, index) => (
//                   <tr key={index}>
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
                    
//                     <td className="px-3 md:px-6 py-4 whitespace-nowrap">
//                       <button
//                         className={`${claimed[index] ? 'bg-gray-400 hover:bg-gray-500 ' : 'bg-orange-500 active:bg-orange-600'} rounded-md py-1 px-2 md:py-2 md:px-5`}
//                         onClick={() => handleClaim(index, donation.id)}
//                         disabled={claimed[index]}
//                       >
//                         {claimed[index] ? 'Claimed' : 'Claim'}
//                       </button>
//                     </td>
//                   </tr>
                 
                  
//                 ))}
//               </tbody>
              
//             </table>
//             <hr />
//             {!showAll && donations.length > 3 && (
             
//              <div className="text-center text-gray-600 px-6 pt-5  hover:text-gray-800 hover:underline ">
//              <button
//               onClick={() => setShowAll(true)}
              
//             >
//               Show All
//             </button>
//             </div>
//           )}
//           </div>
//         </section>
//         )}

//       </main>
//     </div>
//   );
// }

// export default Ngodash;








import React, { useState, useEffect } from 'react';

function Ngodash() {
  const username = localStorage.getItem("username");
  const initialMealsReceived = parseInt(localStorage.getItem(`${username}_mealsReceived`)) || 0;
  const storedClaimedDonations = JSON.parse(localStorage.getItem(`${username}_claimedDonations`)) || [];
  const useraddress=localStorage.getItem("address");
  const [mealsReceived, setMealsReceived] = useState(initialMealsReceived);
  const [donations, setDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState(storedClaimedDonations);
  const [showAll, setShowAll] = useState(false);
  const [claimed, setClaimed] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/ngodash',
           {
             method: 'GET',
           headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
        const data = await response.json();

        const formattedDonations = data.map(donation => ({
          id: donation._id,
          date: new Date(donation.createdAt).toLocaleDateString(),
          items: `${donation.quantity} ${donation.food}`,
          cook: new Date(donation.time).toLocaleDateString(),
          expiry: new Date(donation.expiry).toLocaleDateString(),
          claimed: donation.claimed,
          user: donation.userId
        }));

        setDonations(formattedDonations);
        setClaimed(formattedDonations.map(donation => donation.claimed));

      } catch (error) {
        console.error('Error fetching recent donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleClaim = async (index, donationId) => {
    const token = localStorage.getItem('token');
    if (!claimed[index]) {
      try {
        const response = await fetch(`http://localhost:3001/ngodash/${donationId}`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setClaimed(prevClaimed => {
            const newClaimed = [...prevClaimed];
            newClaimed[index] = true;
            return newClaimed;
          });

          setMealsReceived(prevMeals => {
            const newMealsReceived = prevMeals + 1;
            localStorage.setItem(`${username}_mealsReceived`, newMealsReceived);
            return newMealsReceived;
          });

          const claimedDonation = donations[index];
          setClaimedDonations(prevClaimedDonations => {
            const updatedClaimedDonations = [...prevClaimedDonations, claimedDonation];
            localStorage.setItem(`${username}_claimedDonations`, JSON.stringify(updatedClaimedDonations));
            return updatedClaimedDonations;
          });
        }
      } catch (error) {
        console.error('Error claiming the donation:', error);
      }
    }
  };


  // useEffect(() => {
  //   const fetchDonations = async () => {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await fetch('http://localhost:3001/ngodash', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         },
  //       });
  //       const data = await response.json();
  
  //       const formattedDonations = data.map(donation => ({
  //         id: donation._id,
  //         date: new Date(donation.createdAt).toLocaleDateString(),
  //         items: `${donation.quantity} ${donation.food}`,
  //         cook: new Date(donation.time).toLocaleDateString(),
  //         expiry: new Date(donation.expiry).toLocaleDateString(),
  //         claimed: donation.claimed,
  //         user: donation.userId
  //       }));
  
  //       setDonations(formattedDonations);
  //       setClaimed(formattedDonations.map(donation => donation.claimed));
  //     } catch (error) {
  //       console.error('Error fetching recent donations:', error);
  //     }
  //   };
  
  //   fetchDonations();
  // }, []);
  
  // const handleClaim = async (index, donationId) => {
  //   const token = localStorage.getItem('token');
  //   if (!claimed[index]) {
  //     try {
  //       const response = await fetch(`http://localhost:3001/ngodash/${donationId}`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  
  //       if (response.ok) {
  //         setClaimed(prevClaimed => {
  //           const newClaimed = [...prevClaimed];
  //           newClaimed[index] = true;
  //           return newClaimed;
  //         });
  
  //         setMealsReceived(prevMeals => {
  //           const newMealsReceived = prevMeals + 1;
  //           localStorage.setItem(`${username}_mealsReceived`, newMealsReceived);
  //           return newMealsReceived;
  //         });
  
  //         const claimedDonation = donations[index];
  //         setClaimedDonations(prevClaimedDonations => {
  //           const updatedClaimedDonations = [...prevClaimedDonations, claimedDonation];
  //           localStorage.setItem(`${username}_claimedDonations`, JSON.stringify(updatedClaimedDonations));
  //           return updatedClaimedDonations;
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error claiming the donation:', error);
  //     }
  //   }
  // };
  

  const donationsToShow = showAll ? donations : donations.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow py-7 px-10  items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">NGO Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {username}</p>
        </div>
        
      </header>

      <main className="container mx-auto p-4 md:p-6">

        
        <section className=" sm:grid-cols-2   md:flex justify-between" >
          
          <div className="bg-white  p-4 md:p-6 rounded-lg shadow">
            <h3 className="text-gray-500 md:text-xl  text-lg font-medium">Meals Received</h3>
            <p className="mt-3 md:text-3xl text-2xl font-semibold text-gray-600">{mealsReceived}</p>
          </div>
          <div className='md:w-80  mt-5 md:mt-0 bg-white  p-4 md:p-6 rounded-lg shadow '>
          <div className="md:text-xl  text-lg  font-medium text-gray-500">Address:</div>
          <p className="text-gray-600 mt-2 text-base  md:text-xl">{useraddress}  </p>
        </div>
          
        </section>
      

       
        {claimedDonations.length > 0 &&(
          <section className="mt-8 ">
            <h2 className="text-xl font-semibold text-gray-800">Donations Received</h2>
            <div className="bg-white overflow-x-auto sm:rounded-lg shadow-md mt-4">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooked on</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry on</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claimedDonations.map((donation, index) => (
                    <tr key={index}>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

       
        {claimed.length > 0 ?(
          <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Donations Available to Claim</h2>
          <div className="bg-white shadow-md overflow-x-auto sm:rounded-lg mt-4">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooked on</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry on</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donationsToShow.map((donation, index) => (
                  <tr key={index}>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.date}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.items}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.cook}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">{donation.expiry}</td>
                    
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <button
                        className={`${claimed[index] ? 'bg-gray-400 hover:bg-gray-500 ' : 'bg-orange-500 active:bg-orange-600'} rounded-md py-1 px-2 md:py-2 md:px-5`}
                        onClick={() => handleClaim(index, donation.id)}
                        disabled={claimed[index]}
                      >
                        {claimed[index] ? 'Claimed' : 'Claim'}
                      </button>
                    </td>
                  </tr>
                 
                  
                ))}
              </tbody>
              
            </table>
            <hr />
            {!showAll && donations.length > 3 && (
             
             <div className="text-center text-gray-600 px-6 pt-5  hover:text-gray-800 hover:underline ">
             <button
              onClick={() => setShowAll(true)}
              
            >
              Show All
            </button>
            </div>
          )}
          </div>
        </section>
        ):<div className='text-gray-700 md:text-2xl text-xl mt-10'>Doantions will Available Soon.</div>}

      </main>
    </div>
  );
}

export default Ngodash;







