import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Donate() {
  const [formData, setFormData] = useState({
    food: '',
    quantity: '',
    time: ''
  });


  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.food || !formData.quantity || !formData.time) {
      setError("All fields are required.");
      return;
    }

    const quantityNum = Number(formData.quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    try {
      const userId = localStorage.getItem('UserId');
      console.log('user:', userId);

      const response = await fetch('http://localhost:3001/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food: formData.food,
          quantity: `${quantityNum} kg`,
          time: formData.time,
          expiry:formData.expiry,
          userId: userId
        }),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ food: '', quantity: '', time: '',expiry:'' });
        navigate('/restdash');  // Redirect to Restdash page
        setError(null);
      } else {
        setError('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };


  return (
    <div className="userdashboard">
      <main className="infobox">
        <div className="flex justify-center items-center my-10">
          <div className="py-10 px-4 shadow-xl bg-slate-150 rounded-md max-w-md w-full">
            <div className='text-orange-500 text-center font-bold text-3xl pb-5'>
              <h1>Donation Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className='rounded-md px-3 pt-3 border border-black'>
                <div className=' text-lg'>
                  <label htmlFor="food">Name of Food</label>
                </div>
                <input
                  name="food"
                  className='border border-gray-500 w-full h-10 rounded-md'
                  type="text"
                  id="food"
                  value={formData.food}
                  onChange={handleChange}
                  required
                />

                <div className='mt-2 text-lg'>
                  <label htmlFor="quantity">Quantity of Food (kg)</label>
                </div>
                <input
                  name="quantity"
                  className='border border-gray-500 w-full h-10 rounded-md'
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />

                <div className='mt-2 text-lg'>
                  <label htmlFor="time">When the Food is Cooked?</label>
                </div>
                <input
                  name="time"
                  className='border border-gray-500 w-full h-10 rounded-md'
                  type="date"  // Change to date input for better UX
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />

                <div className='mt-3 text-lg'>
                  <label htmlFor="time">What is Expiry date of Food?</label>
                </div>
                <input
                  name="expiry"
                  className='border border-gray-500 w-full h-10 rounded-md'
                  type="date"  // Change to date input for better UX
                  id="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                
                />

                <div className="submitbtn flex justify-center mt-10 p-2">
                  <button className='bg-orange-500 active:bg-orange-600 rounded-md px-5 py-2 font-semibold'>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Donate;

