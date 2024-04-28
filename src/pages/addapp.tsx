
import React from 'react';
import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import {ref, set } from "firebase/database";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { db } from "@/config";
import { onValue, off } from "firebase/database";

function writeUserData(appName: string, imageNo: number) {
    const dbRef = ref(db, `appliance/${appName}`);
    set(dbRef, {
      imageNo: imageNo
    }).then(() => {
      console.log('Data saved successfully!');
    }).catch((error) => {
      console.error('Error saving data: ', error);
    });
}

  
const AddApp = () => {
    const [appName, setAppName] = useState('');
    const [imageNo, setImageNo] = useState(0);
    const router = useRouter();
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
      writeUserData(appName, imageNo);
      router.push(`/`);
    };

    const [budget, setBudget] = useState(0);
    useEffect(() =>{
    const dbBudRef=ref(db, 'budget');
    const fetchData = onValue(dbBudRef, (snapshot)=>{
      const data = snapshot.val();
      setBudget(data);
    });
  });
  return (
    <div>
        <Navbar
        budget={budget}
        />
        <h1 className="font-mono text-5xl text-center mt-7">Add Your Device</h1>
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className='flex justify-center'>
                <div className="text-gray-700 text-xl font-bold mb-2  mx-10 my-24 ">New Name</div>
                <input type="text" 
                  id="name" 
                  name="name" 
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="shadow appearance-none border rounded  mx-24 my-20 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        
        <div className="grid grid-cols-4 gap-4 place-items-center py-10">
            <div className='flex items-center'>
                <input className=' size-8'
                  id='LED' 
                  name='LED' 
                  value={1} 
                  type='radio'
                  onChange={() => setImageNo(1)}/>
                <label htmlFor='LED' className='ml-3 text-xl'>LED</label>
            </div>
            <div className='flex items-center'>
                <input className=' size-8' 
                  id='AC' 
                  name='AC' 
                  value={2} 
                  type='radio'
                  onChange={() => setImageNo(2)}/>
                <label htmlFor='AC' className='ml-3 text-xl'>AC</label>
            </div>
            <div className='flex items-center'>
                <input className=' size-8'
                id='REF' 
                name='REF' 
                value={3} 
                type='radio'
                onChange={() => setImageNo(3)}/>
                <label htmlFor='REF' className='ml-3 text-xl'>Refrigerator</label>
            </div>
            <div className='flex items-center'>
                <input className=' size-8'
                id='TV' 
                name='TV' 
                value={4} 
                type='radio'
                onChange={() => setImageNo(4)}/>
                <label htmlFor='TV' className='ml-3 text-xl'>TV</label>
            </div>
        </div>
        <div className="flex justify-center">
            <button typeof='submit' className= " hover:text-[#03658C] bg-[#63BBF2] text-white font-bold py-4 px-6 rounded-full">Done</button>
        </div>
        </form>
    </div>
  )
}

export default AddApp;