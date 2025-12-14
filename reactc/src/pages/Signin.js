// import { React, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(''); 
//   const navigate = useNavigate();
//   const [emailError, setEmailError] = useState('');

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();


//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address.');
//       return;
//     }
//     axios.post('http://localhost:3001/signin', { email, password })
//       .then(result => {
//         const { data } = result;
//         if (data.status === "Success") {
//           localStorage.setItem("isLoggedIn", true);
//           const username = data.username;
//           localStorage.setItem("username", username);
//           localStorage.setItem("Org", data.org);
//           localStorage.setItem("UserId", data.id);
//           localStorage.setItem("address", data.uaddress);
//           if (data.org === "ngo") {
//             navigate('/ngodash');
//             window.location.reload();
//           } else {
//             navigate('/restdash');
//             window.location.reload();
//           }
//         } else if (data.status === "No records found!") {
//           alert("No records found! Please Register");
//           navigate('/signup');
//         } else if (data.status === "Wrong password") {
//           setError('Wrong password. Please try again.'); 
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         setError('An error occurred. Please try again later.'); 
//       });
//   }

//   return (
//     <div className='flex flex-col'>
//       <div className="flex items-center justify-center bg-gray-50 min-h-screen px-5">
//         <div className="bg-white px-8 py-5 md:p-8 rounded-lg shadow-2xl max-w-md w-full">
//           <h2 className="text-xl md:text-2xl font-bold text-center md:mb-10 mb-6 text-orange-500">Login to Food Connect</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2  text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//                 placeholder="Enter your email"
//                 onChange={(event) => setEmail(event.target.value)}
//                 required
//               />{emailError && <p className="text-red-500 text-sm px-1">{emailError}</p>}
//             </div>
//             <div>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2  text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//                 placeholder="Enter your password"
//                 onChange={(event) => setPassword(event.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm px-1">{error}</p>} 
//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:cursor-pointer text-white py-2 rounded-lg active:bg-orange-600 transition duration-300"
//             >
//               Login
//             </button>
//           </form>
//           <div className="mt-4 text-center text-sm md:text-base">
//             <p className="text-gray-600">Don't have an account?
//               <Link to='/signup' className="text-orange-500 font-bold ml-2 hover:underline">Sign Up</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;




import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    axios.post('http://localhost:3001/signin', { email, password })
      .then(result => {
        const { data } = result;
        if (data.status === "Success") {
          localStorage.setItem("isLoggedIn", true);
          const username = data.username;
          localStorage.setItem("username", username);
          localStorage.setItem("Org", data.org);
          localStorage.setItem("UserId", data.id);
          localStorage.setItem("address", data.uaddress);
          if (data.org === "ngo") {
            navigate('/ngodash');
            window.location.reload();
          } else {
            navigate('/restdash');
            window.location.reload();
          }
        } else if (data.status === "No records found!") {
          alert("No records found! Please Register");
          navigate('/signup');
        } else if (data.status === "Wrong password") {
          setError('Wrong password. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        setError('An error occurred. Please try again later.');
      });
  }

  return (
    <div className='flex  w-full  h-screen bg-gray-50'>
      <div className=" flex justify-center items-center  w-full mx-8 ">

        {/* <div className=" bg-black   p-2  "> */}

          <div className=" flex flex-col justify-center  bg-white rounded-xl shadow-2xl p-8  sm:w-96 md:w-96  sm:h-96 h-1/2  ">

            <h2 className="text-xl md:text-2xl font-bold text-center md:mb-10 mb-6 text-orange-500">Login to Food Connect</h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:border-orange-500  focus:ring-orange-200 "
                  placeholder="Enter your email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                {emailError && <p className="text-red-500 text-sm px-1">{emailError}</p>}
              </div>
              <div>
                <input
                  type="password"
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm px-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:cursor-pointer text-white py-2 rounded-lg active:bg-orange-600 transition duration-300"
              >Login</button>
            </form>
            <div className="mt-4 text-center text-sm md:text-base">
              <p className="text-gray-600">Don't have an account?
                <Link to='/signup' className="text-orange-500 font-bold ml-2 hover:underline">Sign Up</Link>
              </p>
            </div>

          </div>

        {/* </div> */}
        
      </div>
    </div>
  );
};

export default Signin;
