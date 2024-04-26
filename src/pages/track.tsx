'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import TrackCard from '@/components/TrackCard'
import { db } from "@/config";
import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from 'react';


const Track = () => {
  const [appliances, setAppliances] = useState<any[]>([]);

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
  return (
    <div>
        <Navbar/>
        {appliances.map((appliance) => (
        <TrackCard 
        key={appliance.id}
        appliance={appliance.id}
        status='fine'
        unit={appliance.power} 
        amount={appliance.power*6.3}
        imageNo={appliance.imageNo}/>
      ))}
    </div>
  )
}

export default Track;