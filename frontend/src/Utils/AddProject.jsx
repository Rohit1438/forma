import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
  } from '@chakra-ui/react'
  import {useNavigate} from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react';
  import axios  from 'axios'
import { DataContext } from '../Context/DataContextProvider';

export default function AlertDialogExample() {
  const {allForms,setAllForms,Form,setForm,episodes,setEpisodes}=useContext(DataContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user,setUser]=useState({})
    const cancelRef = React.useRef()
  const [FormName, setFormName] = useState('');
  const [token,setToken]=useState("")
const navigate=useNavigate()
//https://mock61st.onrender.com/api/v1/forms/questions
  const BASE_URL="https://mock61st.onrender.com/api/v1"


  useEffect(()=>{
    const formatoken = localStorage.getItem("formatoken") || "";
    setToken((pre)=>formatoken)
  },[])

  const fetchForms = async (token) => {
    try {
      console.log("fetching")
      let res = await axios.get(`${BASE_URL}/forms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      res=await res.data.forms
console.log(res,"formdata")  
      await  setAllForms((pre)=>[...res])

    } catch (error) {
      console.log(error);
  
    }
  };

  const createForm=async()=>{
  try{
  let res=  await axios.post(`${BASE_URL}/Forms/addForms`,
  { title: FormName},
  { headers: { authorization: `Bearer ${token}` } }
  
  )
  res=await res.data

  // console.log(res)
  // await  setAllForms((pre)=>[...res.Forms])

  fetchForms(token)
  onClose();
  navigate("/projects");
  }catch(err){
      console.log(err);
  }
  }
  
  const handleCreate = () => {
    console.log('Form Name:', FormName);
    onClose();
  };


  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
      padding:"20px 30px"
        }}
        size='lg'
        

      >
        <i class="fa-regular fa-square-plus"></i> Create New Form
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        
      >
        <AlertDialogOverlay />

        <AlertDialogContent >
          <AlertDialogHeader>Create Form</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>Enter Form name</FormLabel>
              <Input
                type='text'
                onChange={(e) => setFormName(e.target.value)}
              />
              <FormHelperText>Form name can't be empty</FormHelperText>
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
              Cancel
            </Button>
            <Button
              colorScheme='green'
              sx={{ backgroundColor: '#7E22CE' }}
              ml={3}
              onClick={createForm}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}