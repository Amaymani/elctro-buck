import React, { useState } from 'react'
import Navbar from '@/Components/Navbar';
import { ref, set,onValue } from 'firebase/database';
import { db } from '@/config';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// function writeUserData(appName: string, imageNo: number) {
//     const dbRef = ref(db, `budget`);
//     set(dbRef, budgetS).then(() => {
//       console.log('Data saved successfully!');
//     }).catch((error) => {
//       console.error('Error saving data: ', error);
//     });
// }

const writeNewPost= async(budget: any)=> {
    // A post entry.
    try {
        await set(ref(db, 'budget'), budget);
        console.log('Value updated successfully!');
      } catch (error) {
        console.error('Error updating value: ', error);
      }
}

const SetBudget = () => {
    const [budgetS, setBudgetH]= useState("0");
    const [budgetF, setBudgetF] = useState("0");
    const router = useRouter();


    useEffect(() =>{
        const dbBudRef=ref(db, 'budget');
        const fetchData = onValue(dbBudRef, (snapshot)=>{
          const data = snapshot.val();
          setBudgetF(data);
        });
        console.log(fetchData);
      });

    function handleSubmit(){
        writeNewPost(budgetS);
        router.push(`/`);
    }
    
  return (
    <div>
        <Navbar
        budget={budgetF}/>

<form className="flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className='flex justify-center'>
                <div className="text-gray-700 text-xl font-bold mb-2  mx-10 my-24 ">Your New Budget</div>
                <input type="text" 
                  id="name"  
                  value={budgetS}
                  onChange={(e)=>{setBudgetH(e.target.value)}}
                  className="shadow appearance-none border rounded  mx-24 my-20 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        
        <div className="flex justify-center">
            <button typeof='submit' className= " hover:text-[#03658C] bg-[#63BBF2] text-white font-bold py-4 px-6 rounded-full">Done</button>
        </div>
        </form>
    </div>
  )
}

export default SetBudget