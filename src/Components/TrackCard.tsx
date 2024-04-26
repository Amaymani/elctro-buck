
import React from 'react';
import Image from 'next/image';

interface TrackCardProps{
    appliance: string;
    unit: number;
    amount: number;
    status: string;
    imageNo: number;
}

const TrackCard: React.FC<TrackCardProps> = ({appliance,unit,amount,status, imageNo})=> {
  return (
    <div className='flex justify-center my-7'>
            <div className='flex h-auto bg-white w-[90vb] rounded-2xl shadow-lg'>
                <div className='image h-72 w-auto border-r-gray-300 border-r-2'>
                    <Image className='w-full h-full object-cover' src={`/appliances/${imageNo}.png`} alt="bulb" width={150} height={150}/>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex justify-end items-center bg-sky-200'>
                        <div className='text-xl'>Status:</div>
                        <div className='bg-green-500 font-bold text-white my-3 px-5 py-1 mx-3 rounded-2xl'>{status}</div>
                    </div>
                    <div className='flex justify-evenly items-center h-full'>
                    <div className='flex w-full justify-center h-full items-center text-6xl font-bold text-[#03658C]'>{appliance}</div>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <div className='text-xl font-semibold text-red-600'>{unit} KWh</div>
                        <div className='text-xl font-semibold'>Unit spent</div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <div className='text-xl font-semibold text-green-600'>Rs {amount}</div>
                        <div className='text-xl font-semibold'>Amount Spent</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TrackCard