'use client'
import React from 'react'
import Navbar from '@/Components/Navbar'
import TrackCard from '@/Components/TrackCard'
import { db } from "@/config";
import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from 'react';


const Track = () => {
  const [appliances, setAppliances] = useState<any[]>([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const dbRef = ref(db, 'appliance');

    const fetchData = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const applianceArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setAppliances(applianceArray);
      }
    });
    return () => {
      off(dbRef, 'value', fetchData);
    };
  }, []);

  useEffect(() =>{
    const dbBudRef=ref(db, 'budget');
    const fetchData = onValue(dbBudRef, (snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      setBudget(data);
    });
  });
  return (
    <div>
        <Navbar
        budget={budget}
        />
        {appliances.map((appliance) => (
        <TrackCard 
        key={appliance.id}
        appliance={appliance.id}
        status={appliance.status}
        unit={appliance.power} 
        amount={appliance.amount}
        imageNo={appliance.imageNo}/>
      ))}
    </div>
  )
}

export default Track;