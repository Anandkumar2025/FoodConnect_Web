import React  from 'react'

function Card({imsrc="./image/images (2).jpeg.jpg",title}) {
    return (
      <div>
        {/* <div className="card bg-gray-900 h-96 text-white ">
          <div>
            Hello
          </div>
          <img 
          className='im w-full lg:max-w-screen-full md:max-w-full  max-h-96  md:h-5/6 lg:h-5/6 '  
          src={imsrc} 
          alt="slide" />
          </div> */}


<div className="relative w-full  h-96 ">
      <img
        src={imsrc} 
        alt="Card Background"
        className="absolute inset-0  w-full h-full "
      />
      <div className="absolute bottom-10 left-1 md:left-10 p-2 md:p-4  text-white font-bold">
        <p className=" md:text-6xl text-3xl">{title}</p>
      </div>
    </div>
      </div>
    )
}

export default Card;

