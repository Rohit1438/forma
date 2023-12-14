import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import {useParams} from "react-router-dom"
import axios from "axios";
import { DataContext } from "../Context/DataContextProvider";
const BASE_URL = "http://localhost:8080/api/v1";
const token = localStorage.getItem("formatoken") || "";
export default function AddMcqExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allforms, setAllforms, form, setform,formName, setformName, questions, setquestions } =useContext(DataContext);
  const cancelRef = React.useRef();
  const [title, setTitle] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [op3, setOp3] = useState("");
  const [op4, setOp4] = useState("");
  const [formData, setFormData] = useState({});
const {id}=useParams()
  const handleCreate = async () => {
    try {
      console.log("mcq clicked",{  "questionType": "mcq",
      "title": title, "options":[op1,op2,op3,op4] });

      let res = await axios.post(
        `${BASE_URL}/forms/addquestions/${id}`,

        {  "questionType": "mcq",
           "title": title, "options":[op1,op2,op3,op4] },
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(res)
      res=await res.data
      setquestions((pre) => [...pre,res]);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(op1,op2,op3,op4);
  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
          padding: "35px 30px 35px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
        }}
        size="lg"
        bg={"white"}
      >



      <img src="https://cdn-icons-png.flaticon.com/512/6244/6244907.png" style={{height:"50px"}} alt="" />
    
        <div style={{ textAlign: "left", padding: "0px 20px 0px" }}>
          <p>M.C.Q</p>
        </div>
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>M.C.Q Type</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              {/* <ButtonGroup size="sm" isAttached variant="outline">
                          <Button color='whatsapp'
                            onClick={() => {
                 setCount((pre)=>pre+1)
                            }}
                          >
                            -
                          </Button>
                          <Button color='whatsapp'
                            onClick={() => {
                    setCount((pre)=>pre-1)
                            }}
                          >
                            Number of options
                          </Button>
                          <Button color='red' onClick={()=>{}}>+</Button>
                        </ButtonGroup> */}

              <FormLabel>Type your Question </FormLabel>
              <Input
                type="text"
                onChange={(e) => setTitle((pre) => e.target.value)}
              />

              <FormLabel>Available Options </FormLabel>

              <FormHelperText>Option 1</FormHelperText>
              <Input
                type="text"
                onChange={(e) => setOp1((pre) => e.target.value)}
              />

              <FormHelperText>Option 2</FormHelperText>

              <Input
                type="text"
                onChange={(e) => setOp2((pre) => e.target.value)}
              />

              <FormHelperText>Option 3</FormHelperText>
              <Input
                type="text"
                onChange={(e) => setOp3((pre) => e.target.value)}
              />

              <FormHelperText>Option 4</FormHelperText>
              <Input
                type="text"
                onChange={(e) => setOp4((pre) => e.target.value)}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="red">
              Cancel
            </Button>
            <Button
              colorScheme="green"
              sx={{ backgroundColor: "#7E22CE" }}
              ml={3}
              onClick={handleCreate}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
