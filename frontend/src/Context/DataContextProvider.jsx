import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContextProvider'


export const DataContext=createContext()
const DataContextProvider = ({children}) => {
const [allforms,setAllForms]=useState([])
const[form,setform]=useState([])
const [questions,setquestions]=useState([])
const [formName, setformName] = useState("");
  return <DataContext.Provider value={{allforms,setAllForms,form,setform,formName, setformName,questions,setquestions}}>{children}</DataContext.Provider>
}

export default DataContextProvider
