import { useEffect } from "react";
import { useParams } from "react-router-dom"


export default function CollegeDetails() {

    const {id}=useParams()

   
          useEffect(()=>{
           
          },[])
    
    console.log(id);
  return (
    <div>CollegeDetails{id}</div>
  )
}
