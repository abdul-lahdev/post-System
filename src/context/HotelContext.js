'use client'
import { createContext,useContext, useMemo, useState } from "react";


const PostContext = createContext();

function PostProvider({ children }) {


   const hotelData = [
  {
    name: "Rest Camp",
    categories: [
      "Accommodation",
      "Activity",
      "Swimming & Braai",
      "F&B",
      "Retail",
      "Gym",
      "Long Term Rental",
      "Utilities",
      "Fine"
    ]
  },
  {
    name: "Bamba Tram",
    categories: [
      "Accommodation",
      "Activity"
    ]
  },
  {
    name: "New Hotel",
    categories: [
      "Accommodation",
      "F&B",
      "Activity"
    ]
  }
];

    
    const [step, setStep] = useState("categories");
    
    const [hotel,setHotel]=useState(hotelData[0].name);
// const value = useMemo(() => ({ hotel, setHotel }), [hotel]);
  return (
    <PostContext.Provider
      value={{
        hotel,
        setHotel,
        hotelData,
        step,
setStep,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function useHotels() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, useHotels};
