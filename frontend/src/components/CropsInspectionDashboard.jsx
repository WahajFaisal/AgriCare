import React from 'react';
import Picture from '../Assets/Inspection.jpg'

const CropsInspectionDashboard = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
<div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
<img className='w-[500px] mx-auto my-4' src={Picture} alt="/" />
<div className='flex flex-col justify-center'>
    <p className='text-[#00df9a] font-bold'>CROPS INSPECTION DASHBOARD</p>
    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Get your crops inspected</h1>
    <p>
     AgriCare is a revolutionary platform dedicated to empowering farmers and revolutionizing the agriculture industry.
     With a vision to create sustainable and efficient farming practices, AGRiCARE offers a wide range of innovative 
     solutions and services tailored to meet the unique needs of farmers and agribusinesses.
    </p>
    <a href='/cropsinspection'>
    <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
    </a>
</div>
</div>
    </div>
  )
}

export default CropsInspectionDashboard