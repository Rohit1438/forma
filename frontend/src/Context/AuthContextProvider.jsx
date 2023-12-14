import  axios  from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { DataContext } from './DataContextProvider'


export const AuthContext=createContext()

const AuthContextProvider = ({children}) => {




const[isAuth,setIsAuth]=useState(false)
const [user,setUser]=useState({})


const [id,setId]=useState(null)

const [loader,setLoader]=useState(false)


const BASE_URL="https://mock61st.onrender.com/api/v1/"
const token= localStorage.getItem("formatoken")||""
let userdata=JSON.parse(localStorage.getItem("formauser"))||""

const {allForms,setAllForms,Form,setForm,questions,setquestions}=useContext(DataContext)






///checking authentication





//fetching all forms
const fetchForms = async (token) => {
  try {
    let res = await axios.get(`${BASE_URL}/forms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if(res?.data?.message!=="forms not found"){
      res=await res.data.forms
      if(res.length!==0){
         await  setAllForms((pre)=>[...res])  
      }
   
         setUser(()=>JSON.parse(localStorage.getItem("formauser")));
    }
  } catch (error) {
    console.log(error);
  }
};


const authentication = async () => {
  try {
    console.log("auth calling",token)
    if (token !== "") {
      setIsAuth(()=>true);
      setUser(()=>userdata)
      await fetchForms(token);
    } else {
      setIsAuth(false); 
    }
  } catch (error) {
    console.log(error);
    setIsAuth(false);
  }
};



useEffect(()=>{
authentication()
},[token])

  return <AuthContext.Provider value={{id,loader,setLoader,setLoader,setId,isAuth,setIsAuth,user,setUser}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
