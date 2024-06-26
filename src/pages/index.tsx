'use client'
import { useEffect, useState } from 'react';
import HomeCard from "@/Components/HomeCard";
import Navbar from "@/Components/Navbar";
import Link from "next/link";
import { db } from "@/config";
import { ref, onValue, off } from "firebase/database";

export default function Home() {
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

  const [budget, setBudget] = useState(0);
  useEffect(() =>{
    const dbBudRef=ref(db, 'budget');
    const fetchData = onValue(dbBudRef, (snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      setBudget(data);
    });
  });

  return (
    <div className="flex flex-col justify-center">
      <Navbar
      budget={budget}/>

      {appliances.map((appliance) => (
        <HomeCard 
          key={appliance.id}
          appliance={appliance.id} 
          image={`/${appliance.imageNo}.png`} // Adjust the path to your images
          alt={appliance.id}
        />
        ))}
      <div className="w-full flex justify-center">
        <Link href={"/addapp"}>
          <button className="flex justify-center items-center text-white bg-green-500 h-12 w-36 hover:w-28 transition-all duration-150 ease-in-out rounded-xl hover:bg-green-600 shadow-lg hover:shadow-2xl">
            Add Device
          </button>
        </Link>
      </div>
    </div>
  );
}
