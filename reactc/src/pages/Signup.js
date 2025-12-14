// import { React, useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [errors, setErrors] = useState({}); 

//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'A valid email is required';
//     }
//     if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//     }
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
//     return newErrors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     axios.post('http://localhost:3001/signup', { name, email, password, organization, address })
//       .then(result => {
//         if (result.data === "Already registered") {
//           alert("E-mail already registered! Please Login to proceed.");
//           navigate('/signin');
//         } else {
//           alert("Registered successfully! Please Login to proceed.");
//           navigate('/signin');
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
//       <div className="bg-white px-8 py-5 md:p-8 rounded-lg shadow-2xl max-w-md w-full">
//         <h2 className="text-xl md:text-2xl font-bold text-center md:mb-10 mb-6 text-orange-500">
//           Signup to Food Connect
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               placeholder="Enter your name"
//               onChange={(event) => setName(event.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               placeholder="Enter your email"
//               onChange={(event) => setEmail(event.target.value)}
//               required
//             />
//             {errors.email && <p className="text-red-500 text-sm px-1">{errors.email}</p>}
//           </div>
//           <div>
//             <select
//               name="org"
//               id="org"
//               className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               onChange={(event) => setOrganization(event.target.value)}
//               value={organization}
//               required
//             >
//               <option value="" hidden>Select your organization</option>
//               <option value="restaurant">Restaurant</option>
//               <option value="ngo">NGO</option>
//             </select>
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter your full address"
//               className="w-full px-4 py-2 mt-1 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               onChange={(event) => setAddress(event.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               placeholder="Create a password"
//               onChange={(event) => setPassword(event.target.value)}
//               required
//             />
//             {errors.password && <p className="text-red-500 text-sm px-1">{errors.password}</p>}
//           </div>
//           <div>
//             <input
//               type="password"
//               className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//               placeholder="Confirm your password"
//               onChange={(event) => setConfirmPassword(event.target.value)}
//               required
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-lg active:bg-orange-600"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4 text-center text-sm md:text-base">
//           <p className="text-gray-600">
//             Already have an account?
//             <Link to='/signin' className="text-orange-500 font-bold ml-2 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const validate = () => {
    const newErrors = {};
    if (!/\S+@gmail\.\S+/.test(email)) {
      newErrors.email = 'A valid email is required';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios.post('http://localhost:3001/signup', {
      name, email, password, organization, address
    })
      .then(result => {
        if (result.data === "User already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate('/signin');
        } else if (result.data.token) {
          // Store the JWT token in localStorage
          localStorage.setItem('token', result.data.token);

          alert("Registered successfully! Please Login to proceed.");
          navigate('/signin'); // Navigate to a protected route or dashboard
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="bg-white px-8 py-5 md:p-8 rounded-lg shadow-2xl  max-w-lg w-full">
        <h2 className="text-xl md:text-2xl font-bold text-center md:mb-10 mb-6 text-orange-500">Signup to Food Connect</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="text"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <input type="email"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />{errors.email && <p className="text-red-500 text-sm px-1">{errors.email}</p>}
          </div>
          <div>
            <select name="org"
              id="org"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              onChange={(event) => setOrganization(event.target.value)}
              value={organization}
              required
            >
              <option value="" hidden>Select your organization</option>
              <option value="restaurant">Restaurant</option>
              <option value="ngo">NGO</option>
            </select>
          </div>
          <div>
            <input type="text"
              placeholder='Enter your full address'
              className="w-full px-4 py-2 mt-1 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
          <div>
            <input type="password"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              placeholder="Create a password"
              onChange={(event) => setPassword(event.target.value)}
              required />
              {errors.password && <p className="text-red-500 text-sm px-1">{errors.password}</p>}
          </div>
          <div>
            <input type="password"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
              placeholder="Confirm your password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required />
              {errors.confirmPassword && <p className="text-red-500 text-sm px-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg active:bg-orange-600 ">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm md:text-base">
          <p className="text-gray-600">Already have an account?
            <Link to='/signin' className="text-orange-500 font-bold ml-2 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
