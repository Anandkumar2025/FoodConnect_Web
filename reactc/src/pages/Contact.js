import { React, useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contact', formData);
      alert('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container  mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-orange-500 mb-8">Contact Us</h1>
        <p className="text-lg md:text-xl text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you’re a food supplier, NGO, or have any questions about our platform, feel free to reach out using the contact form below.
        </p>

        <div className="max-w-lg mx-auto bg-white p-8 md:p-10 shadow-xl rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;


// import { React, useEffect, useState } from 'react';
// import axios from 'axios';

// const Contact = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Retrieve the JWT token from localStorage
//       const token = localStorage.getItem('token');

//       if (!token) {
//         alert('User is not authenticated. Please log in.');
//         return;
//       }

//       // Send form data along with the JWT token in the headers
//       await axios.post('http://localhost:3001/contact',formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,  // Include the JWT token
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       alert('Message sent successfully');
//       setFormData({
//         name: '',
//         email: '',
//         message: ''
//       });
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Error sending message');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       <div className="container mx-auto px-4 py-16">
//         <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Contact Us</h1>
//         <p className="text-lg text-gray-700 text-center mb-10 max-w-2xl mx-auto">
//           We'd love to hear from you! Whether you’re a food supplier, NGO, or have any questions about our platform, feel free to reach out using the contact form below.
//         </p>

//         <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block mb-2 text-gray-600">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//                 placeholder="Your Name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-gray-600">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//                 placeholder="Your Email"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-gray-600">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-orange-500"
//                 placeholder="Your Message"
//                 rows="5"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


